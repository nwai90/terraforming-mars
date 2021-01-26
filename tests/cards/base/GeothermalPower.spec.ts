import {expect} from 'chai';
import {GeothermalPower} from '../../../src/cards/base/GeothermalPower';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestingUtils';

describe('GeothermalPower', function() {
  it('Should play', function() {
    const card = new GeothermalPower();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.ENERGY)).to.eq(2);
  });
});
