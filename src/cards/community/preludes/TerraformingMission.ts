import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';
import {PlaceOceanTile} from '../../../deferredActions/PlaceOceanTile';

export class TerraformingMission extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.TERRAFORMING_MISSION,

      metadata: {
        cardNumber: 'Y29',
        renderData: CardRenderer.builder((b) => {
          b.oceans(1);
          b.plants(8).heat(8);
          b.megacredits(-12);
        }),
        description: 'Place an ocean tile. Gain 8 plants and 8 heat. Pay 12 M€.',
      },
    });
  }

  public play(player: Player) {
    player.addResource(Resources.PLANTS, 8);
    player.addResource(Resources.HEAT, 8);
    player.game.defer(new PlaceOceanTile(player));
    player.game.defer(new SelectHowToPayDeferred(player, 12));
    return undefined;
  }
}
