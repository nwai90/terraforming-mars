import {expect} from 'chai';
import {UnexpectedApplication} from '../../../src/cards/preludeTwo/UnexpectedApplication';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {Mine} from '../../../src/cards/base/Mine';

describe('UnexpectedApplication', function() {
  let card : UnexpectedApplication; let player : Player; let game : Game;

  beforeEach(() => {
    card = new UnexpectedApplication();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('foobar', [player], player);
  });

  it('canPlay', function() {
    player.cardsInHand.push(card);
    expect(card.canPlay(player)).is.false;

    player.cardsInHand.push(new Mine());
    expect(card.canPlay(player)).is.true;
  });

  it('Play', function() {
    player.cardsInHand.push(new Mine());

    card.play(player);
    game.deferredActions.runAll(() => {});
    expect(player.cardsInHand).has.length(0);
    expect(game.getVenusScaleLevel()).eq(2);
  });
});
