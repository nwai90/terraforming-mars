import {expect} from "chai";
import {IProjectCard} from "../../src/cards/IProjectCard";
import {Ingrid} from "../../src/cards/leaders/Ingrid";
import {Game} from "../../src/Game";
import {SelectCard} from "../../src/inputs/SelectCard";
import {Phase} from "../../src/Phase";
import {Player} from "../../src/Player";
import {SpaceType} from "../../src/SpaceType";
import {TileType} from "../../src/TileType";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Ingrid', function() {
  let card: Ingrid; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Ingrid();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);

    player.playedCards.push(card);
  });

  it('Can draw and discard a card when taking action to place tile on Mars', function() {
    card.action();
    game.addGreenery(player, '35');
    expect(game.deferredActions).has.length(2);

    game.deferredActions.runNext(); // Draw card
    expect(player.cardsInHand).has.length(1);

    // Discard card
    game.deferredActions.pop()!.execute() as SelectCard<IProjectCard>;
    expect(player.cardsInHand).has.length(0);
  });

  it('Does not trigger ability when placing ocean during WGT', function() {
    card.action();
    game.phase = Phase.SOLAR;
    game.addTile(player, SpaceType.OCEAN, game.board.spaces.find((space) => space.spaceType === SpaceType.OCEAN)!, {
      tileType: TileType.OCEAN,
    });

    expect(game.deferredActions).has.length(0);
  });

  it('Does not trigger ability when placing tile off Mars', function() {
    card.action();
    game.addTile(player, SpaceType.COLONY, game.board.spaces.find((space) => space.spaceType === SpaceType.COLONY)!, {
      tileType: TileType.CITY,
    });

    expect(game.deferredActions).has.length(0);
  });

  it('Can only act once per game', function() {
    card.action();
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
