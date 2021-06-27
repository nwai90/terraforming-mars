import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {SolarBatteries} from '../../../src/cards/community/preludes/SolarBatteries';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestPlayers';

describe('SolarBatteries', function() {
  let card : SolarBatteries; let player : Player; let game: Game;

  beforeEach(() => {
    card = new SolarBatteries();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    const initialTR = player.getTerraformRating();
    card.play(player);

    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    expect(game.getTemperature()).to.eq(-28);
    expect(player.getTerraformRating()).to.eq(initialTR + 1);
    expect(player.megaCredits).to.eq(7);
  });
});
