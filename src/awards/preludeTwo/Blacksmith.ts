import {Player} from "../../Player";
import {Resources} from "../../Resources";
import {getAdditionalScore, IAward} from "../IAward";

export class Blacksmith implements IAward {
  public name: string = 'Blacksmith';
  public description: string = 'Have the most steel and heat production'
  
  public getScore(player: Player): number {
    let score = player.getProduction(Resources.STEEL) + player.getProduction(Resources.HEAT);
    return score + getAdditionalScore(player);
  }
}
