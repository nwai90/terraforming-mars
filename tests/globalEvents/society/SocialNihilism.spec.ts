import {expect} from 'chai';
import {SocialNihilism} from '../../../src/turmoil/globalEvents/society/SocialNihilism';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestPlayers';

describe('SocialNihilism', function() {
  it('resolve play', function() {
    const card = new SocialNihilism();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const turmoil = Turmoil.newInstance(game);

    player.megaCredits = 2;
    game.addCityTile(player, '21');

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(0);
  });
});