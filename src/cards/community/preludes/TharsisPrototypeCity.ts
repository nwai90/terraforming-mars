import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {PlaceCityTile} from '../../../deferredActions/PlaceCityTile';
import {Units} from '../../../Units';

export class TharsisPrototypeCity extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.THARSIS_PROTOTYPE_CITY,
      tags: [Tags.ENERGY, Tags.BUILDING, Tags.CITY],
      productionBox: Units.of({megacredits: 1, energy: 1}),

      metadata: {
        cardNumber: 'Y23',
        renderData: CardRenderer.builder((b) => {
          b.city().asterix();
          b.production((pb) => pb.megacredits(1).energy(1));
        }),
        description: 'Place a city tile. Do not collect any placement bonuses. Increase your M€ and energy production 1 step each.',
      },
    });
  }

  public play(player: Player) {
    player.game.defer(new PlaceCityTile(player));
    player.addProduction(Resources.MEGACREDITS);
    player.addProduction(Resources.ENERGY);
    return undefined;
  }
}
