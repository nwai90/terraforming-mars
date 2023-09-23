import {expect} from "chai";
import {Game} from "../../../src/Game";
import {Landshaper} from "../../../src/milestones/preludeTwo/Landshaper";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";
import {TileType} from "../../../src/TileType";

describe('Landshaper', () => {
  let milestone : Landshaper; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    milestone = new Landshaper();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('test', [player, player2], player);
  });

  it('Can claim', () => {
    const emptySpaces = game.board.getAvailableSpacesOnLand(player);

    game.addCityTile(player, emptySpaces[0].id);
    expect(milestone.canClaim(player)).is.false;

    game.addGreenery(player, emptySpaces[1].id);
    expect(milestone.canClaim(player)).is.false;

    game.simpleAddTile(player, emptySpaces[2], {tileType: TileType.COMMERCIAL_DISTRICT});
    expect(milestone.canClaim(player)).is.true;
  });
});
