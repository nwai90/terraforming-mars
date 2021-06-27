import {expect} from 'chai';
import {TerrainAcquisition} from '../../../src/cards/community/preludes/TerrainAcquisition';
import {Tags} from '../../../src/cards/Tags';
import {Game} from '../../../src/Game';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TestPlayers} from '../../TestPlayers';

describe('TerrainAcquisition', function() {
  it('Should play', function() {
    const card = new TerrainAcquisition();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    card.play(player);

    expect(player.cardsInHand).has.lengthOf(3);
    expect(player.cardsInHand.filter((card) => card.tags.includes(Tags.BUILDING))).has.lengthOf(3);

    while (player.game.deferredActions.length > 0) {
      const selectSpace = game.deferredActions.pop()!.execute() as SelectSpace;
      selectSpace.cb(selectSpace.availableSpaces[0]);
    }

    expect(game.board.spaces.filter((space) => space.player === player && space.tile === undefined)).has.length(4);
  });
});
