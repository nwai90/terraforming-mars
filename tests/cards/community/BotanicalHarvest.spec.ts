import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {BotanicalHarvest} from '../../../src/cards/community/preludes/BotanicalHarvest';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestingUtils';

describe('BotanicalHarvest', function() {
  let card : BotanicalHarvest; let player : Player; let game: Game;

  beforeEach(function() {
    card = new BotanicalHarvest();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    const initialTR = player.getTerraformRating();
    card.play(player, game);

    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    expect(player.plants).to.eq(5);
    expect(game.getOxygenLevel()).to.eq(1);
    expect(player.getTerraformRating()).to.eq(initialTR + 1);
  });
});
