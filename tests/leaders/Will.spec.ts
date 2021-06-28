import {expect} from "chai";
import {Will} from "../../src/cards/leaders/Will";
import {VenusGovernor} from "../../src/cards/venusNext/VenusGovernor";
import {VenusWaystation} from "../../src/cards/venusNext/VenusWaystation";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestPlayers} from "../TestPlayers";

describe('Will', function() {
  let card: Will; let player: Player; let player2: Player;

  beforeEach(() => {
    card = new Will();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    Game.newInstance('foobar', [player, player2], player);
    player.playedCards.push(card);
  });

  it('Gains 3 M€ when playing a Venus tag', function() {
    const venusWaytation = new VenusWaystation();
    const venusGovernor = new VenusGovernor();
    
    player.megaCredits = 20;
    player.playCard(venusWaytation);
    expect(player.megaCredits).to.eq(23); // 20 + 3
    player.playCard(venusGovernor);
    expect(player.megaCredits).to.eq(29); // 23 + 6
  });
});
