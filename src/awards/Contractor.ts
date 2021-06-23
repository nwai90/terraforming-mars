import {IAward} from './IAward';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';
import {CardName} from '../CardName';
import {BJORN_AWARD_BONUS} from '../constants';

export class Contractor implements IAward {
    public name: string = 'Contractor';
    public description: string = 'Most building tags (event cards do not count)'
    public getScore(player: Player): number {
      let score = player.getTagCount(Tags.BUILDING, false, false);
      if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
      return score;
    }
}
