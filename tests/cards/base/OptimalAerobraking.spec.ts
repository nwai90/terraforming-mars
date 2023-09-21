import {expect} from 'chai';
import {OptimalAerobraking} from '../../../src/cards/base/OptimalAerobraking';
import {CardType} from '../../../src/cards/CardType';
import {IProjectCard} from '../../../src/cards/IProjectCard';
import {Tags} from '../../../src/cards/Tags';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestPlayers';

describe('OptimalAerobraking', function() {
  it('Should play', function() {
    const card = new OptimalAerobraking();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);

    const action = card.play();
    expect(action).is.undefined;
    player.playedCards.push(card);

    card.onCardPlayed(player, card);
    expect(player.megaCredits).eq(0);
    expect(player.heat).eq(0);

    card.onCardPlayed(player, {tags: [Tags.SPACE, Tags.EVENT], cardType: CardType.EVENT} as IProjectCard);
    expect(player.megaCredits).eq(3);
    expect(player.heat).eq(3);

    card.onCardPlayed(player2, {tags: [Tags.SPACE, Tags.EVENT], cardType: CardType.EVENT} as IProjectCard);
    expect(player.megaCredits).eq(3);
    expect(player.heat).eq(3);
    expect(player2.megaCredits).eq(0);
    expect(player2.heat).eq(0);
  });
});
