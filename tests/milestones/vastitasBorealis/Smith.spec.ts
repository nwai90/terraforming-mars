import {expect} from "chai";
import {Smith} from "../../../src/milestones/vastitasBorealis/Smith";
import {Player} from "../../../src/Player";
import {Resources} from "../../../src/Resources";
import {TestPlayers} from "../../TestPlayers";

describe('Smith', () => {
  let milestone : Smith; let player : Player;

  beforeEach(() => {
    milestone = new Smith();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Can claim with 6 steel and titanium production', () => {
    player.addProduction(Resources.STEEL, 5);
    player.addProduction(Resources.TITANIUM, 2);
    expect(milestone.canClaim(player)).is.true;
  });
});
