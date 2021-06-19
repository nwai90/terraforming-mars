import {expect} from "chai";
import {Game} from "../../../src/Game";
import {Gambler} from "../../../src/milestones/terraCimmeria/Gambler";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Gambler', () => {
  let milestone : Gambler; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    milestone = new Gambler();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('test', [player, player2], player);
  });

  it('Can claim with 2 funded awards', () => {
    game.fundAward(player, game.awards[0]);
    game.fundAward(player, game.awards[1]);
    expect(milestone.canClaim(player)).is.true;
  });
});
