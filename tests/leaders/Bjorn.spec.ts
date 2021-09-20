import {expect} from "chai";
import {Bjorn} from "../../src/cards/leaders/Bjorn";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Bjorn', function() {
  let card: Bjorn; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Bjorn();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Takes OPG action', function() {
    game.generation = 9;
    player2.megaCredits = 4;

    card.action(player);
    expect(player.megaCredits).to.eq(4);
    expect(player2.megaCredits).to.eq(0);
    expect(card.isDisabled).is.true;
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
