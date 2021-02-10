import {expect} from 'chai';
import {ControlledTectonics} from '../../../src/turmoil/globalEvents/society/ControlledTectonics';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {VenusWaystation} from '../../../src/cards/venusNext/VenusWaystation';

describe('ControlledTectonics', function() {
  it('resolve play', function() {
    const card = new ControlledTectonics();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    player.playedCards.push(new VenusWaystation());

    card.resolve(game, turmoil);
    expect(player.heat).to.eq(4);
    expect(game.getVenusScaleLevel()).to.eq(4);
  });
});