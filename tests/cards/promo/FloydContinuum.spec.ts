import {expect} from 'chai';
import {FloydContinuum} from '../../../src/cards/promo/FloydContinuum';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {MAX_TEMPERATURE} from '../../../src/constants';
import {TestingUtils} from '../../TestingUtils';

describe('FloydContinuum', function() {
  let card : FloydContinuum; let player : Player; let game : Game;

  beforeEach(() => {
    card = new FloydContinuum();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('foobar', [player], player);
  });

  it('Takes action', function() {
    card.action(player);
    expect(player.megaCredits).eq(0);

    // One parameter maxed
    game.setTemperature(MAX_TEMPERATURE);
    card.action(player);
    expect(player.megaCredits).eq(3);

    // All 3 parameters maxed
    TestingUtils.terraform(player, game);
    player.megaCredits = 0;
    card.action(player);
    expect(player.megaCredits).eq(9);
  });
});
