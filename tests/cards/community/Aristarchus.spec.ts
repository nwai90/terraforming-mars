import {expect} from 'chai';
import {Aristarchus} from '../../../src/cards/community/corporations/Aristarchus';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestingUtils';

describe('Aristarchus', function() {
  let card : Aristarchus; let player : Player;

  beforeEach(function() {
    card = new Aristarchus();
    player = TestPlayers.BLUE.newPlayer();

    card.play();
    player.corporationCard = card;
  });

  it('Cannot act', function() {
    player.megaCredits = 1;
    expect(card.canAct(player)).to.be.false;
  });

  it('Can act', function() {
    player.megaCredits = 0;
    expect(card.canAct(player)).to.be.true;

    card.action(player);
    expect(player.megaCredits).to.eq(10);
  });
});
