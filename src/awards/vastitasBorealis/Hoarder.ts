import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Hoarder implements IAward {
  public name: string = 'Hoarder';
  public description: string = 'Most cards in hand'
  
  public getScore(player: Player): number {
    return player.cardsInHand.length;
  }
}
