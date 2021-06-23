import {IAward} from './IAward';
import {Player} from '../Player';
import {isAresTile} from '../TileType';
import {Board} from '../boards/Board';
import {CardName} from '../CardName';
import {BJORN_AWARD_BONUS} from '../constants';

export class EstateDealer implements IAward {
    public name: string = 'Estate Dealer';
    public description: string = 'Most tiles adjacent to ocean tiles'
    public getScore(player: Player): number {
      let score = player.game.board.spaces.filter((space) =>
        space.player === player &&
        space.tile !== undefined &&
        isAresTile(space.tile.tileType) === false &&
        player.game.board.getAdjacentSpaces(space).some((space) => Board.isOceanSpace(space)),
      ).length;

      if (player.cardIsInEffect(CardName.BJORN)) score += BJORN_AWARD_BONUS;
      return score;
    }
}
