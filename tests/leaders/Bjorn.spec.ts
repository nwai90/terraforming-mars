import {expect} from "chai";
import {Bjorn} from "../../src/cards/leaders/Bjorn";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestPlayers} from "../TestPlayers";

describe('Bjorn', function() {
  let card: Bjorn; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Bjorn();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Has +2 score on awards', function() {
    player.playedCards.push(card);

    game.awards.forEach((award) => {
      expect(award.getScore(player)).to.eq(2);
    });
  });
});
