import {expect} from "chai";
import {Quill} from "../../src/cards/leaders/Quill";
import {Dirigibles} from "../../src/cards/venusNext/Dirigibles";
import {LocalShading} from "../../src/cards/venusNext/LocalShading";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Quill', function() {
  let card: Quill; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Quill();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
  });

  it('Can act', function() {
    expect(card.canAct()).is.true;
  });
  
  it('Takes action', function() {
    const dirigibles = new Dirigibles();
    const localShading = new LocalShading();
    player.playedCards.push(dirigibles, localShading);

    card.action(player);
    expect(dirigibles.resourceCount).to.eq(2);
    expect(localShading.resourceCount).to.eq(2);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);
    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
