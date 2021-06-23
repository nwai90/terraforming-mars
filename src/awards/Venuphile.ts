import {IAward} from './IAward';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';
import {CardName} from '../CardName';
import {BJORN_AWARD_BONUS} from '../constants';

export class Venuphile implements IAward {
    public name: string = 'Venuphile';
    public description: string = 'Having the most Venus tags in play'
    public getScore(player: Player): number {
      let score = player.getTagCount(Tags.VENUS, false, false);
      if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
      return score;
    }
}
