import {IAward} from './IAward';
import {Player} from '../Player';
import {CardName} from '../CardName';
import {BJORN_AWARD_BONUS} from '../constants';

export class Benefactor implements IAward {
    public name: string = 'Benefactor';
    public description: string = 'Highest terraform rating'
    public getScore(player: Player): number {
      let score = player.getTerraformRating();
      if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
      return score;
    }
}
