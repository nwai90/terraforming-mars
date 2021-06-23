import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {Resources} from "../../Resources";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Producer implements IAward {
  public name: string = 'Producer';
  public description: string = 'Most sets of all 6 productions'
  
  public getScore(player: Player): number {
    let score = Math.min(player.getProduction(Resources.MEGACREDITS), player.getProduction(Resources.STEEL),
      player.getProduction(Resources.TITANIUM), player.getProduction(Resources.PLANTS),
      player.getProduction(Resources.ENERGY), player.getProduction(Resources.HEAT));

    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;

    return score;
  }
}
