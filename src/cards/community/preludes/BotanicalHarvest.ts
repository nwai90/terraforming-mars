import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {Tags} from '../../Tags';
import {Resources} from '../../../Resources';
import {CardMetadata} from '../../CardMetadata';
import {CardRenderer} from '../../render/CardRenderer';

export class BotanicalHarvest extends PreludeCard implements IProjectCard {
    public tags = [Tags.PLANT];
    public name = CardName.BOTANICAL_HARVEST;

    public play(player: Player, game: Game) {
      game.increaseOxygenLevel(player, 1);
      player.addProduction(Resources.PLANTS);
      player.setResource(Resources.PLANTS, 5);
      return undefined;
    }

    public metadata: CardMetadata = {
      cardNumber: 'Y09',
      renderData: CardRenderer.builder((b) => {
        b.oxygen(1).production((pb) => pb.plants(1)).br;
        b.plants(5);
      }),
      description: 'Raise oxygen 1 step. Increase your plant production 1 step. Gain 5 plants.',
    }
}

