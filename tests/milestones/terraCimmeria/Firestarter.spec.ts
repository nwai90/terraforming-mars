import {expect} from "chai";
import {Firestarter} from "../../../src/milestones/terraCimmeria/Firestarter";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Collector', () => {
  let milestone : Firestarter; let player : Player;

  beforeEach(() => {
    milestone = new Firestarter();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Can claim with 20 heat', () => {
    player.heat = 20;
    expect(milestone.canClaim(player)).is.true;
  });
});
