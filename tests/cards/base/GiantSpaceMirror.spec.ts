import {expect} from 'chai';
import {GiantSpaceMirror} from '../../../src/cards/base/GiantSpaceMirror';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('GiantSpaceMirror', function() {
  it('Should play', function() {
    const card = new GiantSpaceMirror();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.ENERGY)).to.eq(3);
  });
});
