import {CardType} from "../../cards/CardType";
import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Curator implements IAward {
  public name: string = 'Curator';
  public description: string = 'Most tags on blue and green cards';

  public getScore(player: Player): number {
    const validCardTypes = [CardType.ACTIVE, CardType.AUTOMATED];
    return player.playedCards.filter((card) => validCardTypes.includes(card.cardType)).map((card) => card.tags.length).reduce((a, b) => a + b, 0);
  }
}
