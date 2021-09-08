import {expect} from "chai";
import {HAL9000} from "../../src/cards/leaders/HAL9000";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestPlayers} from "../TestPlayers";

describe('HAL 9000', function() {
  let card: HAL9000; let player: Player; let player2: Player;

  beforeEach(() => {
    card = new HAL9000();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
  });

  it('Has 1 VP for every 8 TR', function() {
    player.playedCards.push(card);

    player.setTerraformRating(20);
    expect(player.getVictoryPoints().total).to.eq(22);

    player.setTerraformRating(40);
    expect(player.getVictoryPoints().total).to.eq(45);
  });
});
