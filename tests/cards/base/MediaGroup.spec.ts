import {expect} from 'chai';
import {MediaGroup} from '../../../src/cards/base/MediaGroup';
import {CardType} from '../../../src/cards/CardType';
import {IProjectCard} from '../../../src/cards/IProjectCard';
import {Game} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';

describe('MediaGroup', function() {
  it('Should play', function() {
    const card = new MediaGroup();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);

    const action = card.play();
    expect(action).is.undefined;
    player.playedCards.push(card);

    card.onCardPlayed(player, {cardType: CardType.EVENT} as IProjectCard);
    TestingUtils.runAllActions(game);
    expect(player.megaCredits).eq(3);

    card.onCardPlayed(player, {cardType: CardType.ACTIVE} as IProjectCard);
    TestingUtils.runAllActions(game);
    expect(player.megaCredits).eq(3);

    card.onCardPlayed(player2, {cardType: CardType.EVENT} as IProjectCard);
    TestingUtils.runAllActions(game);
    expect(player.megaCredits).eq(3); // no change for player
    expect(player2.megaCredits).eq(0); // no gain for player2
  });
});
