import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {MAX_TEMPERATURE, REDS_RULING_POLICY_COST} from '../../../constants';
import {StandardProjectCard} from '../../StandardProjectCard';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {HowToAffordRedsPolicy, ActionDetails, RedsPolicy} from '../../../turmoil/RedsPolicy';
import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {Units} from '../../../Units';

export class AsteroidStandardProject extends StandardProjectCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor() {
    super({
      name: CardName.ASTEROID_STANDARD_PROJECT,
      cost: 14,
      tr: {temperature: 1},
      metadata: {
        cardNumber: 'SP9',
        renderData: CardRenderer.builder((b) =>
          b.standardProject('Spend 14 M€ to raise temperature 1 step.', (eb) => {
            eb.megacredits(14).startAction.temperature(1);
          }),
        ),
      },
    });
  }

  public canAct(player: Player): boolean {
    if (player.game.getTemperature() === MAX_TEMPERATURE) return false;

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
    player.game.increaseTemperature(player, 1);
  }

  public getActionDetails(_player: Player, card: IProjectCard) {
    return new ActionDetails({card: card, temperatureIncrease: 1});
  }
}
