import {expect} from "chai";
import {ResearchCoordination} from "../../../src/cards/prelude/ResearchCoordination";
import {Dirigibles} from "../../../src/cards/venusNext/Dirigibles";
import {LocalShading} from "../../../src/cards/venusNext/LocalShading";
import {VenusGovernor} from "../../../src/cards/venusNext/VenusGovernor";
import {Game} from "../../../src/Game";
import {Morningstar} from "../../../src/milestones/arabiaTerra/Morningstar";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Morningstar', () => {
  let milestone : Morningstar; let player : Player;

  beforeEach(() => {
    milestone = new Morningstar();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('test', [player], player);

    player.playedCards.push(new LocalShading(), new VenusGovernor());
  });

  it('Can claim with 4 Venus tags', () => {
    player.playedCards.push(new Dirigibles());
    expect(milestone.canClaim(player)).is.true;
  });

  it('Wild tag counts', () => {
    player.playedCards.push(new ResearchCoordination());
    expect(milestone.canClaim(player)).is.true;
  });
});
