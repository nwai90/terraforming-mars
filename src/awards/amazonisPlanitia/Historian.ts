import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Historian implements IAward {
  public name: string = 'Historian';
  public description: string = 'Most event cards played';

  public getScore(player: Player): number {
    let score = player.getPlayedEventsCount();
    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
    return score;
  }
}
