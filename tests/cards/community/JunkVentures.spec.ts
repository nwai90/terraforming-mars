import {expect} from 'chai';
import {JunkVentures} from '../../../src/cards/community/corporations/JunkVentures';
import {IProjectCard} from '../../../src/cards/IProjectCard';
import {Game} from '../../../src/Game';
import {SelectCard} from '../../../src/inputs/SelectCard';
import {Player} from '../../../src/Player';
import {setCustomGameOptions} from '../../TestingUtils';
import {TestPlayers} from '../../TestingUtils';

describe('JunkVentures', function() {
  let card : JunkVentures; let player : Player; let player2 : Player; let game : Game;

  beforeEach(function() {
    card = new JunkVentures();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    const gameOptions = setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);

    card.play();
    player.corporationCard = card;
  });

  it('Cannot act', function() {
    expect(game.dealer.getDiscardedSize() < 3).to.be.true;
    expect(card.canAct(player)).is.false;
  });

  it('Can act', function() {
    const keptCard = game.dealer.dealCard(game);
    game.dealer.discard(keptCard);
    game.dealer.discard(game.dealer.dealCard(game));
    game.dealer.discard(game.dealer.dealCard(game));
    expect(card.canAct(player)).is.true;

    card.action(player);
    expect(game.deferredActions).has.lengthOf(1);

    const selectCardToKeep = game.deferredActions.pop()!.execute() as SelectCard<IProjectCard>;
    expect(selectCardToKeep instanceof SelectCard).is.true;
    selectCardToKeep.cb([keptCard]);
    expect(player.cardsInHand).has.lengthOf(1);
  });
});
