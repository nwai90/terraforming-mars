import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Worker implements IAward {
  public name: string = 'Worker';
  public description: string = 'Most active (blue) action cards'
  
  public getScore(player: Player): number {
    let score = player.playedCards.filter((card) => card.action !== undefined).length;
    if (player.corporationCard?.action !== undefined) score += 1;
    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;

    return score;
  }
}
