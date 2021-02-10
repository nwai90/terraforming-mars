import {expect} from 'chai';
import {DutyFreeSpace} from '../../../src/turmoil/globalEvents/society/DutyFreeSpace';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {FloatingHabs} from '../../../src/cards/venusNext/FloatingHabs';
import {ExtractorBalloons} from '../../../src/cards/venusNext/ExtractorBalloons';

describe('DutyFreeSpace', function() {
  it('resolve play', function() {
    const card = new DutyFreeSpace();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    const floatingHabs = new FloatingHabs();
    player.playedCards.push(floatingHabs, new ExtractorBalloons());
    player.addResourceTo(floatingHabs);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(4);
  });
});