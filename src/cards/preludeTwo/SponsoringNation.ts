import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {CardRequirements} from '../CardRequirements';
import {Units} from '../../Units';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {ActionDetails, HowToAffordRedsPolicy, RedsPolicy} from '../../turmoil/RedsPolicy';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {Turmoil} from '../../turmoil/Turmoil';
import {SendDelegateToArea} from '../../deferredActions/SendDelegateToArea';
import {Size} from '../render/Size';

export class SponsoringNation extends Card implements IProjectCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.SPONSORING_NATION,
      tags: [Tags.EARTH],
      cost: 21,
      tr: {tr: 3},
      requirements: CardRequirements.builder((b) => b.tag(Tags.EARTH, 4)),

      metadata: {
        cardNumber: '??',
        description: 'Requires 4 Earth tags. Raise your terraforming rating 3 steps and place 2 delegates.',
        renderData: CardRenderer.builder((b) => {
          b.tr(3, Size.SMALL).delegates(2);
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    if (!super.canPlay(player)) return false;
    
    const turmoil = Turmoil.getTurmoil(player.game);
    const hasEnoughDelegates = turmoil.getDelegatesInReserve(player.id) > 1 || (turmoil.getDelegatesInReserve(player.id) === 1 && turmoil.lobby.has(player.id));
    if (hasEnoughDelegates === false) return false;
    
    const trGain = player.computeTerraformRatingBump(this);
    Card.setRedsWarningText(player, trGain, this);

    if (PartyHooks.shouldApplyPolicy(player, PartyName.REDS)) {
      this.reserveUnits = Units.adjustUnits(this.reserveUnits, {megacredits: trGain * REDS_RULING_POLICY_COST});
      const actionDetails = this.getActionDetails(player, this);
      this.howToAffordReds = RedsPolicy.canAffordRedsPolicy(player, player.game, actionDetails);

      if (this.howToAffordReds.mustSpendAtMost !== undefined || this.howToAffordReds.bonusMCFromPlay !== undefined) {
        this.reserveUnits = Units.maybeAdjustReservedMegacredits(player, this.reserveUnits, this.howToAffordReds);
      }

      return this.howToAffordReds.canAfford;
    }

    this.howToAffordReds = undefined;
    return true;
  }

  public play(player: Player) {
    player.increaseTerraformRatingSteps(3);

    const title = 'Select where to send two delegates';
    const turmoil = Turmoil.getTurmoil(player.game);

    if (turmoil.getDelegatesInReserve(player.id) > 1) {
      player.game.defer(new SendDelegateToArea(player, title, {count: 2, source: 'reserve'}));
    } else if (turmoil.getDelegatesInReserve(player.id) === 1 && turmoil.lobby.has(player.id)) {
      player.game.defer(new SendDelegateToArea(player, title, {count: 2, source: 'lobby'}));
    }

    return undefined;
  }

  public getActionDetails(_player: Player, card: IProjectCard) {
    return new ActionDetails({card: card, TRIncrease: 3});
  }
}
