import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {ASIMOV_AWARD_BONUS} from "../../constants";

export class Politician implements IAward {
  public name: string = 'Politician';
  public description: string = 'Most delegates placed during the game'

  public getScore(player: Player): number {
    let score = player.totalDelegatesPlaced;
    if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
    return score;
  }
}
