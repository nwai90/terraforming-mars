import {expect} from "chai";
import {Herbalist} from "../../../src/milestones/arabiaTerra/Herbalist";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Herbalist', () => {
  let milestone : Herbalist; let player : Player;

  beforeEach(() => {
    milestone = new Herbalist();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Can claim with 12 plants', () => {
    player.plants = 12;
    expect(milestone.canClaim(player)).is.true;
  });
});
