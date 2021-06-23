import {CardName} from "../../CardName";
import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Voyager implements IAward {
  public name: string = 'Voyager';
  public description: string = 'Most Jovian tags in play'
  
  public getScore(player: Player): number {
    let score = player.getTagCount(Tags.JOVIAN, false, false);
    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;

    return score;
  }
}
