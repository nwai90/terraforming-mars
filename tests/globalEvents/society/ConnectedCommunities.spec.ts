import {expect} from 'chai';
import {ConnectedCommunities} from '../../../src/turmoil/globalEvents/society/ConnectedCommunities';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('ConnectedCommunities', function() {
  it('resolve play', function() {
    const card = new ConnectedCommunities();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    game.addGreenery(player, '21');
    game.addGreenery(player, '22');
    game.addGreenery(player, '23');
    player.setTerraformRating(20);

    card.resolve(game, turmoil);
    expect(player.getTerraformRating()).to.eq(21);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1);
  });
});