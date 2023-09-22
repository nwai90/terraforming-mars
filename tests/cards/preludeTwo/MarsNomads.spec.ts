import {expect} from 'chai';
import {MarsNomads} from '../../../src/cards/preludeTwo/MarsNomads';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {SpaceBonus} from '../../../src/SpaceBonus';
import {SpaceType} from '../../../src/SpaceType';

describe('MarsNomads', function() {
  let card : MarsNomads; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new MarsNomads();
    
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Play', function() {
    const targetSpace = game.board.spaces.find((space) => space.bonus.length === 1 && space.bonus[0] === SpaceBonus.PLANT)!;

    const selectSpace = card.play(player);
    selectSpace.cb(targetSpace);

    // Initial placement must not grant space bonuses
    expect(player.plants).eq(0);
  });

  it('Action', function() {
    const originalSpace = game.board.getAvailableSpacesOnLand(player)[0];
    originalSpace.hasNomads = true;

    const targetSpace = game.board.getAdjacentSpaces(originalSpace).find((space) => space.spaceType === SpaceType.LAND)!;

    const selectSpace = card.action(player);
    selectSpace.cb(targetSpace);
    expect(targetSpace.hasNomads).is.true;
    expect(originalSpace.hasNomads).is.false;
  });
});
