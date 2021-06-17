import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Generator implements IAward {
  public name: string = 'Generator';
  public description: string = 'Most Power tags'
  
  public getScore(player: Player): number {
    return player.getTagCount(Tags.ENERGY, false, false);
  }
}
