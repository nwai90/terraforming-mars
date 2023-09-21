import {expect} from 'chai';
import {Decomposers} from '../../../src/cards/base/Decomposers';
import {IProjectCard} from '../../../src/cards/IProjectCard';
import {EcologyExperts} from '../../../src/cards/prelude/EcologyExperts';
import {Tags} from '../../../src/cards/Tags';
import {Game} from '../../../src/Game';
import {Phase} from '../../../src/Phase';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('Decomposers', function() {
  let card : Decomposers; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new Decomposers();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Can\'t play', function() {
    expect(card.canPlay(player)).is.false;
  });

  it('Should play', function() {
    game.setOxygenLevel(3);
    expect(card.canPlay(player)).is.true;

    card.play(player);
    player.playedCards.push(card);

    card.onCardPlayed(player, {tags: [Tags.ANIMAL]} as IProjectCard);
    expect(card.resourceCount).eq(1);

    card.onCardPlayed(player, {tags: [Tags.MICROBE]} as IProjectCard);
    expect(card.resourceCount).eq(2);

    card.onCardPlayed(player, {tags: [Tags.PLANT]} as IProjectCard);
    expect(card.resourceCount).eq(3);

    card.onCardPlayed(player2, {tags: [Tags.PLANT]} as IProjectCard);
    expect(card.resourceCount).eq(3);

    expect(card.getVictoryPoints()).eq(1);
  });

  it('Should get triggered by EcoExperts if played together', function() {
    const ecoExpertCard = new EcologyExperts();
    game.phase = Phase.PRELUDES;
    player.playCard(ecoExpertCard);
    expect(card.canPlay(player)).is.true;
    player.playCard(card);
    expect(card.resourceCount).eq(3);
  });
});
