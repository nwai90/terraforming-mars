import {expect} from "chai";
import {Jansson} from "../../src/cards/leaders/Jansson";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Jansson', function() {
  let card: Jansson; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Jansson();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Can act', function() {
    expect(card.canAct()).is.true;
  });

  it('Takes action', function() {
    game.addGreenery(player, '35');
    expect(player.plants).to.eq(2);
    
    card.action(player);
    expect(player.plants).to.eq(4);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
