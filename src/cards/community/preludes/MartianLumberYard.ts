import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Tags} from '../../Tags';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';

export class MartianLumberYard extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.MARTIAN_LUMBER_YARD,
        tags: [Tags.BUILDING],

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
      player.setResource(Resources.STEEL, 2);
      player.setResource(Resources.PLANTS, 3);
      return undefined;
    }
}

