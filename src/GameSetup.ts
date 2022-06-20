import {Board} from './boards/Board';
import {BoardName} from './boards/BoardName';
import {ElysiumBoard} from './boards/ElysiumBoard';
import {Game, GameId, GameOptions} from './Game';
import {HellasBoard} from './boards/HellasBoard';
import {OriginalBoard} from './boards/OriginalBoard';
import {Player} from './Player';
import {Resources} from './Resources';
import {ColonyName} from './colonies/ColonyName';
import {Color} from './Color';
import {TileType} from './TileType';
import {Random} from './Random';
import {AmazonisBoard} from './boards/AmazonisBoard';
import {ArabiaTerraBoard} from './boards/ArabiaTerraBoard';
import {VastitasBorealisBoard} from './boards/VastitasBorealisBoard';
import {TerraCimmeriaBoard} from './boards/TerraCimmeriaBoard';
import {SerializedBoard} from './boards/SerializedBoard';
import {SerializedGame} from './SerializedGame';

type BoardFactory = {
  newInstance: (shuffle: boolean, rng: Random, includeVenus: boolean, includePromo: boolean, erodedSpaces: Array<string>) => Board;
  deserialize: (board: SerializedBoard, players: Array<Player>) => Board;
}
const boards: Map<BoardName, BoardFactory> = new Map(
  [[BoardName.ORIGINAL, OriginalBoard],
    [BoardName.HELLAS, HellasBoard],
    [BoardName.ELYSIUM, ElysiumBoard],
    [BoardName.AMAZONIS, AmazonisBoard],
    [BoardName.ARABIA_TERRA, ArabiaTerraBoard],
    [BoardName.TERRA_CIMMERIA, TerraCimmeriaBoard],
    [BoardName.VASTITAS_BOREALIS, VastitasBorealisBoard]],
);

export class GameSetup {
  public static newBoard(boardName: BoardName, shuffle: boolean, rng: Random, includeVenus: boolean, includePromo: boolean, erodedSpaces: Array<string>): Board {
    const factory = boards.get(boardName) ?? OriginalBoard;
    return factory.newInstance(shuffle, rng, includeVenus, includePromo, erodedSpaces);
  }

  public static deserializeBoard(players: Array<Player>, gameOptions: GameOptions, d: SerializedGame) {
    const playersForBoard = players.length !== 1 ? players : [players[0], GameSetup.neutralPlayerFor(d.id)];
    const factory = boards.get(gameOptions.boardName) ?? OriginalBoard;
    return factory.deserialize(d.board, playersForBoard);
  }

  public static setStartingProductions(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 1);
    player.addProduction(Resources.STEEL, 1);
    player.addProduction(Resources.TITANIUM, 1);
    player.addProduction(Resources.PLANTS, 1);
    player.addProduction(Resources.ENERGY, 1);
    player.addProduction(Resources.HEAT, 1);
  }

  public static includesCommunityColonies(gameOptions: GameOptions) : boolean {
    if (!gameOptions.customColoniesList) return false;
    if (gameOptions.customColoniesList.includes(ColonyName.IAPETUS)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.MERCURY)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.HYGIEA)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.TITANIA)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.VENUS)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.LEAVITT)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.PALLAS)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.DEIMOS)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.TERRA)) return true;
    if (gameOptions.customColoniesList.includes(ColonyName.KUIPER)) return true;

    return false;
  }

  public static neutralPlayerFor(gameId: GameId): Player {
    return new Player('neutral', Color.NEUTRAL, true, 0, gameId + '-neutral');
  }

  public static setupNeutralPlayer(game: Game) {
    // Single player add neutral player
    // put 2 neutrals cities on board with adjacent forest
    const neutral = this.neutralPlayerFor(game.id);

    function placeCityAndForest(game: Game, direction: -1 | 1) {
      const board = game.board;
      const citySpace = game.getSpaceByOffset(direction, TileType.CITY);
      game.simpleAddTile(neutral, citySpace, {tileType: TileType.CITY});
      const adjacentSpaces = board.getAdjacentSpaces(citySpace).filter((s) => game.board.canPlaceTile(s));
      if (adjacentSpaces.length === 0) {
        throw new Error('No space for forest');
      }
      let idx = game.discardForCost(TileType.GREENERY);
      idx = Math.max(idx-1, 0); // Some cards cost zero.
      const forestSpace = adjacentSpaces[idx%adjacentSpaces.length];
      game.simpleAddTile(neutral, forestSpace, {tileType: TileType.GREENERY});
    }

    placeCityAndForest(game, 1);
    placeCityAndForest(game, -1);
  }
}
