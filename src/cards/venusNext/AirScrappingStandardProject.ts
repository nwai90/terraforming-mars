import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {MAX_VENUS_SCALE, REDS_RULING_POLICY_COST} from '../../constants';
import {StandardProjectCard} from '../StandardProjectCard';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {HowToAffordRedsPolicy, ActionDetails, RedsPolicy} from '../../turmoil/RedsPolicy';
import {IProjectCard} from '../IProjectCard';
import {Units} from '../../Units';
import {Card} from '../Card';

export class AirScrappingStandardProject extends StandardProjectCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor(properties = {
    name: CardName.AIR_SCRAPPING_STANDARD_PROJECT,
    cost: 15,
    tr: {venus: 1},
    metadata: {
      cardNumber: 'SP1',
      renderData: CardRenderer.builder((b) =>
        b.standardProject('Spend 15 M€ to raise Venus 1 step.', (eb) => {
          eb.megacredits(15).startAction.venus(1);
        }),
      ),
    },
  }) {
    super(properties);
  }

  public canAct(player: Player): boolean {
    if (player.game.getVenusScaleLevel() >= MAX_VENUS_SCALE) return false;

    const trGain = player.computeTerraformRatingBump(this);
    Card.setRedsWarningText(player, trGain, this, false, 'take this action');

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
    const canUseSpireScience = player.isCorporation(CardName.SPIRE);

    return player.canAfford(this.cost - this.discount(player), {spireScience: canUseSpireScience});
  }

  actionEssence(player: Player): void {
    player.game.increaseVenusScaleLevel(player, 1);
  }

  public getActionDetails(_player: Player, card: IProjectCard) {
    return new ActionDetails({card: card, venusIncrease: 1});
  }
}
