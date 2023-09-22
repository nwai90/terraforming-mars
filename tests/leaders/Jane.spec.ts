import {expect} from "chai";
import {Jane} from "../../src/cards/leaders/Jane";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";
import {SpaceMirrors} from "../../src/cards/base/SpaceMirrors";
import {SearchForLife} from "../../src/cards/base/SearchForLife";
import {SelectCard} from "../../src/inputs/SelectCard";
import {ICard} from "../../src/cards/ICard";

describe('Jane', function() {
  let card: Jane; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Jane();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    player.playedCards.push(card);

    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Cannot act in generation 1', function() {
    game.generation = 1;
    expect(card.canAct(player)).is.false;
  });

  it('Cannot act if there are no used action cards', function() {
    game.generation = 2;

    const spaceMirrors = new SpaceMirrors();
    const searchForLife = new SearchForLife();
    player.playedCards.push(spaceMirrors, searchForLife);

    expect(card.canAct(player)).is.false;
  });

  it('Takes action', function() {
    game.generation = 2;

    const spaceMirrors = new SpaceMirrors();
    const searchForLife = new SearchForLife();
    player.playedCards.push(spaceMirrors, searchForLife);
    player.actionsThisGeneration.add(spaceMirrors.name);
    player.actionsThisGeneration.add(searchForLife.name);

    expect(card.canAct(player)).is.true;

    card.action(player);
    const selectCard = game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    selectCard.cb([selectCard.cards[0]]);
    game.deferredActions.runAll(() => {});

    expect(player.actionsThisGeneration.has(spaceMirrors.name)).is.false;
  });

  it('Can only act once per game', function() {
    card.action(player);
    game.deferredActions.runNext();
    game.deferredActions.runAll(() => {});

    TestingUtils.forceGenerationEnd(game);
    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
