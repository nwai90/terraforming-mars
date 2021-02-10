import {expect} from 'chai';
import {SolarCryptocurrency} from '../../../src/turmoil/globalEvents/society/SolarCryptocurrency';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {Resources} from '../../../src/Resources';

describe('SolarCryptocurrency', function() {
  it('resolve play', function() {
    const card = new SolarCryptocurrency();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    player.addProduction(Resources.ENERGY, 3);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(8);
  });
});