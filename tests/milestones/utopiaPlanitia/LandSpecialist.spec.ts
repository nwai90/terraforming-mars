import {expect} from "chai";
import {Game} from "../../../src/Game";
import {LandSpecialist} from "../../../src/milestones/utopiaPlanitia/LandSpecialist";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";
import {TileType} from "../../../src/TileType";

describe('LandSpecialist', () => {
  let milestone : LandSpecialist; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    milestone = new LandSpecialist();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('test', [player, player2], player);
  });

  it('Can claim', () => {
    const emptySpaces = game.board.getAvailableSpacesOnLand(player);

    game.simpleAddTile(player, emptySpaces[0], {tileType: TileType.COMMERCIAL_DISTRICT});
    expect(milestone.canClaim(player)).is.false;

    game.simpleAddTile(player, emptySpaces[1], {tileType: TileType.MINING_AREA});
    expect(milestone.canClaim(player)).is.false;

    game.simpleAddTile(player, emptySpaces[2], {tileType: TileType.LAVA_FLOWS});
    expect(milestone.canClaim(player)).is.true;
  });
});
