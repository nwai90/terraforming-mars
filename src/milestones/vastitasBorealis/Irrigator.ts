import {Board} from "../../boards/Board";
import {Player} from "../../Player";
import {isAresTile} from "../../TileType";
import {IMilestone} from "../IMilestone";

export class Irrigator implements IMilestone {
  public name: string = 'Irrigator';
  public description: string = 'Have 4 tiles adjacent to oceans';

  public getScore(player: Player): number {
    return player.game.board.spaces.filter((space) =>
        space.player === player &&
        space.tile !== undefined &&
        isAresTile(space.tile.tileType) === false &&
        player.game.board.getAdjacentSpaces(space).some((space) => Board.isOceanSpace(space)),
    ).length;
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 4;
  }
}
