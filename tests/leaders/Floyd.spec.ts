import {expect} from "chai";
import {AsteroidMining} from "../../src/cards/base/AsteroidMining";
import {Floyd} from "../../src/cards/leaders/Floyd";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Floyd', function() {
  let card: Floyd; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Floyd();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Cannot act without cards', function() {
    expect(card.canAct(player)).is.false;
  });

  it('Takes action', function() {
    player.cardsInHand.push(new AsteroidMining());
    expect(card.canAct(player)).is.true;

    card.action(player);
    expect(game.deferredActions).has.length(2);
    player.actionsThisGeneration.add(card.name);
    expect(card.getCardDiscount(player)).to.eq(15);

    game.deferredActions.runAll(() => {});
    expect(card.getCardDiscount(player)).to.eq(0);
  });

  it('Can only act once per game', function() {
    card.action(player);
    game.deferredActions.runAll(() => {});

    TestingUtils.forceGenerationEnd(game);
    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
