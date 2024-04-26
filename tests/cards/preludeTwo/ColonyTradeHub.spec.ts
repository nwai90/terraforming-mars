import {expect} from 'chai';
import {ColonyTradeHub} from '../../../src/cards/preludeTwo/ColonyTradeHub';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game, GameOptions} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestingUtils} from '../../TestingUtils';

describe('ColonyTradeHub', function() {
  let card : ColonyTradeHub; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    card = new ColonyTradeHub();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    
    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true}) as GameOptions;
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
  });

  it('Play', function() {
    card.play(player);
    expect(player.getProduction(Resources.ENERGY)).eq(1);
    expect(player.titanium).eq(2);
  });

  it('Effect', function() {
    player.playedCards.push(card);
    player.megaCredits = 0;
    game.colonies[0].addColony(player);
    expect(player.megaCredits).eq(2);
  });
});
