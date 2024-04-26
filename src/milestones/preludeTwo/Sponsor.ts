import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {CardType} from '../../cards/CardType';

export class Sponsor implements IMilestone {
    public name: string = 'Sponsor';
    public description: string = 'Have at least 3 cards in play with a cost of 20 M€ or more';

    public getScore(player: Player): number {
      return player.playedCards.filter((card) => card.cost >= 20 && [CardType.ACTIVE, CardType.AUTOMATED].includes(card.cardType)).length;
    }
  
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 3;
    }
}
