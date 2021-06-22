import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';

export class RimSettler implements IMilestone {
    public name: string = 'Rim Settler';
    public description: string = 'Have 3 Jovian tags';

    public getScore(player: Player): number {
      return player.getTagCount(Tags.JOVIAN);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 3;
    }
}
