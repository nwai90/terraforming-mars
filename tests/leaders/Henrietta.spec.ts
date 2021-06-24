import {expect} from "chai";
import {Henrietta} from "../../src/cards/leaders/Henrietta";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestPlayers} from "../TestPlayers";

describe('Henrietta', function() {
  let card: Henrietta; let player: Player; let player2: Player

  beforeEach(() => {
    card = new Henrietta();
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
