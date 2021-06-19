import {expect} from "chai";
import {PowerPlant} from "../../../src/cards/base/PowerPlant";
import {SolarPower} from "../../../src/cards/base/SolarPower";
import {SpaceMirrors} from "../../../src/cards/base/SpaceMirrors";
import {ResearchCoordination} from "../../../src/cards/prelude/ResearchCoordination";
import {FieldCappedCity} from "../../../src/cards/promo/FieldCappedCity";
import {Game} from "../../../src/Game";
import {Electrician} from "../../../src/milestones/vastitasBorealis/Electrician";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Electrician', () => {
  let milestone : Electrician; let player : Player;

  beforeEach(() => {
    milestone = new Electrician();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('test', [player], player);

    player.playedCards.push(new SolarPower(), new PowerPlant(), new SpaceMirrors());
  });

  it('Can claim with 4 Power tags', () => {
    player.playedCards.push(new FieldCappedCity());
    expect(milestone.canClaim(player)).is.true;
  });

  it('Wild tag counts', () => {
    player.playedCards.push(new ResearchCoordination());
    expect(milestone.canClaim(player)).is.true;
  });
});
