import {expect} from 'chai';
import {VerdantEconomy} from '../../../src/turmoil/globalEvents/society/VerdantEconomy';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {Lichen} from '../../../src/cards/base/Lichen';

describe('VerdantEconomy', function() {
  it('resolve play', function() {
    const card = new VerdantEconomy();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    player.playedCards.push(new Lichen());

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(4);
  });
});