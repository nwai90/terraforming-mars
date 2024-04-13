import {expect} from 'chai';
import {CityPark} from '../../../src/cards/promo/CityPark';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('CityPark', function() {
  let card : CityPark; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new CityPark();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('canPlay', function() {
    expect(card.canPlay(player)).is.false;

    const lands = game.board.getAvailableSpacesOnLand(player);
    game.addCityTile(player, lands[0].id);
    game.addCityTile(player, lands[1].id);
    game.addCityTile(player2, lands[2].id);
    expect(card.canPlay(player)).is.false;

    game.addCityTile(player, lands[3].id);
    expect(card.canPlay(player)).is.true;
  });

  it('play', function() {
    card.play(player);
    expect(player.plants).eq(2);
  });
});
