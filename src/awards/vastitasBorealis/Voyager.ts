import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Voyager implements IAward {
  public name: string = 'Voyager';
  public description: string = 'Most Jovian tags in play'
  
  public getScore(player: Player): number {
    return player.getTagCount(Tags.JOVIAN, false, false);
  }
}
