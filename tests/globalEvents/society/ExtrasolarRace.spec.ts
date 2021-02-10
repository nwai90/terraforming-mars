import {expect} from 'chai';
import {ExtrasolarRace} from '../../../src/turmoil/globalEvents/society/ExtrasolarRace';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {Resources} from '../../../src/Resources';
import {EnergyTapping} from '../../../src/cards/base/EnergyTapping';

describe('ExtrasolarRace', function() {
  it('resolve play', function() {
    const card = new ExtrasolarRace();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    turmoil.dominantParty.delegates.push(player.id);
    player.playedCards.push(new EnergyTapping());

    card.resolve(game, turmoil);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
  });
});