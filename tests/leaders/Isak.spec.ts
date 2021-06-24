import {expect} from "chai";
import {Isak} from "../../src/cards/leaders/Isak";
import {Game} from "../../src/Game";
import {Phase} from "../../src/Phase";
import {Player} from "../../src/Player";
import {SpaceType} from "../../src/SpaceType";
import {TileType} from "../../src/TileType";
import {TestPlayers} from "../TestPlayers";

describe('Isak', function() {
  let card: Isak; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Isak();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);

    player.playedCards.push(card);
  });

  it('Can draw and discard a card when taking action to place tile on Mars', function() {
    game.addGreenery(player, '35');
    expect(game.deferredActions).has.length(2);

    game.deferredActions.runNext(); // Draw card
    expect(player.cardsInHand).has.length(1);

    game.deferredActions.runNext(); // Discard card
    expect(player.cardsInHand).has.length(0);
  });

  it('Does not trigger ability when placing ocean during WGT', function() {
    game.phase = Phase.SOLAR;
    game.addTile(player, SpaceType.OCEAN, game.board.spaces.find((space) => space.spaceType === SpaceType.OCEAN)!, {
      tileType: TileType.OCEAN,
    });

    expect(game.deferredActions).has.length(0);
  });

  it('Does not trigger ability when placing tile off Mars', function() {
    game.addTile(player, SpaceType.COLONY, game.board.spaces.find((space) => space.spaceType === SpaceType.COLONY)!, {
      tileType: TileType.CITY,
    });

    expect(game.deferredActions).has.length(0);
  });
});
