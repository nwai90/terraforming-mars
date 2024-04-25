import {expect} from 'chai';
import {IshtarExpedition} from '../../../src/cards/preludeTwo/IshtarExpedition';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {Tags} from '../../../src/cards/Tags';

describe('IshtarExpedition', function() {
  let card : IshtarExpedition; let player : Player; let player2 : Player;

  beforeEach(() => {
    card = new IshtarExpedition();

    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions();
    Game.newInstance('foobar', [player, player2], player, gameOptions);
  });

  it('Play', function() {
    card.play(player);
    expect(player.titanium).eq(3);
    expect(player.cardsInHand).has.length(2);
    expect(player.cardsInHand.every((card) => card.tags.includes(Tags.VENUS))).is.true;
  });
});
