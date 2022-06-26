import {CardName} from "../../CardName";
import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {ASIMOV_AWARD_BONUS} from "../../constants";

export class Biologist implements IAward {
  public name: string = 'Biologist';
  public description: string = 'Most Animal, Plant and Microbe tags'

  public getScore(player: Player): number {
    let score = player.getTagCountNew(Tags.MICROBE, 'award') + player.getTagCountNew(Tags.PLANT, 'award') + player.getTagCountNew(Tags.ANIMAL, 'award');
    if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
    return score;
  }
}
