import {expect} from 'chai';
import {Teslaract} from '../../../src/cards/preludeTwo/Teslaract';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {TestPlayer} from '../../TestPlayer';
import {Resources} from '../../../src/Resources';

describe('Teslaract', function() {
  let card : Teslaract; let player : TestPlayer; let player2 : TestPlayer;

  beforeEach(() => {
    card = new Teslaract();
    
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
  });

  it('Play', function() {
    card.play(player);
    expect(player.getTerraformRating()).eq(21);
  });

  it('canAct', function() {
    expect(card.canAct(player)).is.false;
    player.setProductionForTest({energy: 1});
    expect(card.canAct(player)).is.true;
  });

  it('Action', function() {
    player.setProductionForTest({energy: 1});

    card.action(player);
    expect(player.getProduction(Resources.ENERGY)).eq(0);
    expect(player.getProduction(Resources.PLANTS)).eq(1);
  });
});
