import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';

export class Ecologist implements IMilestone {
    public name: string = 'Ecologist';
    public description: string = 'Have 4 Animal, Plant and Microbe tags';

    public getScore(player: Player): number {
      const tags: Array<Tags> = [Tags.PLANT, Tags.ANIMAL, Tags.MICROBE];
      return player.getMultipleTagCount(tags);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 4;
    }
}
