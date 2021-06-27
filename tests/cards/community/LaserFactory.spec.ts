import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {LaserFactory} from '../../../src/cards/community/preludes/LaserFactory';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestPlayers';

describe('LaserFactory', function() {
  let card : LaserFactory; let player : Player;

  beforeEach(() => {
    card = new LaserFactory();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    card.play(player);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
    expect(player.getProduction(Resources.HEAT)).to.eq(2);
  });
});
