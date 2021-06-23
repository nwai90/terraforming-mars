import {CardName} from "../../CardName";
import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Generator implements IAward {
  public name: string = 'Generator';
  public description: string = 'Most Power tags'
  
  public getScore(player: Player): number {
    let score = player.getTagCount(Tags.ENERGY, false, false);
    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
    return score;
  }
}
