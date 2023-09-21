import {expect} from 'chai';
import {CarbonNanosystems} from '../../../src/cards/preludeTwo/CarbonNanosystems';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {Research} from '../../../src/cards/base/Research';
import {SearchForLife} from '../../../src/cards/base/SearchForLife';

describe('CarbonNanosystems', function() {
  let card : CarbonNanosystems; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new CarbonNanosystems();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Play', function() {
    player.playCard(card);
    expect(card.resourceCount).eq(1);
    expect(card.getVictoryPoints()).eq(1);
  });

  it('Adds resources when playing Science tags', function() {
    player.playedCards.push(card);

    player.playCard(new SearchForLife());
    TestingUtils.runAllActions(game);
    expect(card.resourceCount).eq(1);

    player.playCard(new Research());
    TestingUtils.runAllActions(game);
    expect(card.resourceCount).eq(3);

    player2.playCard(new SearchForLife());
    TestingUtils.runAllActions(game);
    expect(card.resourceCount).eq(3);
  });
});
