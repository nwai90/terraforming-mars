import {expect} from 'chai';
import {Renationalisation} from '../../../src/turmoil/globalEvents/society/Renationalisation';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {DustSeals} from '../../../src/cards/base/DustSeals';
import {RadSuits} from '../../../src/cards/base/RadSuits';
import {ArchaeBacteria} from '../../../src/cards/base/ArchaeBacteria';

describe('Renationalisation', function() {
  it('resolve play', function() {
    const card = new Renationalisation();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    player.playedCards.push(new DustSeals(), new RadSuits(), new ArchaeBacteria());
    player.megaCredits = 4;

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(0);
  });
});