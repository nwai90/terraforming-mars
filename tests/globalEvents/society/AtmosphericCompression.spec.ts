import {expect} from 'chai';
import {AtmosphericCompression} from '../../../src/turmoil/globalEvents/society/AtmosphericCompression';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestPlayers';
import {VenusGovernor} from '../../../src/cards/venusNext/VenusGovernor';
import {PartyName} from '../../../src/turmoil/parties/PartyName';

describe('AtmosphericCompression', function() {
  it('resolve play', function() {
    const card = new AtmosphericCompression();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    game.increaseVenusScaleLevel(player, 2);
    player.playedCards.push(new VenusGovernor());
    player.setTerraformRating(20);

    card.resolve(game, turmoil);
    expect(game.getVenusScaleLevel()).to.eq(0);
    expect(player.getTerraformRating()).to.eq(21);
  });
});