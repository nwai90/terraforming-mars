import {expect} from 'chai';
import {Bioplague} from '../../../src/turmoil/globalEvents/society/Bioplague';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {Livestock} from '../../../src/cards/base/Livestock';

describe('Bioplague', function() {
  it('resolve play', function() {
    const card = new Bioplague();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    const livestock = new Livestock()
    player.playedCards.push(livestock);
    player.addResourceTo(livestock);

    card.resolve(game, turmoil);
    expect(game.deferredActions).has.lengthOf(3);
    game.deferredActions.runAll(() => {});
    expect(livestock.resourceCount).to.eq(0);
  });
});