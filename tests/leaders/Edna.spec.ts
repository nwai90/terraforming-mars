import {expect} from "chai";
import {MicroMills} from "../../src/cards/base/MicroMills";
import {Research} from "../../src/cards/base/Research";
import {Edna} from "../../src/cards/leaders/Edna";
import {Game} from "../../src/Game";
import {SelectAmount} from "../../src/inputs/SelectAmount";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Edna', function() {
  let card: Edna; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Edna();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Cannot act without cards', function() {
    expect(card.canAct(player)).is.false;
  });

  it('Takes action', function() {
    player.cardsInHand.push(new Research(), new MicroMills());
    expect(card.canAct(player)).is.true;

    const selectAmount = card.action(player) as SelectAmount;
    selectAmount.cb(2);
    game.deferredActions.runAll(() => {});
    expect(player.cardsInHand).has.length(2);
  });

  it('Can only act once per game', function() {
    player.cardsInHand.push(new Research(), new MicroMills());
    (card.action(player) as SelectAmount).cb(2);

    TestingUtils.forceGenerationEnd(game);
    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
