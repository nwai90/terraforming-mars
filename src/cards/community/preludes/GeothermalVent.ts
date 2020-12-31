import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Game} from '../../../Game';
import {CardMetadata} from '../../CardMetadata';
import {CardRenderer} from '../../render/CardRenderer';

export class GeothermalVent extends PreludeCard implements IProjectCard {
    public tags = [];
    public name = CardName.GEOTHERMAL_VENT;

    public play(player: Player, game: Game) {
      player.addProduction(Resources.HEAT, 2);
      game.increaseTemperature(player, 2);
      return undefined;
    }

    public metadata: CardMetadata = {
      cardNumber: 'Y12',
      renderData: CardRenderer.builder((b) => {
        b.temperature(2).br;
        b.productionBox((pb) => pb.heat(2));
      }),
      description: 'Raise temperature 2 steps. Increase your heat production 2 steps.',
    }
}

