import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../CardRequirements';
import {Size} from '../render/Size';
import {Player} from '../../Player';
import {TileType} from '../../TileType';
import {Board} from '../../boards/Board';
import {Resources} from '../../Resources';

export class RedShips extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.RED_SHIPS,
      cost: 2,
      requirements: CardRequirements.builder((b) => b.oxygen(4)),

      metadata: {
        cardNumber: '??',
        description: 'Requires 4% oxygen.',
        renderData: CardRenderer.builder((b) => {
          b.action('Gain 1 M€ for each CITY AND SPECIAL TILE adjacent to oceans, regardless of their owner.', (eb) => {
            eb.empty().startAction.megacredits(1).slash().nbsp(Size.TINY).cityOrSpecialTile(1).any.oceans(1).asterix();
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct() {
    return true;
  }

  public action(player: Player) {
    const board = player.game.board;

    const cityAndSpecialTileTypes = [
      TileType.CITY,
      TileType.CAPITAL,
      TileType.OCEAN_CITY,
      TileType.COMMERCIAL_DISTRICT,
      TileType.ECOLOGICAL_ZONE,
      TileType.INDUSTRIAL_CENTER,
      TileType.LAVA_FLOWS,
      TileType.MINING_AREA,
      TileType.MINING_RIGHTS,
      TileType.MOHOLE_AREA,
      TileType.NATURAL_PRESERVE,
      TileType.NUCLEAR_ZONE,
      TileType.RESTRICTED_AREA,
      TileType.DEIMOS_DOWN,
      TileType.GREAT_DAM,
      TileType.MAGNETIC_FIELD_GENERATORS,
      TileType.BIOFERTILIZER_FACILITY,
      TileType.METALLIC_ASTEROID,
      TileType.SOLAR_FARM,
      TileType.OCEAN_FARM,
      TileType.OCEAN_SANCTUARY,
      TileType.MINING_STEEL_BONUS,
      TileType.MINING_TITANIUM_BONUS,
      TileType.PERSEVERANCE_LANDING,
    ];

    const allCityAndSpecialTiles = board.spaces.filter((space) => space.tile !== undefined && cityAndSpecialTileTypes.includes(space.tile.tileType));
    const eligibleTiles = allCityAndSpecialTiles.filter((space) => board.getAdjacentSpaces(space).some((adjSpace) => Board.isOceanSpace(adjSpace)));

    player.addResource(Resources.MEGACREDITS, eligibleTiles.length, {log: true});

    return undefined;
  }
}
