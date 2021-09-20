import {IAward} from './IAward';
import {Player} from '../Player';
import {TileType} from '../TileType';
import {CardName} from '../CardName';
import {ASIMOV_AWARD_BONUS} from '../constants';

export class Cultivator implements IAward {
    public name: string = 'Cultivator';
    public description: string = 'Most greenery tiles'
    public getScore(player: Player): number {
      let score = player.game.getSpaceCount(TileType.GREENERY, player);
      if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
      return score;
    }
}
