import {expect} from 'chai';
import {ClosedBiospheres} from '../../../src/turmoil/globalEvents/society/ClosedBiospheres';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestPlayers';
import {Resources} from '../../../src/Resources';

describe('ClosedBiospheres', function() {
  it('resolve play', function() {
    const card = new ClosedBiospheres();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    turmoil.dominantParty.delegates.push(player.id);
    player.addProduction(Resources.PLANTS);

    card.resolve(game, turmoil);
    expect(player.plants).to.eq(2);
    expect(player.getProduction(Resources.PLANTS)).to.eq(0);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(-1);
  });
});