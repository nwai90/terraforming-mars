
import {IAward} from './IAward';
import {Player} from '../Player';
import {CardType} from '../cards/CardType';
import {CardName} from '../CardName';
import {ASIMOV_AWARD_BONUS} from '../constants';

export class Magnate implements IAward {
    public name: string = 'Magnate';
    public description: string = 'Most automated cards in play (green cards)'
    public getScore(player: Player): number {
      let score = player.playedCards
        .filter((card) => card.cardType === CardType.AUTOMATED).length;

      if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;

      return score;
    }
}
