import {expect} from 'chai';
import {FuelFactory} from '../../../src/cards/base/FuelFactory';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('FuelFactory', function() {
  let card : FuelFactory; let player : Player;

  beforeEach(() => {
    card = new FuelFactory();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
  });

  it('Can\'t play', function() {
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    player.addProduction(Resources.ENERGY, 1);
    expect(card.canPlay(player)).is.true;
    card.play(player);

    expect(player.getProduction(Resources.ENERGY)).to.eq(0);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
  });
});
