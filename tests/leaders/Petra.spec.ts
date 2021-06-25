import {expect} from "chai";
import {Petra} from "../../src/cards/leaders/Petra";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {PartyName} from "../../src/turmoil/parties/PartyName";
import {Turmoil} from "../../src/turmoil/Turmoil";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Petra', function() {
  let card: Petra; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Petra();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
    const turmoil = game.turmoil as Turmoil;

    // Manually set up some neutral delegates
    turmoil.parties.forEach((party) => party.delegates = []);
    turmoil.chairman = "NEUTRAL";

    const scientists = turmoil.getPartyByName(PartyName.SCIENTISTS)!;
    turmoil.sendDelegateToParty("NEUTRAL", scientists.name, game);
    turmoil.sendDelegateToParty("NEUTRAL", scientists.name, game);

    const greens = turmoil.getPartyByName(PartyName.GREENS)!;
    turmoil.sendDelegateToParty("NEUTRAL", greens.name, game);

    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.sendDelegateToParty("NEUTRAL", reds.name, game);
  });

  it('Can act', function() {
    expect(card.canAct(player)).is.true;
  });
  
  it('Takes action - lobby delegate remains unused', function() {
    // Replace 4 delegates + chairman
    card.action(player);

    const turmoil = game.turmoil as Turmoil;
    expect(turmoil.getDelegatesInReserve(player.id)).to.eq(1);
    expect(turmoil.lobby.has(player.id)).is.true;
    expect(turmoil.chairman).to.eq(player.id);
    
    const scientists = turmoil.getPartyByName(PartyName.SCIENTISTS)!;
    expect(scientists.delegates.filter((delegate) => delegate === player.id)).has.length(2);
    expect(scientists.partyLeader).to.eq(player.id);

    const greens = turmoil.getPartyByName(PartyName.GREENS)!;
    expect(greens.delegates.filter((delegate) => delegate === player.id)).has.length(1);
    expect(greens.partyLeader).to.eq(player.id);

    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    expect(reds.delegates.filter((delegate) => delegate === player.id)).has.length(1);
    expect(reds.partyLeader).to.eq(player.id);
  });

  it('Takes action - lobby delegate is also used', function() {
    const turmoil = game.turmoil as Turmoil;
    const scientists = turmoil.getPartyByName(PartyName.SCIENTISTS)!;
    turmoil.sendDelegateToParty("NEUTRAL", scientists.name, game);
    turmoil.sendDelegateToParty("NEUTRAL", scientists.name, game);

    // Replace 6 delegates + chairman
    card.action(player);
    expect(turmoil.getDelegatesInReserve(player.id)).to.eq(0);
    expect(turmoil.lobby.has(player.id)).is.false;
    expect(turmoil.chairman).to.eq(player.id);
    
    expect(scientists.delegates.filter((delegate) => delegate === player.id)).has.length(4);
    expect(scientists.partyLeader).to.eq(player.id);

    const greens = turmoil.getPartyByName(PartyName.GREENS)!;
    expect(greens.delegates.filter((delegate) => delegate === player.id)).has.length(1);
    expect(greens.partyLeader).to.eq(player.id);

    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    expect(reds.delegates.filter((delegate) => delegate === player.id)).has.length(1);
    expect(reds.partyLeader).to.eq(player.id);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
  });
});
