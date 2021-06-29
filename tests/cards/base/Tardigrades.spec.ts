import {expect} from 'chai';
import {Tardigrades} from '../../../src/cards/base/Tardigrades';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('Tardigrades', function() {
  let card : Tardigrades; let player : Player;

  beforeEach(() => {
    card = new Tardigrades();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('test', [player], player);
  });

  it('Should play', function() {
    player.playedCards.push(card);
    card.play();
    player.addResourceTo(card, 7);
    expect(card.getVictoryPoints()).to.eq(1);
  });

  it('Should act', function() {
    player.playedCards.push(card);
    card.action(player);
    expect(card.resourceCount).to.eq(1);
  });
});
