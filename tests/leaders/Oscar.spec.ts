import {expect} from "chai";
import {Oscar} from "../../src/cards/leaders/Oscar";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Oscar', function() {
  let card: Oscar; let player: Player; let player2: Player;

  beforeEach(() => {
    card = new Oscar();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions();
    Game.newInstance('foobar', [player, player2], player, gameOptions);
  });

  it('Has +1 influence', function() {
    card.play(player);
    expect(player.game.turmoil?.getPlayerInfluence(player)).to.eq(1);
  });
});
