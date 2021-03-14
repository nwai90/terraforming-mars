import {expect} from 'chai';
import {ColonizationIncentives} from '../../../src/turmoil/globalEvents/society/ColonizationIncentives';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';
import {Luna} from '../../../src/colonies/Luna';

describe('ColonizationIncentives', function() {
  it('resolve play', function() {
    const card = new ColonizationIncentives();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player, TestingUtils.setCustomGameOptions({coloniesExtension: true}));
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    const colony1 = new Luna();
    colony1.colonies.push(player.id);
    game.colonies.push(colony1);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(2);
    expect(player.energy).to.eq(3);
  });
});