import {expect} from 'chai';
import {VenusTradeHub} from '../../../src/cards/preludeTwo/VenusTradeHub';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {Callisto} from '../../../src/colonies/Callisto';
import {Ceres} from '../../../src/colonies/Ceres';
import {TestingUtils} from '../../TestingUtils';

describe('VenusTradeHub', function() {
  let card : VenusTradeHub; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new VenusTradeHub();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true});
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
    game.colonies = [new Callisto(), new Ceres()];
  });

  it('Play', function() {
    expect(card.getVictoryPoints()).eq(1);

    player.playedCards.push(card);
    game.colonies[0].trade(player);
    expect(player.megaCredits).eq(3);

    game.colonies[1].trade(player2);
    expect(player.megaCredits).eq(3);
    expect(player2.megaCredits).eq(0);
  });
});
