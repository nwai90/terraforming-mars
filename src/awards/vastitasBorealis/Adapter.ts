import {CardType} from "../../cards/CardType";
import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Adapter implements IAward {
  public name: string = 'Adapter';
  public description: string = 'Most cards with requirements (event cards do not count)'
  
  public getScore(player: Player): number {
    const validCards = player.playedCards.filter((card) => {
      const isValidCardType = card.cardType !== CardType.EVENT;
      const hasRequirements = card.requirements !== undefined;

      return isValidCardType && hasRequirements;
    });

    return validCards.length;
  }
}
