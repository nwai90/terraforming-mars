import {expect} from 'chai';
import {SulphurExports} from '../../../src/cards/venusNext/SulphurExports';
import {MAX_VENUS_SCALE} from '../../../src/constants';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {Reds} from '../../../src/turmoil/parties/Reds';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';

describe('SulphurExports', function() {
  let card : SulphurExports; let player : Player; let game : Game;

  beforeEach(() => {
    card = new SulphurExports();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('foobar', [player], player, TestingUtils.setCustomGameOptions());
  });

  it('Should play', function() {
    card.play(player);
    expect(player.getProduction(Resources.MEGACREDITS)).eq(1);
    expect(game.getVenusScaleLevel()).eq(2);
  });

  it('Can play if Venus is maxed, even if Reds are ruling', function() {
    const turmoil = Turmoil.getTurmoil(game);
    turmoil.rulingParty = new Reds();
    (game as any).venusScaleLevel = MAX_VENUS_SCALE;

    player.megaCredits = 21;
    expect(card.canPlay(player)).is.true;
  });
});
