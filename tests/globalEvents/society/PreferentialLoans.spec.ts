import {expect} from 'chai';
import {PreferentialLoans} from '../../../src/turmoil/globalEvents/society/PreferentialLoans';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {Resources} from '../../../src/Resources';

describe('PreferentialLoans', function() {
  it('resolve play', function() {
    const card = new PreferentialLoans();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const turmoil = Turmoil.newInstance(game);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(10);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(-2);
  });
});