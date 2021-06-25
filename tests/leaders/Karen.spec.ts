import {expect} from "chai";
import {CardType} from "../../src/cards/CardType";
import {IProjectCard} from "../../src/cards/IProjectCard";
import {Karen} from "../../src/cards/leaders/Karen";
import {Game} from "../../src/Game";
import {SelectCard} from "../../src/inputs/SelectCard";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Karen', function() {
  let card: Karen; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Karen();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions({preludeExtension: true});
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);

    player.megaCredits = 20;
  });

  it('Can act', function() {
    expect(card.canAct()).is.true;
  });

  it('Takes action', function() {
    const selectCard = card.action(player) as SelectCard<IProjectCard>;
    expect(selectCard.cards).has.length(1);
    
    selectCard.cb([selectCard.cards[0]]);
    expect(player.playedCards.filter((card) => card.cardType === CardType.PRELUDE)).has.length(1);
  });

  it('Takes action in Generation 4', function() {
    for (let i = 0; i < 3; i++) {
      game.deferredActions.runAll(() => {});
      TestingUtils.forceGenerationEnd(game);
    }

    const selectCard = card.action(player) as SelectCard<IProjectCard>;
    expect(selectCard.cards).has.length(4);
    
    selectCard.cb([selectCard.cards[0]]);
    expect(player.playedCards.filter((card) => card.cardType === CardType.PRELUDE)).has.length(1);
  });

  it('Can only act once per game', function() {
    const selectCard = card.action(player) as SelectCard<IProjectCard>;
    selectCard.cb([selectCard.cards[0]]);
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
