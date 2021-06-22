import {IMilestone} from './IMilestone';
import {Player} from '../Player';

export class Planner implements IMilestone {
    public name: string = 'Planner';
    public description: string = 'Have 16 cards in hand';

    public getScore(player: Player): number {
      return player.cardsInHand.length;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 16;
    }
}
