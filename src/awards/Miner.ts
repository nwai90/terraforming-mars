import {IAward} from './IAward';
import {Player} from '../Player';
import {Resources} from '../Resources';
import {CardName} from '../CardName';
import {ASIMOV_AWARD_BONUS} from '../constants';

export class Miner implements IAward {
    public name: string = 'Miner';
    public description: string = 'Having the most steel and titanium resource cubes (after final production round)'
    public getScore(player: Player): number {
      let score: number;

      if (player.game.isDoneWithFinalProduction()) {
        score = player.steel + player.titanium;
      } else {
        score = player.steel + player.getProduction(Resources.STEEL) + player.titanium + player.getProduction(Resources.TITANIUM);
      }

      if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;

      return score;
    }
}
