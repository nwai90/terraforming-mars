import {expect} from 'chai';
import {AlliedResearch} from '../../../src/cards/community/preludes/AlliedResearch';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestPlayers';
import {Mine} from '../../../src/cards/base/Mine';

describe('AlliedResearch', function() {
  it('Should play', function() {
    const card = new AlliedResearch();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    const mine = new Mine();
    player.playedCards.push(mine);

    card.action(player);
    expect(player.cardsInHand).has.length(5);
    expect(player.cardsInHand.includes(mine)).is.false;
  });
});
