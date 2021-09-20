import {IAward} from './IAward';
import {Player} from '../Player';
import {isAresTile} from '../TileType';
import {CardName} from '../CardName';
import {ASIMOV_AWARD_BONUS} from '../constants';

export class DesertSettler implements IAward {
    public name: string = 'Desert Settler';
    public description: string = 'Most tiles south of the equator (the four bottom rows)'
    public getScore(player: Player): number {
      let score = player.game.board.spaces
        .filter((space) => space.player !== undefined &&
            space.player === player &&
            space.tile !== undefined &&
            isAresTile(space.tile.tileType) === false &&
            space.y >= 5 && space.y <= 8).length;

      if (player.cardIsInEffect(CardName.ASIMOV)) score += ASIMOV_AWARD_BONUS;
      return score;
    }
}
