import {expect} from 'chai';
import {PowerTrip} from '../../../src/turmoil/globalEvents/society/PowerTrip';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestPlayers';
import {PowerPlant} from '../../../src/cards/base/PowerPlant';

describe('PowerTrip', function() {
  it('resolve play', function() {
    const card = new PowerTrip();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    player.energy = 10;
    player.playedCards.push(new PowerPlant());

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(2);
    expect(player.energy).to.eq(0);
  });
});