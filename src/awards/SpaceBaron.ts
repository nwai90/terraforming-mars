import {IAward} from './IAward';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';
import {CardName} from '../CardName';
import {ASIMOV_AWARD_BONUS} from '../constants';

export class SpaceBaron implements IAward {
    public name: string = 'Space Baron';
    public description: string = 'Most space tags (event cards do not count)'
    public getScore(player: Player): number {
      let score = player.getTagCount(Tags.SPACE, false, false);
      if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
      return score;
    }
}
