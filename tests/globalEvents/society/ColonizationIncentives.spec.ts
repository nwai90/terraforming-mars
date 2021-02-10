import {expect} from 'chai';
import {ColonizationIncentives} from '../../../src/turmoil/globalEvents/society/ColonizationIncentives';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';

describe('ColonizationIncentives', function() {
  it('resolve play', function() {
    const card = new ColonizationIncentives();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(2);
    expect(player.energy).to.eq(3);
  });
});