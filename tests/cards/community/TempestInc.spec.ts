import {expect} from 'chai';
import {TempestInc} from '../../../src/cards/community/corporations/TempestInc';
import {Game} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('TempestInc', function() {
  let card : TempestInc; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    card = new TempestInc();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);

    card.play(player);
    card.initialAction(player);
    player.corporationCard = card;
  });

  it('Can act', function() {
    expect(card.canAct()).to.be.true;
  });

  it('Starts with correct resources', function() {
    expect(player.getTerraformRating()).to.eq(22);
    expect(card.resourceCount).to.eq(2);
    expect(game.getOxygenLevel()).to.eq(2);
  });

  it('Can raise global parameter if have floaters', function() {
    const action = card.action(player) as OrOptions;
    const globalParameterChoices = action.options[1].cb() as OrOptions;;

    // Raise temperature
    globalParameterChoices.options[0].cb();
    expect(game.getTemperature()).to.eq(-28);
    expect(player.getTerraformRating()).to.eq(23);
    expect(card.resourceCount).to.eq(1);
  });

  it('Adds floater immediately if there are no floaters', function() {
    card.resourceCount = 0;
    expect(card.action(player)).is.undefined;
    expect(card.resourceCount).to.eq(1);
  });
});
