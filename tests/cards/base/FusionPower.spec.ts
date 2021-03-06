import {expect} from 'chai';
import {FusionPower} from '../../../src/cards/base/FusionPower';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('FusionPower', function() {
  let card : FusionPower; let player : Player;

  beforeEach(() => {
    card = new FusionPower();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
  });

  it('Can\'t play', function() {
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    player.playedCards.push(card, card);
    expect(card.canPlay(player)).is.true;

    card.play(player);
    expect(player.getProduction(Resources.ENERGY)).to.eq(3);
  });
});
