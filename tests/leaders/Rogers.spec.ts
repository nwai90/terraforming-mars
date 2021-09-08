import {expect} from "chai";
import {Rogers} from "../../src/cards/leaders/Rogers";
import {GiantSolarShade} from "../../src/cards/venusNext/GiantSolarShade";
import {Game} from "../../src/Game";
import {Phase} from "../../src/Phase";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Rogers', function() {
  let card: Rogers; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Rogers();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
    player.playedCards.push(card);
  });

  it('Gains 1 TR when taking an action that raises Venus', function() {
    const giantSolarShade = new GiantSolarShade();
    giantSolarShade.play(player); // Raise Venus 3 steps
    expect(player.getTerraformRating()).to.eq(24);
  });

  it('Does not gain TR when other players raise Venus', function() {
    const giantSolarShade = new GiantSolarShade();
    giantSolarShade.play(player2);
    expect(player.getTerraformRating()).to.eq(20);
  });

  it('Does not gain TR from raising Venus during Solar phase', function() {
    game.phase = Phase.SOLAR;
    game.increaseVenusScaleLevel(player, 1);
    expect(player.getTerraformRating()).to.eq(20);
  });
});
