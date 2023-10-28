import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Phase} from '../Phase';

export class Planner implements IMilestone {
    public name: string = 'Planner';
    public description: string = 'Have at least 16 cards in hand';

    public getScore(player: Player): number {
      if (player.game.phase === Phase.RESEARCH) return 0;
      return player.cardsInHand.length;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 16;
    }
}
