import {expect} from "chai";
import {Game} from "../../../src/Game";
import {Tropicalist} from "../../../src/milestones/amazonisPlanitia/Tropicalist";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Tropicalist', () => {
  let milestone : Tropicalist; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    milestone = new Tropicalist();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('test', [player, player2], player);
  });

  it('Can claim with 3 tiles on equator', () => {
    game.addGreenery(player, '21');
    game.addCityTile(player, '30');
    game.addGreenery(player, '42');
    expect(milestone.canClaim(player)).is.true;
  });
});
