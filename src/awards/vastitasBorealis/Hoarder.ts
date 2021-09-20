import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {ASIMOV_AWARD_BONUS} from "../../constants";

export class Hoarder implements IAward {
  public name: string = 'Hoarder';
  public description: string = 'Most cards in hand'
  
  public getScore(player: Player): number {
    let score = player.cardsInHand.length;
    if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
    return score;
  }
}
