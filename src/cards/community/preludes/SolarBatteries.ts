import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';

export class SolarBatteries extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.SOLAR_BATTERIES,
      tags: [Tags.ENERGY],

      metadata: {
        cardNumber: 'Y21',
        renderData: CardRenderer.builder((b) => {
          b.temperature(1);
          b.production((pb) => pb.energy(1));
          b.megacredits(7);
        }),
        description: 'Raise temperature 1 step. Increase your energy production 1 step. Gain 7 M€.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY);
    player.game.increaseTemperature(player, 1);
    player.addResource(Resources.MEGACREDITS, 7);
    return undefined;
  }
}
