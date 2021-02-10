import {expect} from 'chai';
import {UniversalRoom} from '../../../src/turmoil/globalEvents/society/UniversalRoom';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {DomedCrater} from '../../../src/cards/base/DomedCrater';

describe('UniversalRoom', function() {
  it('resolve play', function() {
    const card = new UniversalRoom();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    player.playedCards.push(new DomedCrater());

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(2);
    expect(game.deferredActions).has.lengthOf(1);
  });
});