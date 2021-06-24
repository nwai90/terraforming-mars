import {expect} from "chai";
import {Dillon} from "../../src/cards/leaders/Dillon";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestPlayers} from "../TestPlayers";

describe('Dillon', function() {
  let card: Dillon; let player: Player; let player2: Player

  beforeEach(() => {
    card = new Dillon();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
  });

  it('Has 4 VP', function() {
    player.playedCards.push(card);
    expect(player.getVictoryPoints().total).to.eq(24);
  });
});
