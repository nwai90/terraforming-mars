import {expect} from "chai";
import {HAL9000} from "../../src/cards/leaders/HAL9000";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {Resources} from "../../src/Resources";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('HAL 9000', function() {
  let card: HAL9000; let player: Player; let player2: Player;

  beforeEach(() => {
    card = new HAL9000();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
  });

  it('Takes OPG action', function() {
    player.addProduction(Resources.MEGACREDITS, 1);
    player.addProduction(Resources.STEEL, 1);
    player.addProduction(Resources.TITANIUM, 1);
    player.addProduction(Resources.ENERGY, 1);

    card.action(player);

    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(0);
    expect(player.megaCredits).to.eq(3);
    expect(player.getProduction(Resources.STEEL)).to.eq(0);
    expect(player.steel).to.eq(3);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(0);
    expect(player.titanium).to.eq(3);
    expect(player.getProduction(Resources.ENERGY)).to.eq(0);
    expect(player.energy).to.eq(3);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(player.game);
    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
