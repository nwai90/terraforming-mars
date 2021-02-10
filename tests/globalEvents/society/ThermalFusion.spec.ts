import {expect} from 'chai';
import {ThermalFusion} from '../../../src/turmoil/globalEvents/society/ThermalFusion';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {Resources} from '../../../src/Resources';

describe('ThermalFusion', function() {
  it('resolve play', function() {
    const card = new ThermalFusion();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    player.energy = 3;
    player.addProduction(Resources.ENERGY, 3);

    card.resolve(game, turmoil);
    expect(player.heat).to.eq(9);
    expect(player.energy).to.eq(0);
  });
});