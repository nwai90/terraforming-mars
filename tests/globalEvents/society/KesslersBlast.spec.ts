import {expect} from 'chai';
import {KesslersBlast} from '../../../src/turmoil/globalEvents/society/KesslersBlast';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {EarthOffice} from '../../../src/cards/base/EarthOffice';

describe('KesslersBlast', function() {
  it('resolve play', function() {
    const card = new KesslersBlast();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    player.megaCredits = 4;
    player.playedCards.push(new EarthOffice());

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(0);
    expect(player.titanium).to.eq(2);
  });
});