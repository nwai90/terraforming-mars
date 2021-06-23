import {IAward} from './IAward';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';
import {CardName} from '../CardName';
import {BJORN_AWARD_BONUS} from '../constants';

export class Scientist implements IAward {
    public name: string = 'Scientist';
    public description: string = 'Having the most science tags in play'
    public getScore(player: Player): number {
      let score = player.getTagCount(Tags.SCIENCE, false, false);
      if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
      return score;
    }
}
