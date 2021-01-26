import {expect} from 'chai';
import {PowerPlant} from '../../../src/cards/base/PowerPlant';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestingUtils';

describe('PowerPlant', function() {
  it('Should play', function() {
    const card = new PowerPlant();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    expect(card.play(player)).is.undefined;
    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
  });
});
