import {Board} from "../../boards/Board";
import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {TileType} from "../../TileType";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Urbanist implements IAward {
  public name: string = 'Urbanist';
  public description: string = 'Most VP from city tile adjacencies on Mars'

  public getScore(player: Player): number {
    let score = 0;

    player.game.board.spaces.forEach((space) => {
      // Victory points for greenery tiles adjacent to cities
      if (Board.isCitySpace(space) && space.player !== undefined && space.player.id === player.id) {
        const adjacent = player.game.board.getAdjacentSpaces(space);
        for (const adj of adjacent) {
          if (adj.tile && adj.tile.tileType === TileType.GREENERY) score++;
        }
      }
    });
    
    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;

    return score;
  }
}
