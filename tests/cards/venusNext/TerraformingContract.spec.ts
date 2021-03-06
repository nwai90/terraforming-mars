import {expect} from 'chai';
import {TerraformingContract} from '../../../src/cards/venusNext/TerraformingContract';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('TerraformingContract', function() {
  it('Should play', function() {
    const card = new TerraformingContract();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    expect(card.canPlay(player)).is.not.true;
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(4);
  });
});
