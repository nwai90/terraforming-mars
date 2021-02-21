import {expect} from 'chai';
import {BloomingVale} from '../../../src/turmoil/globalEvents/society/BloomingVale';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';

describe('BloomingVale', function() {
  it('resolve play', function() {
    const card = new BloomingVale();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    game.addGreenery(player, '03');
    player.plants = 0;

    card.resolve(game, turmoil);
    expect(player.plants).to.eq(2);
  });
});