import {expect} from "chai";
import {LightningHarvest} from "../../src/cards/base/LightningHarvest";
import {Research} from "../../src/cards/base/Research";
import {Lowell} from "../../src/cards/leaders/Lowell";
import {Tags} from "../../src/cards/Tags";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestPlayers} from "../TestPlayers";

describe('Lowell', function() {
  let card: Lowell; let player: Player;

  beforeEach(() => {
    card = new Lowell();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
  });

  it('Has a wild tag', function() {
    player.playedCards.push(card);
    expect(player.getTagCount(Tags.SPACE, false, true)).to.eq(1);
    expect(player.getTagCount(Tags.SCIENCE, false, true)).to.eq(1);

    const lightningHarvest = new LightningHarvest();
    player.playedCards.push(new Research());
    expect(lightningHarvest.canPlay(player)).is.true;
  });
});
