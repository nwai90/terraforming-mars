import {expect} from "chai";
import {Game} from "../../../src/Game";
import {Colonizer} from "../../../src/milestones/amazonisPlanitia/Colonizer";
import {Player} from "../../../src/Player";
import {TestingUtils} from "../../TestingUtils";
import {TestPlayers} from "../../TestPlayers";

describe('Colonizer', () => {
  let milestone : Colonizer; let player : Player; let game: Game;

  beforeEach(() => {
    milestone = new Colonizer();
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true});
    game = Game.newInstance('test', [player], player, gameOptions);
  });

  it('Can claim with 4 colonies', () => {
    game.colonies.forEach((colony) => colony.colonies.push(player.id));
    expect(milestone.canClaim(player)).is.true;
  });
});
