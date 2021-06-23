import {CardName} from "../../CardName";
import {CardType} from "../../cards/CardType";
import {BASE_CARD_MANIFEST} from "../../cards/StandardCardManifests";
import {Player} from "../../Player";
import {IAward} from "../IAward";
import {BJORN_AWARD_BONUS} from "../../constants";

export class Purist implements IAward {
  public name: string = 'Purist';
  public description: string = 'Most cards in play from the base game'
  
  public getScore(player: Player): number {
    const validCardTypes = [CardType.ACTIVE, CardType.AUTOMATED];
    let score = player.playedCards.filter((card) => (BASE_CARD_MANIFEST.projectCards.factories.has(card.name)) && validCardTypes.includes(card.cardType)).length;
    if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
    return score;
  }
}
