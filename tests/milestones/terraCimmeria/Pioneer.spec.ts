import {expect} from "chai";
import {LandClaim} from "../../../src/cards/base/LandClaim";
import {Game} from "../../../src/Game";
import {Pioneer} from "../../../src/milestones/terraCimmeria/Pioneer";
import {MoonExpansion} from "../../../src/moon/MoonExpansion";
import {Player} from "../../../src/Player";
import {TestingUtils} from "../../TestingUtils";
import {TestPlayers} from "../../TestPlayers";

describe('Pioneer', () => {
  let milestone : Pioneer; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    milestone = new Pioneer();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('test', [player, player2], player);
  });

  it('Can claim with 5 tiles on Mars', () => {
    game.addCityTile(player, '10');
    game.addGreenery(player, '21');
    game.addCityTile(player, '30');
    game.addGreenery(player, '42');
    game.addGreenery(player, '53');
    expect(milestone.canClaim(player)).is.true;
  });

  it('Counts tiles on the Moon', () => {
    const moonOptions = TestingUtils.setCustomGameOptions({moonExpansion: true});
    game = Game.newInstance('test', [player, player2], player, moonOptions);
      
    MoonExpansion.addRoadTile(player, 'm02');
    MoonExpansion.addRoadTile(player, 'm03');
    MoonExpansion.addRoadTile(player, 'm04');
    MoonExpansion.addMineTile(player, 'm09');
    MoonExpansion.addColonyTile(player, 'm12');
    expect(milestone.canClaim(player)).is.true;
  });

  it('Does not count Land Claim', () => {
    game.addCityTile(player, '10');
    game.addGreenery(player, '21');
    game.addCityTile(player, '30');
    game.addGreenery(player, '42');

    const card = new LandClaim();
    const action = card.play(player);
    action.cb(player.game.board.getAvailableSpacesOnLand(player)[0]);

    expect(milestone.canClaim(player)).is.false;
  });
});
