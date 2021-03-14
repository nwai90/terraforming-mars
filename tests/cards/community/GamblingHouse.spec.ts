import {expect} from 'chai';
import {GamblingHouse} from '../../../src/cards/community/preludes/GamblingHouse';
import {AlliedBanks} from '../../../src/cards/prelude/AlliedBanks';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {TestingUtils} from '../../TestingUtils';

describe('GamblingHouse', function() {
  let card : GamblingHouse; let player : Player; let game : Game;

  beforeEach(function() {
    card = new GamblingHouse();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions({preludeExtension: true});
    game = Game.newInstance('foobar', [player, redPlayer], player, gameOptions);
  });

  it('Should play', function() {
    game.dealer.preludeDeck.push(new AlliedBanks()); // ensure first prelude is playable
    card.play(player);
    expect(game.deferredActions).has.lengthOf(1);
    expect(player.megaCredits).to.eq(5);
  });
});
