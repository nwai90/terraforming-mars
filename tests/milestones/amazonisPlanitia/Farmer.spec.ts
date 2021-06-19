import {expect} from "chai";
import {Farmer} from "../../../src/milestones/amazonisPlanitia/Farmer";
import {Player} from "../../../src/Player";
import {Resources} from "../../../src/Resources";
import {TestPlayers} from "../../TestPlayers";

describe('Farmer', () => {
  let milestone : Farmer; let player : Player;

  beforeEach(() => {
    milestone = new Farmer();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Can claim with 4 plant production', () => {
    player.addProduction(Resources.PLANTS, 4);
    expect(milestone.canClaim(player)).is.true;
  });
});
