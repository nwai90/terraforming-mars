import {expect} from 'chai';
import {FermiSolution} from '../../../src/turmoil/globalEvents/society/FermiSolution';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {Resources} from '../../../src/Resources';
import {Luna} from '../../../src/colonies/Luna';

describe('FermiSolution', function() {
  it('resolve play', function() {
    const card = new FermiSolution();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player2.id;
    turmoil.dominantParty.delegates.push(player2.id);
    turmoil.dominantParty.delegates.push(player2.id);
    turmoil.dominantParty.delegates.push(player.id);

    const colony1 = new Luna();
    colony1.colonies.push(player.id);
    game.colonies.push(colony1);

    card.resolve(game, turmoil);
    expect(player.cardsInHand).has.lengthOf(1);
    expect(player2.cardsInHand).has.lengthOf(2);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(-1);
  });
});