import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {TileType} from '../../TileType';

export class Landshaper implements IMilestone {
    public name: string = 'Landshaper';
    public description: string = 'Have at least 1 greenery tile, 1 city tile and 1 special tile.';

    public getScore(player: Player): number {
      const board = player.game.board;
      const greeneryCount = board.getSpaceCount(TileType.GREENERY, player);
      const citiesCount = player.getCitiesCount();
      const specialTilesCount = board.getSpacesWithSpecialTiles().filter((s) => s.player === player).length;

      return Math.min(greeneryCount, citiesCount, specialTilesCount);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 1;
    }
}
