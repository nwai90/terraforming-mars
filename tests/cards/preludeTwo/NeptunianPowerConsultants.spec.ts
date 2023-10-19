import {expect} from 'chai';
import {NeptunianPowerConsultants} from '../../../src/cards/preludeTwo/NeptunianPowerConsultants';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {Resources} from '../../../src/Resources';

describe('NeptunianPowerConsultants', function() {
  let card : NeptunianPowerConsultants; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new NeptunianPowerConsultants();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
    player.corporationCards.push(card);
  });

  it('Effect: Does not proc if corp owner cannot afford', function() {
    player.megaCredits = 2;
    player.steel = 1;
    const oceanSpace = game.board.getAvailableSpacesForOcean(player)[0];
    game.addOceanTile(player, oceanSpace.id);

    game.deferredActions.runAll(() => {});
    expect(player.megaCredits).eq(2);
    expect(player.steel).greaterThanOrEqual(1);
    expect(player.getProduction(Resources.ENERGY)).eq(0);
    expect(card.resourceCount).eq(0);
  });

  it('Effect: Can proc', function() {
    player.megaCredits = 5;

    const oceanSpace = game.board.getAvailableSpacesForOcean(player)[0];
    game.addOceanTile(player, oceanSpace.id);

    game.deferredActions.runNext();
    const orOptions = game.deferredActions.pop()!.execute() as OrOptions;

    // Do nothing
    orOptions.options[1].cb();
    expect(player.getProduction(Resources.ENERGY)).eq(0);
    expect(card.resourceCount).eq(0);

    // Pay 5 M€
    orOptions.options[0].cb();
    game.deferredActions.runAll(() => {});
    expect(player.getProduction(Resources.ENERGY)).eq(1);
    expect(card.resourceCount).eq(1);
  });

  it('Gives VP', function() {
    expect(card.getVictoryPoints()).eq(0);
    card.resourceCount = 3;
    expect(card.getVictoryPoints()).eq(3);
  });
});
