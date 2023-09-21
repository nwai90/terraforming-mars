import {expect} from 'chai';
import {Research} from '../../../src/cards/base/Research';
import {VenusianAnimals} from '../../../src/cards/venusNext/VenusianAnimals';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('VenusianAnimals', function() {
  let card : VenusianAnimals; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new VenusianAnimals();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Can\'t play', function() {
    game.setVenusScaleLevel(16);
    expect(card.canPlay(player)).is.false;
  });

  it('Should play', function() {
    game.setVenusScaleLevel(18);
    expect(card.canPlay(player)).is.true;
    player.playedCards.push(card);
    card.play();

    card.onCardPlayed(player, card);
    expect(player.getResourcesOnCard(card)).eq(1);

    card.onCardPlayed(player, new Research());
    expect(player.getResourcesOnCard(card)).eq(3);

    card.onCardPlayed(player2, new Research());
    expect(player.getResourcesOnCard(card)).eq(3);

    expect(card.getVictoryPoints()).eq(3);
  });
});
