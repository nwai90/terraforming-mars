import {expect} from 'chai';
import {PowerGeneration} from '../../../src/cards/prelude/PowerGeneration';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';


describe('PowerGeneration', function() {
  it('Should play', function() {
    const card = new PowerGeneration();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.ENERGY)).to.eq(3);
  });
});
