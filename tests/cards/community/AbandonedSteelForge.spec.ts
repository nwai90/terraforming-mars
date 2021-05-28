import {expect} from 'chai';
import {AbandonedSteelForge} from '../../../src/cards/community/preludes/AbandonedSteelForge';
import {Tags} from '../../../src/cards/Tags';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestPlayers';

describe('AbandonedSteelForge', function() {
  it('Should play', function() {
    const card = new AbandonedSteelForge();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
    card.play(player);

    expect(player.steel).to.eq(9);
    expect(player.cardsInHand).has.lengthOf(2);
    expect(player.cardsInHand.filter((card) => card.tags.includes(Tags.BUILDING))).has.lengthOf(2);
  });
});
