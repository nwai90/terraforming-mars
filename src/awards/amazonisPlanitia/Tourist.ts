import {CardName} from "../../CardName";
import {RedTourismWave} from "../../cards/turmoil/RedTourismWave";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Tourist implements IAward {
  public name: string = 'Tourist';
  public description: string = 'Most empty spaces adjacent to your tiles';

  public getScore(player: Player): number {
    let score = RedTourismWave.getAdjacentEmptySpacesCount(player);
    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
    return score;
  }
}
