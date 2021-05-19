import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Tags} from '../../Tags';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class MartianLumberYard extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.MARTIAN_LUMBER_YARD,
        tags: [Tags.BUILDING],
        productionBox: Units.of({plants: 1, steel: 1}),

        metadata: {
          cardNumber: 'Y14',
          renderData: CardRenderer.builder((b) => {
            b.production((pb) => pb.steel(1).plants(1)).br;
            b.steel(2).plants(3);
          }),
          description: 'Increase your steel and plant production 1 step. Gain 2 steel and 3 plants.',
        },
      });
    }

    public play(player: Player) {
      player.addProduction(Resources.STEEL);
      player.addProduction(Resources.PLANTS);
      player.addResource(Resources.STEEL, 2);
      player.addResource(Resources.PLANTS, 3);
      return undefined;
    }
}

