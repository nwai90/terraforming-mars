import {expect} from 'chai';
import {DysonSwarmConstruction} from '../../../src/turmoil/globalEvents/society/DysonSwarmConstruction';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {Satellites} from '../../../src/cards/base/Satellites';

describe('DysonSwarmConstruction', function() {
  it('resolve play', function() {
    const card = new DysonSwarmConstruction();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player2.id;
    turmoil.dominantParty.delegates.push(player2.id);
    turmoil.dominantParty.delegates.push(player2.id);
    turmoil.dominantParty.delegates.push(player.id);
    player2.playedCards.push(new Satellites());

    card.resolve(game, turmoil);
    expect(player.getTerraformRating()).to.eq(19);
    expect(player2.getTerraformRating()).to.eq(18);
  });
});