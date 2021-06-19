import {expect} from "chai";
import {Cartel} from "../../../src/cards/base/Cartel";
import {HeavyTaxation} from "../../../src/cards/colonies/HeavyTaxation";
import {LunaGovernor} from "../../../src/cards/colonies/LunaGovernor";
import {ResearchCoordination} from "../../../src/cards/prelude/ResearchCoordination";
import {Game} from "../../../src/Game";
import {Terran} from "../../../src/milestones/amazonisPlanitia/Terran";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Terran', () => {
  let milestone : Terran; let player : Player;

  beforeEach(() => {
    milestone = new Terran();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('test', [player], player);

    player.playedCards.push(new Cartel(), new LunaGovernor(), new LunaGovernor());
  });

  it('Can claim with 6 Earth tags', () => {
    player.playedCards.push(new HeavyTaxation());
    expect(milestone.canClaim(player)).is.true;
  });

  it('Wild tag counts', () => {
    player.playedCards.push(new ResearchCoordination());
    expect(milestone.canClaim(player)).is.true;
  });
});
