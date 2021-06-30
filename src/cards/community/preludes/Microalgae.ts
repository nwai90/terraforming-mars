import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {PlaceOceanTile} from '../../../deferredActions/PlaceOceanTile';

export class Microalgae extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MICROALGAE,
      tags: [Tags.MICROBE],

      metadata: {
        cardNumber: 'Y27',
        renderData: CardRenderer.builder((b) => {
          b.oceans(1);
          b.production((pb) => pb.plants(1));
          b.plants(2);
        }),
        description: 'Place an Ocean tile. Increase your plant production 1 step. Gain 2 plants.',
      },
    });
  }

  public play(player: Player) {
    player.game.defer(new PlaceOceanTile(player, 'Select space for first ocean'));
    player.addProduction(Resources.PLANTS);
    player.addResource(Resources.PLANTS, 2);
    return undefined;
  }
}
