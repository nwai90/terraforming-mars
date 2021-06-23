import {CardName} from "../../CardName";
import {CardType} from "../../cards/CardType";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Adapter implements IAward {
  public name: string = 'Adapter';
  public description: string = 'Most cards in play with requirements'
  
  public getScore(player: Player): number {
    let score = player.playedCards.filter((card) => {
      const isValidCardType = card.cardType !== CardType.EVENT;
      const hasRequirements = card.requirements !== undefined;

      return isValidCardType && hasRequirements;
    }).length;

    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;

    return score;
  }
}
