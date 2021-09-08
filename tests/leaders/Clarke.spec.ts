import {expect} from "chai";
import {Clarke} from "../../src/cards/leaders/Clarke";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Clarke', function() {
  let card: Clarke; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Clarke();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Can only act once per game', function() {
    expect(card.canAct()).is.true;

    card.action(player);
    TestingUtils.runAllActions(game);
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });

  it('Takes action', function() {
    expect(card.action(player)).is.undefined;
    expect(player.plants).to.eq(4);
    expect(player.heat).to.eq(4);
  });
});
