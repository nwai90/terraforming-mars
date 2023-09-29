import {IActionCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {PlaceOceanTile} from '../../deferredActions/PlaceOceanTile';
import {CardRenderer} from '../render/CardRenderer';
import {RedsPolicy, ActionDetails, HowToAffordRedsPolicy} from '../../turmoil/RedsPolicy';
import {Units} from '../../Units';

export class AquiferPumping extends Card implements IActionCard, IProjectCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.AQUIFER_PUMPING,
      tags: [Tags.BUILDING],
      cost: 18,

      metadata: {
        cardNumber: '187',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 8 M€ to place 1 ocean tile. STEEL MAY BE USED as if you were playing a Building card.', (eb) => eb.megacredits(8).steel(1).brackets.startAction.oceans(1));
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    const oceansMaxed = player.game.noOceansAvailable();
    const oceanCost = 8;

    const trGain = oceansMaxed ? 0 : 1;
    const redsAreRuling = PartyHooks.shouldApplyPolicy(player, PartyName.REDS);
    Card.setRedsActionWarningText(player, trGain, this, redsAreRuling);

    if (oceansMaxed) {
      Card.setUselessActionWarningText(this, 'all oceans have already been placed');
      return player.canAfford(oceanCost, {steel: true, plants: false});
    }

    if (redsAreRuling) {
      this.reserveUnits = Units.adjustUnits(this.reserveUnits, {megacredits: REDS_RULING_POLICY_COST});
      const actionDetails = this.getActionDetails();
      this.howToAffordReds = RedsPolicy.canAffordRedsPolicy(player, player.game, actionDetails, true);

      if (this.howToAffordReds.mustSpendAtMost !== undefined || this.howToAffordReds.bonusMCFromPlay !== undefined) {
        this.reserveUnits = Units.maybeAdjustReservedMegacredits(player, this.reserveUnits, this.howToAffordReds);
      }

      return this.howToAffordReds.canAfford;
    }

    return player.canAfford(oceanCost, {steel: true, plants: false});
  }

  public action(player: Player) {
    player.game.defer(new SelectHowToPayDeferred(player, 8, {canUseSteel: true, title: 'Select how to pay for action', afterPay: () => {
      // This line is needed if the action places or could potentially place a tile
      if (this.howToAffordReds !== undefined) player.howToAffordReds = this.howToAffordReds;
      player.game.defer(new PlaceOceanTile(player));
    }}));

    return undefined;
  }

  public getActionDetails() {
    return new ActionDetails({cost: 8, oceansToPlace: 1});
  }
}
