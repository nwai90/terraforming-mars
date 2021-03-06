import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Game, GameOptions} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';
import {HydrogenBombardment} from '../../../src/cards/community/preludes/HydrogenBombardment';
import {Resources} from '../../../src/Resources';

describe('HydrogenBombardment', function() {
  let card : HydrogenBombardment; let player : Player; let game : Game;

  beforeEach(() => {
    card = new HydrogenBombardment();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions() as GameOptions;
    game = Game.newInstance('foobar', [player, redPlayer], player, gameOptions);
  });

  it('Should play', function() {
    card.play(player);
    expect(game.getVenusScaleLevel()).to.eq(2);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
  });
});
