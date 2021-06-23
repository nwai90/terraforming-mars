import {IAward} from './IAward';
import {Player} from '../Player';
import {Resources} from '../Resources';
import {CardName} from '../CardName';
import {BJORN_AWARD_BONUS} from '../constants';

export class Industrialist implements IAward {
    public name: string = 'Industrialist';
    public description: string = 'Having most steel and energy resources (after final production round)'
    public getScore(player: Player): number {
      let score: number;

      if (player.game.isDoneWithFinalProduction()) {
        score = player.steel + player.energy;
      } else {
        score = player.steel + player.getProduction(Resources.STEEL) + player.getProduction(Resources.ENERGY);
      }

      if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;

      return score;
    }
}
