import {Player} from "../../Player";
import {Tags} from "../../cards/Tags";
import {getAdditionalScore, IAward} from "../IAward";

export class Investor implements IAward {
  public name: string = 'Investor';
  public description: string = 'Have the most Earth tags in play'
  
  public getScore(player: Player): number {
    let score = player.getTagCount(Tags.EARTH, 'award');
    return score + getAdditionalScore(player);
  }
}
