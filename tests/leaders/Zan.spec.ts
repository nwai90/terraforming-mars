import {expect} from "chai";
import {ReleaseOfInertGases} from "../../src/cards/base/ReleaseOfInertGases";
import {Zan} from "../../src/cards/leaders/Zan";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {PartyName} from "../../src/turmoil/parties/PartyName";
import {TurmoilPolicy} from "../../src/turmoil/TurmoilPolicy";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Zan', function() {
  let card: Zan; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Zan();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);

    player.playedCards.push(card);
  });

  it('Not affected by Reds policy when raising TR', function() {
    const turmoil = game.turmoil!;
    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    TestingUtils.setRulingPartyAndRulingPolicy(game, turmoil, reds, TurmoilPolicy.REDS_DEFAULT_POLICY);

    player.megaCredits = 3;
    player.increaseTerraformRating();
    game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(3);
  });

  it('Not affected by Reds policy when checking canPlay for cards that give TR', function() {
    player.megaCredits = 14;
    const releaseOfInertGases = new ReleaseOfInertGases();
    expect(releaseOfInertGases.canPlay(player)).is.true;
  });

  it('Takes OPG action', function() {
    const turmoil = game.turmoil!;
    card.action(player);

    while (game.deferredActions.length) {
      game.deferredActions.pop()!.execute();
    }

    expect(turmoil.lobby.has(player.id)).is.false;
    expect(turmoil.delegateReserve.includes(player.id)).is.false;
    expect(turmoil.dominantParty.name).to.eq(PartyName.REDS);
    expect(turmoil.dominantParty.partyLeader).to.eq(player.id);
    expect(card.isDisabled).is.true;
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
