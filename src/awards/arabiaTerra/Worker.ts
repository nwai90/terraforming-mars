import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Worker implements IAward {
  public name: string = 'Worker';
  public description: string = 'Most active (blue) action cards'
  
  public getScore(player: Player): number {
    let score = player.playedCards.filter((card) => card.action !== undefined).length;
    if (player.corporationCard?.action !== undefined) score += 1;

    return score;
  }
}
