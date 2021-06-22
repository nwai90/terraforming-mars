import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {CardType} from '../cards/CardType';

export class Tycoon implements IMilestone {
    public name: string = 'Tycoon';
    public description: string = 'Have 15 active and automated cards in play';

    public getScore(player: Player): number {
      return player.playedCards
        .filter((card) => card.cardType === CardType.ACTIVE || card.cardType === CardType.AUTOMATED).length;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) > 14;
    }
}
