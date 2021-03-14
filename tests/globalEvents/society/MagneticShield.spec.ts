import {expect} from 'chai';
import {MagneticShield} from '../../../src/turmoil/globalEvents/society/MagneticShield';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestPlayers';
import {PowerPlant} from '../../../src/cards/base/PowerPlant';

describe('MagneticShield', function() {
  it('resolve play', function() {
    const card = new MagneticShield();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    player.megaCredits = 4;
    player.playedCards.push(new PowerPlant());

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(0);
  });
});