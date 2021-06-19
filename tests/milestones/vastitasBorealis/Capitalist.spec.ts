import {expect} from "chai";
import {Capitalist} from "../../../src/milestones/vastitasBorealis/Capitalist";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Capitalist', () => {
  let milestone : Capitalist; let player : Player;

  beforeEach(() => {
    milestone = new Capitalist();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Can claim with 72 M€', () => {
    player.megaCredits = 72;
    expect(milestone.canClaim(player)).is.true;
  });
});
