import {expect} from "chai";
import {ResearchOutpost} from "../../src/cards/base/ResearchOutpost";
import {Tate} from "../../src/cards/leaders/Tate";
import {FieldCappedCity} from "../../src/cards/promo/FieldCappedCity";
import {StanfordTorus} from "../../src/cards/promo/StanfordTorus";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestPlayers} from "../TestPlayers";

describe('Tate', function() {
  let card: Tate; let player: Player; let player2: Player;

  beforeEach(() => {
    card = new Tate();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
  });

  it('Has 1 VP for every city tag', function() {
    player.playedCards.push(card);
    player.playedCards.push(new ResearchOutpost(), new FieldCappedCity(), new StanfordTorus());
    expect(player.getVictoryPoints().total).to.eq(25); // 20 TR + 3 VP + 2 VP from StanfordTorus
  });
});
