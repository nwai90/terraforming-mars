import {expect} from 'chai';
import {LunaGovernor} from '../../../src/cards/colonies/LunaGovernor';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestingUtils';

describe('LunaGovernor', function() {
  it('Should play', function() {
    const card = new LunaGovernor();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    expect(card.canPlay(player)).is.not.true;
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);
  });
});
