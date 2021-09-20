import {expect} from "chai";
import {Oscar} from "../../src/cards/leaders/Oscar";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {Turmoil} from "../../src/turmoil/Turmoil";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Oscar', function() {
  let card: Oscar; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Oscar();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
  });

  it('Has +1 influence', function() {
    card.play(player);
    expect(player.game.turmoil?.getPlayerInfluence(player)).to.eq(1);
  });

  it('Takes OPG action', function() {
    card.action(player);
    const turmoil = Turmoil.getTurmoil(player.game);
    expect(turmoil.chairman).to.eq(player.id);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
