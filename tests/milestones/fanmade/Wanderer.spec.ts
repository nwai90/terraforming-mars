import {expect} from "chai";
import {Game} from "../../../src/Game";
import {Wanderer} from "../../../src/milestones/fanmade/Wanderer";
import {MoonExpansion} from "../../../src/moon/MoonExpansion";
import {Player} from "../../../src/Player";
import {TestingUtils} from "../../TestingUtils";
import {TestPlayers} from "../../TestPlayers";

describe('Wanderer', () => {
  let milestone : Wanderer; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    milestone = new Wanderer();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('test', [player, player2], player);
  });

  it('Can claim with 3 tiles on Mars with no placement bonus', () => {
    const emptySpaces = game.board.getAvailableSpacesOnLand(player).filter((space) => space.bonus.length === 0);

    game.addCityTile(player, emptySpaces[0].id);
    game.addGreenery(player, emptySpaces[1].id);
    game.addGreenery(player, emptySpaces[2].id);
    expect(milestone.canClaim(player)).is.true;
  });

  it('Can claim with 3 tiles on The Moon with no placement bonus', () => {
    const moonOptions = TestingUtils.setCustomGameOptions({moonExpansion: true});
    game = Game.newInstance('test', [player, player2], player, moonOptions);
    const emptySpaces = game.moonData!.moon.spaces.filter((space) => space.bonus.length === 0);

    MoonExpansion.addRoadTile(player, emptySpaces[0].id);
    MoonExpansion.addRoadTile(player, emptySpaces[1].id);
    MoonExpansion.addRoadTile(player, emptySpaces[2].id);
    expect(milestone.canClaim(player)).is.true;
  });
});
