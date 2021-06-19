import {expect} from "chai";
import {Flooding} from "../../../src/cards/base/Flooding";
import {Mine} from "../../../src/cards/base/Mine";
import {SpaceMirrors} from "../../../src/cards/base/SpaceMirrors";
import {Collector} from "../../../src/milestones/terraCimmeria/Collector";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Collector', () => {
  let milestone : Collector; let player : Player;

  beforeEach(() => {
    milestone = new Collector();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Can claim with 3 sets of active, automated and event cards', () => {
    for (let i = 0; i < 3; i++) {
      player.playedCards.push(new Mine(), new SpaceMirrors(), new Flooding());
    }
    expect(milestone.canClaim(player)).is.true;
  });
});
