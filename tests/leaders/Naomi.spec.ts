import {expect} from "chai";
import {Naomi} from "../../src/cards/leaders/Naomi";
import {Callisto} from "../../src/colonies/Callisto";
import {Ceres} from "../../src/colonies/Ceres";
import {ColonyName} from "../../src/colonies/ColonyName";
import {MAX_COLONY_TRACK_POSITION} from "../../src/constants";
import {Game} from "../../src/Game";
import {SelectColony} from "../../src/inputs/SelectColony";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Naomi', function() {
  let card: Naomi; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Naomi();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true});
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);

    // Setup some colonies that can be built independently of cards
    game.colonies = [new Callisto(), new Ceres()];
  });

  it('Can act', function() {
    expect(card.canAct(player)).is.true;
  });
  
  it('Takes action', function() {
    card.action(player);
    expect(game.deferredActions).has.length(1);

    const selectColony = game.deferredActions.pop()!.execute() as SelectColony;
    const colonyName = selectColony.coloniesModel[game.colonies.length - 1].name.toUpperCase();

    selectColony.cb((<any>ColonyName)[colonyName]);
    expect(game.colonies[game.colonies.length - 1].trackPosition).to.eq(MAX_COLONY_TRACK_POSITION);
  });

  it('Can only act once per game', function() {
    card.action(player);
    const selectColony = game.deferredActions.pop()!.execute() as SelectColony;
    selectColony.cb((<any>ColonyName)[selectColony.coloniesModel[0].name.toUpperCase()]);
    game.deferredActions.runAll(() => {});
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
