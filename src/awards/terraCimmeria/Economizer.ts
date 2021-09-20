import {CardName} from "../../CardName";
import {CardType} from "../../cards/CardType";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {ASIMOV_AWARD_BONUS} from "../../constants";

export class Economizer implements IAward {
  public name: string = 'Economizer';
  public description: string = 'Most cards in play costing 10 M€ or less'

  public getScore(player: Player): number {
    const validCardTypes = [CardType.ACTIVE, CardType.AUTOMATED];
    let score = player.playedCards
      .filter((card) => (card.cost <= 10) && validCardTypes.includes(card.cardType)).length;

    if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
    return score;
  }
}
