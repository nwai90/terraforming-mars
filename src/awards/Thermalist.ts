import {IAward} from './IAward';
import {Player} from '../Player';
import {Resources} from '../Resources';
import {CardName} from '../CardName';
import {ASIMOV_AWARD_BONUS} from '../constants';

export class Thermalist implements IAward {
    public name: string = 'Thermalist';
    public description: string = 'Having the most heat resource cubes (after final production round)'
    public getScore(player: Player): number {
      let score: number;

      if (player.game.isDoneWithFinalProduction()) {
        score = player.heat;
      } else {
        score = player.energy + player.heat + player.getProduction(Resources.HEAT);
      }

      if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;

      return score;
    }
}
