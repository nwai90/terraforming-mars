import {expect} from "chai";
import {Maria} from "../../src/cards/leaders/Maria";
import {ColonyName} from "../../src/colonies/ColonyName";
import {Game} from "../../src/Game";
import {SelectColony} from "../../src/inputs/SelectColony";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Maria', function() {
  let card: Maria; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Maria();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true});
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
  });

  it('Can act', function() {
    expect(card.canAct(player)).is.true;
  });
  
  it('Takes action', function() {
    const selectColony = card.action(player) as SelectColony;
    const builtColonyName = selectColony.coloniesModel[0].name;

    selectColony.cb((<any>ColonyName)[builtColonyName.toUpperCase()]);
    expect(game.colonies.find((colony) => colony.name === builtColonyName)).is.not.undefined;
  });

  it('Can only act once per game', function() {
    const selectColony = card.action(player) as SelectColony;
    selectColony.cb((<any>ColonyName)[selectColony.coloniesModel[0].name.toUpperCase()]);
    game.deferredActions.runAll(() => {});
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
