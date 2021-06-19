import {expect} from "chai";
import {MicroMills} from "../../../src/cards/base/MicroMills";
import {Research} from "../../../src/cards/base/Research";
import {Minimalist} from "../../../src/milestones/amazonisPlanitia/Minimalist";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Minimalist', () => {
  let milestone : Minimalist; let player : Player;

  beforeEach(() => {
    milestone = new Minimalist();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Can claim with 2 cards in hand', () => {
    player.cardsInHand.push(new Research(), new MicroMills());
    expect(milestone.canClaim(player)).is.true;
  });
});
