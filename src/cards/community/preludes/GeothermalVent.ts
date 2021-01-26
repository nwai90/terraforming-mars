import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';

export class GeothermalVent extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.GEOTHERMAL_VENT,

        metadata: {
          cardNumber: 'Y12',
          renderData: CardRenderer.builder((b) => {
            b.temperature(2).br;
            b.production((pb) => pb.heat(2));
          }),
          description: 'Raise temperature 2 steps. Increase your heat production 2 steps.',
        },
      });
    }

    public play(player: Player) {
      player.addProduction(Resources.HEAT, 2);
      player.game.increaseTemperature(player, 2);
      return undefined;
    }
}

