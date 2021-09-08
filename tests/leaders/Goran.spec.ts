import {expect} from "chai";
import {Gordon} from "../../src/cards/leaders/Gordon";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {SpaceType} from "../../src/SpaceType";
import {TileType} from "../../src/TileType";
import {TestPlayers} from "../TestPlayers";

describe('Gordon', function() {
  let card: Gordon; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Gordon();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);

    player.playedCards.push(card);
  });

  it('Can place greenery tile on any available land space', function() {
    game.addGreenery(player, '35');
    expect(game.board.getAvailableSpacesForGreenery(player).length).greaterThan(6);
  });

  it('Gains 2 MC when placing city or greenery tile', function() {
    player.megaCredits = 0;

    game.addGreenery(player, '35');
    game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(2);

    game.addCityTile(player, '37');
    game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(4);
  });

  it('Does not gain MC when placing city off Mars', function() {
    player.megaCredits = 0;

    game.addTile(player, SpaceType.COLONY, game.board.spaces.find((space) => space.spaceType === SpaceType.COLONY)!, {
      tileType: TileType.CITY,
    });

    expect(player.megaCredits).to.eq(0);
  });

  it('Does not gain MC when opponent places city or greenery tile', function() {
    player.megaCredits = 0;
    game.addGreenery(player2, '35');
    expect(player.megaCredits).to.eq(0);
  });
});
