import {expect} from "chai";
import {ICard} from "../../src/cards/ICard";
import {Tate} from "../../src/cards/leaders/Tate";
import {Game} from "../../src/Game";
import {OrOptions} from "../../src/inputs/OrOptions";
import {SelectCard} from "../../src/inputs/SelectCard";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Tate', function() {
  let card: Tate; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Tate();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    game = Game.newInstance('foobar', [player, player2], player);
    player.megaCredits = 6;
  });

  it('Takes OPG action', function() {
    card.action(player);
    expect(game.deferredActions).has.length(1);

    const orOptions = game.deferredActions.pop()!.execute() as OrOptions;
    const action = orOptions.options[0].cb()! as SelectCard<ICard>;
    expect(action instanceof SelectCard).is.true;

    action.cb([action.cards[0], action.cards[3]]);
    game.deferredActions.runAll(() => {});
    expect(player.cardsInHand).has.length(2);
    expect(player.megaCredits).to.eq(0);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);
    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
