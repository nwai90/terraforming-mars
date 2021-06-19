import {expect} from "chai";
import {LagrangeObservatory} from "../../../src/cards/base/LagrangeObservatory";
import {QuantumExtractor} from "../../../src/cards/base/QuantumExtractor";
import {Research} from "../../../src/cards/base/Research";
import {SearchForLife} from "../../../src/cards/base/SearchForLife";
import {TransNeptuneProbe} from "../../../src/cards/base/TransNeptuneProbe";
import {ResearchCoordination} from "../../../src/cards/prelude/ResearchCoordination";
import {Game} from "../../../src/Game";
import {Researcher} from "../../../src/milestones/arabiaTerra/Researcher";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Researcher', () => {
  let milestone : Researcher; let player : Player;

  beforeEach(() => {
    milestone = new Researcher();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('test', [player], player);

    player.playedCards.push(new LagrangeObservatory(), new TransNeptuneProbe(), new SearchForLife(), new Research());
  });

  it('Can claim with 6 Science tags', () => {
    player.playedCards.push(new QuantumExtractor());
    expect(milestone.canClaim(player)).is.true;
  });

  it('Wild tag counts', () => {
    player.playedCards.push(new ResearchCoordination());
    expect(milestone.canClaim(player)).is.true;
  });
});
