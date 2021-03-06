import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Tags} from '../../Tags';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';

export class BotanicalHarvest extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.BOTANICAL_HARVEST,
        tags: [Tags.PLANT],

        metadata: {
          cardNumber: 'Y09',
          renderData: CardRenderer.builder((b) => {
            b.oxygen(1).production((pb) => pb.plants(1)).br;
            b.plants(5);
          }),
          description: 'Raise oxygen 1 step. Increase your plant production 1 step. Gain 5 plants.',
        },
      });
    }

    public play(player: Player) {
      player.game.increaseOxygenLevel(player, 1);
      player.addProduction(Resources.PLANTS);
      player.addResource(Resources.PLANTS, 5);
      return undefined;
    }
}

