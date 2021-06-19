import {expect} from "chai";
import {LagrangeObservatory} from "../../../src/cards/base/LagrangeObservatory";
import {Satellites} from "../../../src/cards/base/Satellites";
import {TollStation} from "../../../src/cards/base/TollStation";
import {TransNeptuneProbe} from "../../../src/cards/base/TransNeptuneProbe";
import {VestaShipyard} from "../../../src/cards/base/VestaShipyard";
import {ResearchCoordination} from "../../../src/cards/prelude/ResearchCoordination";
import {SpaceHotels} from "../../../src/cards/prelude/SpaceHotels";
import {Game} from "../../../src/Game";
import {Spacefarer} from "../../../src/milestones/terraCimmeria/Spacefarer";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Spacefarer', () => {
  let milestone : Spacefarer; let player : Player;

  beforeEach(() => {
    milestone = new Spacefarer();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('test', [player], player);

    player.playedCards.push(new LagrangeObservatory(), new TransNeptuneProbe(), );
    player.playedCards.push(new Satellites(), new TollStation(), new VestaShipyard());
  });

  it('Can claim with 6 Space tags', () => {
    player.playedCards.push(new SpaceHotels());
    expect(milestone.canClaim(player)).is.true;
  });

  it('Wild tag counts', () => {
    player.playedCards.push(new ResearchCoordination());
    expect(milestone.canClaim(player)).is.true;
  });
});
