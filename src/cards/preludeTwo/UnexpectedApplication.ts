import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {Units} from '../../Units';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {ActionDetails, HowToAffordRedsPolicy, RedsPolicy} from '../../turmoil/RedsPolicy';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {Priority} from '../../deferredActions/DeferredAction';
import {DiscardCards} from '../../deferredActions/DiscardCards';

export class UnexpectedApplication extends Card implements IProjectCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.UNEXPECTED_APPLICATION,
      tags: [Tags.VENUS],
      cost: 4,

      metadata: {
        cardNumber: '??',
        description: 'Discard 1 card from your hand and raise Venus 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.minus().cards(1).nbsp().venus(1);
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    if (player.cardsInHand.length < 2) return false; // this card and at least another
    
    const trGain = player.computeTerraformRatingBump(this);
    Card.setRedsWarningText(player, trGain, this);

    if (PartyHooks.shouldApplyPolicy(player, PartyName.REDS)) {
      this.reserveUnits = Units.adjustUnits(this.reserveUnits, {megacredits: trGain * REDS_RULING_POLICY_COST});
      const actionDetails = this.getActionDetails(player, this);
      this.howToAffordReds = RedsPolicy.canAffordRedsPolicy(player, player.game, actionDetails, false, false, true);

      if (this.howToAffordReds.mustSpendAtMost !== undefined || this.howToAffordReds.bonusMCFromPlay !== undefined) {
        this.reserveUnits = Units.maybeAdjustReservedMegacredits(player, this.reserveUnits, this.howToAffordReds);
      }

      return this.howToAffordReds.canAfford;
    }

    this.howToAffordReds = undefined;
    return true;
  }

  public play(player: Player) {
    player.game.defer(new DiscardCards(player), Priority.SPONSORED_ACADEMIES);
    player.game.increaseVenusScaleLevel(player, 1);
    return undefined;
  }

  public getActionDetails(_player: Player, card: IProjectCard) {
    return new ActionDetails({card: card, venusIncrease: 1});
  }
}
