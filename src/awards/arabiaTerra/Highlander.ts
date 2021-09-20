import {Board} from "../../boards/Board";
import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {SpaceType} from "../../SpaceType";
import {isAresTile} from "../../TileType";
import {IAward} from "../IAward";
import {ASIMOV_AWARD_BONUS} from "../../constants";

export class Highlander implements IAward {
  public name: string = 'Highlander';
  public description: string = 'Most tiles on Mars not adjacent to oceans'
  
  public getScore(player: Player): number {
    let score = player.game.board.spaces.filter((space) =>
      space.player === player &&
      space.tile !== undefined &&
      isAresTile(space.tile.tileType) === false &&
      space.spaceType !== SpaceType.COLONY &&
      player.game.board.getAdjacentSpaces(space).every((space) => !Board.isOceanSpace(space)),
    ).length;

    if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;

    return score;
  }
}
