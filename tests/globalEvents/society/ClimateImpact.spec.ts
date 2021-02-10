import {expect} from 'chai';
import {ClimateImpact} from '../../../src/turmoil/globalEvents/society/ClimateImpact';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';

describe('ClimateImpact', function() {
  it('resolve play', function() {
    const card = new ClimateImpact();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player2.id;
    turmoil.dominantParty.delegates.push(player2.id);
    turmoil.dominantParty.delegates.push(player2.id);
    turmoil.dominantParty.delegates.push(player.id);

    game.increaseOxygenLevel(player, 2);
    player.plants = 5;
    player2.plants = 5;

    card.resolve(game, turmoil);
    expect(player.plants).to.eq(3);
    expect(player2.plants).to.eq(2);
    expect(game.getOxygenLevel()).to.eq(1);
  });
});