import {expect} from 'chai';
import {Gerontocracy} from '../../../src/turmoil/globalEvents/society/Gerontocracy';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {StanfordTorus} from '../../../src/cards/promo/StanfordTorus';
import {NoctisCity} from '../../../src/cards/base/NoctisCity';

describe('Gerontocracy', function() {
  it('resolve play', function() {
    const card = new Gerontocracy();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    turmoil.dominantParty.delegates.push(player.id);

    (new StanfordTorus).play(player, game);
    (new NoctisCity).play(player);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(10);
  });
});