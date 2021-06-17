import {Board} from "../../boards/Board";
import {Player} from "../../Player";
import {SpaceType} from "../../SpaceType";
import {isAresTile} from "../../TileType";
import {IAward} from "../IAward";

export class Highlander implements IAward {
  public name: string = 'Highlander';
  public description: string = 'Most tiles on Mars not adjacent to oceans'
  
  public getScore(player: Player): number {
    return player.game.board.spaces.filter((space) =>
      space.player === player &&
      space.tile !== undefined &&
      isAresTile(space.tile.tileType) === false &&
      space.spaceType !== SpaceType.COLONY &&
      player.game.board.getAdjacentSpaces(space).every((space) => !Board.isOceanSpace(space)),
    ).length;
  }
}
