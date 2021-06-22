import {IMilestone} from './IMilestone';
import {Player} from '../Player';

export class Legend implements IMilestone {
    public name: string = 'Legend';
    public description: string = 'Have 5 played Events';

    public getScore(player: Player): number {
      return player.getPlayedEventsCount();
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) > 4;
    }
}
