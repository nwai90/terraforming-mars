import {expect} from 'chai';
import {TechnologicalTelepathy} from '../../../src/turmoil/globalEvents/society/TechnologicalTelepathy';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {Research} from '../../../src/cards/base/Research';

describe('TechnologicalTelepathy', function() {
  it('resolve play', function() {
    const card = new TechnologicalTelepathy();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    player.playedCards.push(new Research(), new Research());

    card.resolve(game, turmoil);
    expect(player.cardsInHand).has.lengthOf(1);
  });
});