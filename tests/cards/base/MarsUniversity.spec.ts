import {expect} from 'chai';
import {MarsUniversity} from '../../../src/cards/base/MarsUniversity';
import {Pets} from '../../../src/cards/base/Pets';
import {Research} from '../../../src/cards/base/Research';
import {Game} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {TestPlayer} from '../../TestPlayer';
import {TestPlayers} from '../../TestPlayers';
import {Mine} from '../../../src/cards/base/Mine';

describe('MarsUniversity', function() {
  let card : MarsUniversity; let player : TestPlayer; let player2 : TestPlayer; let game : Game;

  beforeEach(() => {
    card = new MarsUniversity();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Should play', function() {
    const action = card.play();
    expect(action).is.undefined;
    player.playedCards.push(card);

    expect(card.onCardPlayed(player, new Pets())).is.undefined;
    expect(game.deferredActions).has.length(0);

    const mine = new Mine();
    player.cardsInHand.push(mine);
    card.onCardPlayed(player, card);
    expect(game.deferredActions).has.length(1);

    const orOptions = game.deferredActions.pop()!.execute() as OrOptions;
    orOptions.options[0].cb([mine]);
    expect(player.cardsInHand).has.length(1);
    expect(player.cardsInHand[0]).not.eq(mine);
    expect(game.dealer.discarded).has.length(1);
    expect(game.dealer.discarded[0]).eq(mine);
    expect(game.deferredActions).has.length(0);

    card.onCardPlayed(player2, card);
    expect(game.deferredActions).has.length(0);
  });

  it('Gives victory point', function() {
    card.play();
    player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
    expect(player.victoryPointsBreakdown.victoryPoints).eq(1);
  });

  it('Runs twice for multiple science tags', function() {
    player.playedCards.push(card);
    player.cardsInHand.push(new Mine());
    card.onCardPlayed(player, new Research());
    expect(game.deferredActions).has.lengthOf(2);

    const orOptions = game.deferredActions.pop()!.execute() as OrOptions;
    orOptions.options[1].cb();

    const orOptions2 = game.deferredActions.pop()!.execute() as OrOptions;
    orOptions2.options[1].cb();

    expect(game.deferredActions).has.lengthOf(0);
  });
});
