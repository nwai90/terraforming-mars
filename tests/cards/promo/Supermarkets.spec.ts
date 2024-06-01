import {expect} from 'chai';
import {Supermarkets} from '../../../src/cards/promo/Supermarkets';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Resources} from '../../../src/Resources';

describe('Supermarkets', function() {
  let card : Supermarkets; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new Supermarkets();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('canPlay', function() {
    expect(card.canPlay(player)).is.false;

    const lands = game.board.getAvailableSpacesOnLand(player);
    game.addCityTile(player, lands[0].id);
    expect(card.canPlay(player)).is.false;

    game.addCityTile(player2, lands[1].id);
    expect(card.canPlay(player)).is.true;
  });

  it('play', function() {
    card.play(player);
    expect(player.getProduction(Resources.MEGACREDITS)).eq(2);
  });
});
