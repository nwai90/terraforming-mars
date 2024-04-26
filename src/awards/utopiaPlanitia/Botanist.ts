import {Player} from "../../Player";
import {Resources} from "../../Resources";
import {getAdditionalScore, IAward} from "../IAward";

export class Botanist implements IAward {
  public name: string = 'Botanist';
  public description: string = 'Have the most plant production'
  
  public getScore(player: Player): number {
    let score = player.getProduction(Resources.PLANTS);
    return score + getAdditionalScore(player);
  }
}
