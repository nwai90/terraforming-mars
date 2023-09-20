import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {REDS_RULING_POLICY_COST} from '../../../constants';
import {PlaceOceanTile} from '../../../deferredActions/PlaceOceanTile';
import {StandardProjectCard} from '../../StandardProjectCard';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {HowToAffordRedsPolicy, ActionDetails, RedsPolicy} from '../../../turmoil/RedsPolicy';
import {IProjectCard} from '../../IProjectCard';
import {Units} from '../../../Units';
import {Card} from '../../Card';

export class AquiferStandardProject extends StandardProjectCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor() {
    super({
      name: CardName.AQUIFER_STANDARD_PROJECT,
      cost: 18,
      tr: {oceans: 1},
      metadata: {
        cardNumber: 'SP2',
        renderData: CardRenderer.builder((b) =>
          b.standardProject('Spend 18 M€ to place an ocean tile.', (eb) => {
            eb.megacredits(18).startAction.oceans(1);
          })),
      },
    });
  }

  public canAct(player: Player): boolean {
    if (player.game.noOceansAvailable()) return false;

    const trGain = player.computeTerraformRatingBump(this);
    Card.setRedsWarningText(player, trGain, this, false, 'take this action');

    if (PartyHooks.shouldApplyPolicy(player, PartyName.REDS)) {
      this.reserveUnits = Units.adjustUnits(this.reserveUnits, {megacredits: trGain * REDS_RULING_POLICY_COST});
      const actionDetails = this.getActionDetails(player, this);
      this.howToAffordReds = RedsPolicy.canAffordRedsPolicy(player, player.game, actionDetails, false, false, false, false, false, false, true, false, true);

      if (this.howToAffordReds.mustSpendAtMost !== undefined || this.howToAffordReds.bonusMCFromPlay !== undefined) {
        this.reserveUnits = Units.maybeAdjustReservedMegacredits(player, this.reserveUnits, this.howToAffordReds);
      }

      return this.howToAffordReds.canAfford;
    }

    this.howToAffordReds = undefined;
    const canUseAsteroids = player.isCorporation(CardName.KUIPER_COOPERATIVE);
    const canUseSpireScience = player.isCorporation(CardName.SPIRE);

    return player.canAfford(this.cost - super.discount(player), {asteroids: canUseAsteroids, spireScience: canUseSpireScience});
  }

  actionEssence(player: Player): void {
    player.game.defer(new PlaceOceanTile(player, 'Select space for ocean'));
  }

  public getActionDetails(_player: Player, card: IProjectCard) {
    return new ActionDetails({card: card, oceansToPlace: 1});
  }
}
