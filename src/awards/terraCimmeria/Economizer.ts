import {CardType} from "../../cards/CardType";
import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Economizer implements IAward {
  public name: string = 'Economizer';
  public description: string = 'Most played cards costing 10 M€ or less (event cards do not count)'

  public getScore(player: Player): number {
    const validCardTypes = [CardType.ACTIVE, CardType.AUTOMATED];
    return player.playedCards
      .filter((card) => (card.cost <= 10) && validCardTypes.includes(card.cardType)).length;
  }
}
