import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {ASIMOV_AWARD_BONUS} from "../../constants";

export class Historian implements IAward {
  public name: string = 'Historian';
  public description: string = 'Most event cards played';

  public getScore(player: Player): number {
    let score = player.getPlayedEventsCount();
    if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
    return score;
  }
}
