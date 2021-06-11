import {expect} from 'chai';
import {Philares} from '../../../src/cards/promo/Philares';
import {MAX_TEMPERATURE, MAX_OXYGEN_LEVEL} from '../../../src/constants';
import {Game} from '../../../src/Game';
import {AndOptions} from '../../../src/inputs/AndOptions';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {Player} from '../../../src/Player';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';

describe('Philares', function() {
  let card : Philares; let philaresPlayer : Player; let player2 : Player; let game: Game;

  beforeEach(function() {
    card = new Philares();
    philaresPlayer = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [philaresPlayer, player2], philaresPlayer);

    card.play();
    philaresPlayer.corporationCard = card;
  });

  it('Should take initial action', function() {
    const action = card.initialAction(philaresPlayer);
    expect(action).is.not.undefined;

    action.cb(action.availableSpaces[0]);
    expect(philaresPlayer.getTerraformRating()).to.eq(21);
  });

  it('Gains resource when other player places tiles adjacent to it', function() {
    game.addGreenery(philaresPlayer, '35');
    game.addGreenery(player2, '36');
    expect(game.deferredActions).has.lengthOf(1);

    const selectResource = game.deferredActions.pop()!.execute() as AndOptions;
    expect(selectResource instanceof AndOptions).to.be.true;

    // Gain titanium
    selectResource.options[2].cb(1);
    selectResource.cb();
    expect(philaresPlayer.titanium).to.eq(1);
  });

  it('Can place final greenery if gains enough plants from earlier players placing adjacent greeneries', function() {
    // Setup end game with player2 as the first player, and Philares player with a tile on space 36
    game = Game.newInstance('foobar', [philaresPlayer, player2], player2);
    game.addGreenery(philaresPlayer, '36');
    philaresPlayer.pickedCorporationCard = card;

    // Max out all global parameters
    (game as any).temperature = MAX_TEMPERATURE;
    (game as any).oxygenLevel = MAX_OXYGEN_LEVEL;
    TestingUtils.maxOutOceans(philaresPlayer);

    // Setup plants for endgame
    philaresPlayer.plants = 7;
    player2.plants = 8;

    // First player final greenery placement, done adjacent to one of Philares' tiles
    game.gotoFinalGreeneryPlacement();
    const firstPlayerGreeneryPlacement = player2.getWaitingFor() as OrOptions;

    // Don't place a greenery using the callback; add it directly via game.addGreenery() instead
    // Workaround for test since the greenery placement option auto resolves deferred action
    firstPlayerGreeneryPlacement.options[1].cb();
    game.addGreenery(player2, '35');
    expect(game.deferredActions).has.lengthOf(1);

    // Philares player gains plant and can subsequently place a greenery
    philaresPlayer.takeActionForFinalGreenery();
    const philaresPlayerResourceSelection = philaresPlayer.getWaitingFor() as AndOptions;
    philaresPlayerResourceSelection.options[3].cb(1);
    philaresPlayerResourceSelection.cb();
    expect(philaresPlayer.plants).to.eq(8);
  });
});
