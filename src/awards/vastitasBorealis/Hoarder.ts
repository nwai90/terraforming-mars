import {Phase} from "../../Phase";
import {Player} from "../../Player";
import {getAdditionalScore, IAward} from "../IAward";

export class Hoarder implements IAward {
  public name: string = 'Hoarder';
  public description: string = 'Have the most cards in hand'
  
  public getScore(player: Player): number {
    if (player.game.phase === Phase.RESEARCH) return 0;
    let score = player.cardsInHand.length;
    return score + getAdditionalScore(player);
  }
}
