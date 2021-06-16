import {expect} from 'chai';
import {Midas} from '../../../src/cards/community/corporations/Midas';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('Midas', function() {
  let card : Midas; let player : Player;

  beforeEach(() => {
    card = new Midas();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Starts with correct TR', function() {
    const initialTR = player.getTerraformRating();

    card.play(player);
    player.corporationCard = card;
    expect(player.getTerraformRating()).to.eq(initialTR - 7);
  });
});
