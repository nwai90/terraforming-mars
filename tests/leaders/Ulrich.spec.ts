import {expect} from "chai";
import {Ulrich} from "../../src/cards/leaders/Ulrich";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Ulrich', function() {
  let card: Ulrich; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Ulrich();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Can act', function() {
    expect(card.canAct()).is.true;
  });

  it('Takes action: Some oceans placed', function() {
    TestingUtils.maxOutOceans(player2, 8);
    card.action(player);
    expect(player.megaCredits).to.eq(24);
  });

  it('Takes action: All oceans placed - gain only 9 M€', function() {
    TestingUtils.maxOutOceans(player2);
    card.action(player);
    expect(player.megaCredits).to.eq(9);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);
    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
