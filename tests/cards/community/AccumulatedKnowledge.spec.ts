import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {AccumulatedKnowledge} from '../../../src/cards/community/preludes/AccumulatedKnowledge';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {TestPlayers} from '../../TestingUtils';

describe('AccumulatedKnowledge', function() {
  let card : AccumulatedKnowledge; let player : Player; let game: Game;

  beforeEach(function() {
    card = new AccumulatedKnowledge();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    game = new Game('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    card.play(player, game);
    game.deferredActions.runNext();
    expect(player.cardsInHand).has.lengthOf(4);
    
    const orOptions = game.deferredActions.next()!.execute() as OrOptions;
    orOptions.options[0].cb(player.cardsInHand[0]);
    expect(player.cardsInHand).has.lengthOf(4);
  });
});
