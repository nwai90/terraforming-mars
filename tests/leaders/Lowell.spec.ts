import {expect} from "chai";
import {LightningHarvest} from "../../src/cards/base/LightningHarvest";
import {Research} from "../../src/cards/base/Research";
import {CardType} from "../../src/cards/CardType";
import {ICard} from "../../src/cards/ICard";
import {Lowell} from "../../src/cards/leaders/Lowell";
import {Tags} from "../../src/cards/Tags";
import {Game} from "../../src/Game";
import {SelectCard} from "../../src/inputs/SelectCard";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Lowell', function() {
  let card: Lowell; let player: Player; let game: Game;

  beforeEach(() => {
    card = new Lowell();
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({leadersExpansion: true});
    game = Game.newInstance('foobar', [player, TestPlayers.RED.newPlayer()], player, gameOptions);
    player.megaCredits = 5;
  });

  it('Has a wild tag', function() {
    player.playedCards.push(card);
    expect(player.getTagCount(Tags.SPACE, false, true)).to.eq(1);
    expect(player.getTagCount(Tags.SCIENCE, false, true)).to.eq(1);

    const lightningHarvest = new LightningHarvest();
    player.playedCards.push(new Research());
    expect(lightningHarvest.canPlay(player)).is.true;
  });

  it('Cannot act: Not enough M€', function() {
    player.megaCredits = 4;
    expect(card.canAct(player)).is.false;
  });

  it('Takes OPG action', function() {
    const selectCard = card.action(player) as SelectCard<ICard>;
    game.deferredActions.runNext(); // Pay

    selectCard.cb([selectCard.cards[0]]);
    expect(player.playedCards.filter((card) => card.cardType ===  CardType.LEADER).length).to.eq(1);
    expect(player.playedCards.includes(card)).is.false;
    expect(player.megaCredits).to.eq(0);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);
    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
