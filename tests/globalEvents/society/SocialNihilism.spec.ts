import {expect} from 'chai';
import {SocialNihilism} from '../../../src/turmoil/globalEvents/society/SocialNihilism';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';

describe('SocialNihilism', function() {
  it('resolve play', function() {
    const card = new SocialNihilism();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    player.megaCredits = 2;
    game.addCityTile(player, '03');

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(0);
  });
});