import {CardName} from "../../CardName";
import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Biologist implements IAward {
  public name: string = 'Biologist';
  public description: string = 'Most Animal, Plant and Microbe tags'

  public getScore(player: Player): number {
    let score = player.getTagCount(Tags.MICROBE, false, false) + player.getTagCount(Tags.PLANT, false, false) + player.getTagCount(Tags.ANIMAL, false, false);
    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
    return score;
  }
}
