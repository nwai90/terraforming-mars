import {expect} from 'chai';
import {RedShips} from '../../../src/cards/preludeTwo/RedShips';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {TileType} from '../../../src/TileType';
import {SpaceType} from '../../../src/SpaceType';

describe('RedShips', function() {
  let card : RedShips; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new RedShips();
    
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('canPlay', function() {
    game.setOxygenLevel(3);
    expect(card.canPlay(player)).is.false;

    game.setOxygenLevel(4);
    expect(card.canPlay(player)).is.true;
  });

  it('Action', function() {
    const oceanSpace = game.board.getAvailableSpacesForOcean(player)[0];
    game.addOceanTile(player, oceanSpace.id);

    const adjacentLandSpaces = game.board.getAdjacentSpaces(oceanSpace).filter((space) => space.spaceType === SpaceType.LAND);
    game.simpleAddTile(player, adjacentLandSpaces[0], {tileType: TileType.CITY});
    game.simpleAddTile(player2, adjacentLandSpaces[1], {tileType: TileType.NATURAL_PRESERVE});

    card.action(player);
    expect(player.megaCredits).eq(2);
  });
});
