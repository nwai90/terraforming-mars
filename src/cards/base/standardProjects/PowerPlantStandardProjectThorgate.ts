import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {StandardProjectCard} from '../../StandardProjectCard';
import {Resources} from '../../../Resources';

export class PowerPlantStandardProjectThorgate extends StandardProjectCard {
  constructor() {
    super({
      name: CardName.POWER_PLANT_STANDARD_PROJECT_THORGATE,
      cost: 8,
      metadata: {
        cardNumber: 'SP9',
        renderData: CardRenderer.builder((b) =>
          b.standardProject('Spend 8 M€ to increase your Energy production 1 step.', (eb) => {
            eb.megacredits(8).startAction.production((pb) => {
              pb.energy(1);
            });
          }),
        ),
      },
    });
  }

  actionEssence(player: Player): void {
    player.addProduction(Resources.ENERGY, 1);
  }
}
