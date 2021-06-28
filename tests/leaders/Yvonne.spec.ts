import {expect} from "chai";
import {Yvonne} from "../../src/cards/leaders/Yvonne";
import {Callisto} from "../../src/colonies/Callisto";
import {Ceres} from "../../src/colonies/Ceres";
import {Triton} from "../../src/colonies/Triton";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Yvonne', function() {
  let card: Yvonne; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Yvonne();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true});
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);

    // Setup some colonies that can be built independently of cards
    const callisto = new Callisto();
    const ceres = new Ceres();
    const triton = new Triton();

    game.colonies = [callisto, ceres, triton];
    callisto.addColony(player);
    ceres.addColony(player);
    triton.addColony(player);
  });

  it('Can act', function() {
    expect(card.canAct(player)).is.true;
  });
  
  it('Takes action', function() {
    card.action(player);
    expect(game.deferredActions).has.length(1);

    game.deferredActions.runAll(() => {});
    expect(player.steel).to.eq(4);
    expect(player.energy).to.eq(6);
    expect(player.titanium).to.eq(5); // 3 from placement + 2 from OPG action
  });

  it('Can only act once per game', function() {
    card.action(player);
    game.deferredActions.runAll(() => {});
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
