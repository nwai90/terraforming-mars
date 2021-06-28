import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {Units} from '../../../Units';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {ISpace} from '../../../boards/ISpace';
import {SelectSpace} from '../../../inputs/SelectSpace';
import {TileType} from '../../../TileType';
import {SpaceType} from '../../../SpaceType';

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

  // PlaceCityTile is not used here due to override of granting placement bonuses
  public play(player: Player) {
    const spaces = player.game.board.getAvailableSpacesForCity(player);

    player.game.defer(new DeferredAction(player, () => {
      return new SelectSpace(
        'Select space for prototype city tile',
        spaces,
        (space: ISpace) => {
          player.game.addTile(player, SpaceType.LAND, space, {tileType: TileType.CITY}, false);
          return undefined;
        },
      );
    }));

    player.addProduction(Resources.MEGACREDITS);
    player.addProduction(Resources.ENERGY);
    return undefined;
  }
}
