import {IAward} from './IAward';
import {Player} from '../Player';
import {Resources} from '../Resources';
import {CardName} from '../CardName';
import {BJORN_AWARD_BONUS} from '../constants';

export class Banker implements IAward {
    public name: string = 'Banker';
    public description: string = 'Having the highest M€ production'
    public getScore(player: Player): number {
      let score = player.getProduction(Resources.MEGACREDITS);
      if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
      return score;
    }
}
