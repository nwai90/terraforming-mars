import {expect} from 'chai';
import {RaidOnPrivateers} from '../../../src/turmoil/globalEvents/society/RaidOnPrivateers';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {LunaGovernor} from '../../../src/cards/colonies/LunaGovernor';
import {VenusGovernor} from '../../../src/cards/venusNext/VenusGovernor';
import {EarthOffice} from '../../../src/cards/base/EarthOffice';

describe('RaidOnPrivateers', function() {
  it('resolve play', function() {
    const card = new RaidOnPrivateers();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    player.megaCredits = 5;
    player.playedCards.push(new LunaGovernor(), new VenusGovernor(), new EarthOffice());

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(0);
  });
});