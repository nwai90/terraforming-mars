import {expect} from 'chai';
import {WoodlandInitiatives} from '../../../src/turmoil/globalEvents/society/WoodlandInitiatives';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestPlayers';
import {PartyName} from '../../../src/turmoil/parties/PartyName';

describe('WoodlandInitiatives', function() {
  it('resolve play', function() {
    const card = new WoodlandInitiatives();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    card.resolve(game, turmoil);
    expect(game.getOxygenLevel()).to.eq(1);
    expect(player.cardsInHand).has.lengthOf(1);
  });
});