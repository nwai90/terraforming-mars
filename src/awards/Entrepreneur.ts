import {IAward} from './IAward';
import {Player} from '../Player';
import {CardName} from '../CardName';
import {ASIMOV_AWARD_BONUS} from '../constants';

export class Entrepreneur implements IAward {
    public name: string = 'Entrepreneur';
    public description: string = 'Most tiles that grant adjacency bonuses'
    public getScore(player: Player): number {
      let score = player.game.board.spaces
        .filter((space) => (
          space.player !== undefined &&
              space.player === player &&
              space.adjacency &&
              space.adjacency.bonus.length > 0)).length;

      if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
      return score;
    }
}
