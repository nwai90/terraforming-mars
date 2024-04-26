import {Player} from "../../Player";
import {TileType} from "../../TileType";
import {getAdditionalScore, IAward} from "../IAward";

export class Metropolist implements IAward {
  public name: string = 'Metropolist';
  public description: string = 'Have the most city tiles'
  
  public getScore(player: Player): number {
    let score = player.game.board.getSpaceCount(TileType.CITY, player);
    return score + getAdditionalScore(player);
  }
}
