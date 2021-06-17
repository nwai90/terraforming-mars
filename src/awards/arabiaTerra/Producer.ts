import {Player} from "../../Player";
import {Resources} from "../../Resources";
import {IAward} from "../IAward";

export class Producer implements IAward {
  public name: string = 'Producer';
  public description: string = 'Most sets of all 6 productions'
  
  public getScore(player: Player): number {
    return Math.min(player.getProduction(Resources.MEGACREDITS), player.getProduction(Resources.STEEL),
      player.getProduction(Resources.TITANIUM), player.getProduction(Resources.PLANTS),
      player.getProduction(Resources.ENERGY), player.getProduction(Resources.HEAT));
  }
}
