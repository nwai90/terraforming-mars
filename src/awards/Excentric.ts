import {IAward} from './IAward';
import {Player} from '../Player';
import {CardName} from '../CardName';
import {BJORN_AWARD_BONUS} from '../constants';

export class Excentric implements IAward {
    public name: string = 'Excentric';
    public description: string = 'Most resources on cards'
    public getScore(player: Player): number {
      let score: number = 0;

      player.getCardsWithResources().forEach((card) => {
        score += player.getResourcesOnCard(card)!;
      });

      if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;

      return score;
    }
}
