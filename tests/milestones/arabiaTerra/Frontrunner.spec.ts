import {expect} from "chai";
import {BribedCommittee} from "../../../src/cards/base/BribedCommittee";
import {GeneRepair} from "../../../src/cards/base/GeneRepair";
import {InterstellarColonyShip} from "../../../src/cards/base/InterstellarColonyShip";
import {SpaceElevator} from "../../../src/cards/base/SpaceElevator";
import {Pristar} from "../../../src/cards/turmoil/Pristar";
import {Frontrunner} from "../../../src/milestones/arabiaTerra/Frontrunner";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Frontrunner', () => {
  let milestone : Frontrunner; let player : Player;

  beforeEach(() => {
    milestone = new Frontrunner();
    player = TestPlayers.BLUE.newPlayer();

    player.playedCards.push(new InterstellarColonyShip());
    player.playedCards.push(new GeneRepair());
  });

  it('Can claim with 6 VP on played cards', () => {
    expect(milestone.canClaim(player)).is.true;
  });

  it('Can claim with net 6 VP on played cards', () => {
    player.playedCards.push(new BribedCommittee());
    expect(milestone.canClaim(player)).is.not.true;

    player.playedCards.push(new SpaceElevator());
    expect(milestone.canClaim(player)).is.true;
  });

  it('Includes VP on corporation card', () => {
    player.playedCards = [];
    player.playedCards.push(new InterstellarColonyShip());

    const pristar = new Pristar();
    pristar.resourceCount = 2;
    player.playedCards.push(pristar);
    expect(milestone.canClaim(player)).is.true;
  });
});
