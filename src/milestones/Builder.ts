import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';

export class Builder implements IMilestone {
    public name: string = 'Builder';
    public description: string = 'Have 8 Building tags';

    public getScore(player: Player): number {
      return player.getTagCount(Tags.BUILDING);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 8;
    }
}
