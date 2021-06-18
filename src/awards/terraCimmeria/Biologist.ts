import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Biologist implements IAward {
  public name: string = 'Biologist';
  public description: string = 'Most Animal, Plant and Microbe tags'

  public getScore(player: Player): number {
    return player.getTagCount(Tags.MICROBE, false, false) + player.getTagCount(Tags.PLANT, false, false) + player.getTagCount(Tags.ANIMAL, false, false);
  }
}
