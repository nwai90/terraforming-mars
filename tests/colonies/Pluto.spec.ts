import {expect} from 'chai';
import {IProjectCard} from '../../src/cards/IProjectCard';
import {Pluto} from '../../src/colonies/Pluto';
import {Game} from '../../src/Game';
import {SelectCard} from '../../src/inputs/SelectCard';
import {Player} from '../../src/Player';
import {TestPlayers} from '../TestPlayers';
import {TestingUtils} from '../TestingUtils';

describe('Pluto', function() {
  let pluto: Pluto; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    pluto = new Pluto();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
    game.gameOptions.coloniesExtension = true;
    game.colonies.push(pluto);
  });

  it('Should build', function() {
    pluto.addColony(player);
    game.deferredActions.runAll(() => {}); // Draw cards
    expect(player.cardsInHand).has.lengthOf(2);
  });

  it('Should trade', function() {
    pluto.trade(player);
    game.deferredActions.runAll(() => {}); // Draw cards
    expect(player.cardsInHand).has.lengthOf(1);
  });

  it('Should give trade bonus', function() {
    pluto.addColony(player);
    pluto.trade(player2);
    game.deferredActions.runAll(() => {});

    const input = player.getWaitingFor()! as SelectCard<IProjectCard>;
    expect(input).instanceof(SelectCard);
    input.cb([input.cards[0]]); // Discard a card

    expect(player.cardsInHand).has.lengthOf(2);
    expect(player2.cardsInHand).has.lengthOf(1);
  });

  it('Automatically discards cards for conceded players', function() {
    pluto.addColony(player);
    player.hasConceded = true;
    pluto.trade(player2);

    game.deferredActions.runAll(() => {});

    expect(player.cardsInHand).has.lengthOf(2); // 2 + 1 - 1
    expect(player2.cardsInHand).has.lengthOf(1);
  });

  it('Draw and discard one at a time', () => {
    pluto.addColony(player);
    pluto.addColony(player);
    TestingUtils.runAllActions(game);
    expect(player.cardsInHand).has.lengthOf(4);

    pluto.trade(player2);
    TestingUtils.runAllActions(game);
    expect(player.cardsInHand).has.lengthOf(5);

    const input = player.getWaitingFor()! as SelectCard<IProjectCard>;
    expect(input).instanceof(SelectCard);
    input.cb([input.cards[0]]); // Discard first card
    expect(player.cardsInHand).has.lengthOf(4);

    TestingUtils.runAllActions(game);
    expect(player.cardsInHand).has.lengthOf(5);

    const input2 = player.getWaitingFor()! as SelectCard<IProjectCard>;
    expect(input2).instanceof(SelectCard);
    input2.cb([input2.cards[0]]); // Discard second card
    expect(player.cardsInHand).has.lengthOf(4);
  });
});
