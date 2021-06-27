import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';

export class LaserFactory extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.LASER_FACTORY,
      tags: [Tags.SPACE],

      metadata: {
        cardNumber: 'Y22',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1).heat(2));
        }),
        description: 'Increase your titanium production 1 step and your heat production 2 steps.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.TITANIUM);
    player.addProduction(Resources.HEAT, 2);
    return undefined;
  }
}
