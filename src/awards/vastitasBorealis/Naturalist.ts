import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {Resources} from "../../Resources";
import {IAward} from "../IAward";
import {ASIMOV_AWARD_BONUS} from "../../constants";

export class Naturalist implements IAward {
  public name: string = 'Naturalist';
  public description: string = 'Most plant and heat production'
  
  public getScore(player: Player): number {
    let score = player.getProduction(Resources.HEAT) + player.getProduction(Resources.PLANTS);
    if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;

    return score;
  }
}
