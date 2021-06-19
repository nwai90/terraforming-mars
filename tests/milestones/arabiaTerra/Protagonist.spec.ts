import {expect} from "chai";
import {Game} from "../../../src/Game";
import {Protagonist} from "../../../src/milestones/arabiaTerra/Protagonist";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Protagonist', () => {
  let milestone : Protagonist; let player : Player; let player2: Player; let player3: Player;

  beforeEach(() => {
    milestone = new Protagonist();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    player3 = TestPlayers.GREEN.newPlayer();
    Game.newInstance('test', [player, player2, player3], player);
  });

  it('Can claim with 5 TR more than other players', () => {
    player.setTerraformRating(player.getTerraformRating() + 5);
    expect(milestone.canClaim(player)).is.true;
  });
});
