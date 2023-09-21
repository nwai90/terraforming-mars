import {expect} from 'chai';
import {Spire} from '../../../src/cards/preludeTwo/Spire';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {IProjectCard} from '../../../src/cards/IProjectCard';
import {Insulation} from '../../../src/cards/base/Insulation';
import {Mine} from '../../../src/cards/base/Mine';
import {TechnologyDemonstration} from '../../../src/cards/base/TechnologyDemonstration';
import {MedicalLab} from '../../../src/cards/base/MedicalLab';
import {SelectCard} from '../../../src/inputs/SelectCard';

describe('Spire', function() {
  let card : Spire; let player : Player; let player2 : Player; let game : Game;
  let noTagsCard: IProjectCard; let singleTagCard: IProjectCard; let twoTagsCard: IProjectCard; let twoTagsEventCard: IProjectCard; 

  beforeEach(() => {
    card = new Spire();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.YELLOW.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);

    singleTagCard = new Mine();
    twoTagsCard = new MedicalLab();
    twoTagsEventCard = new TechnologyDemonstration();
    noTagsCard = new Insulation();
  });

  it('Play', function() {
    player.corporationCards.push(card);
    card.play(player);
    expect(card.resourceCount).eq(1);
  });

  it('Should take initial action', function() {
    const action = card.initialAction(player);
    expect(action).is.undefined;
    expect(player.cardsInHand).has.lengthOf(4);

    const discardCards = game.deferredActions.pop()!.execute() as SelectCard<IProjectCard>;
    expect(discardCards).instanceOf(SelectCard);
    discardCards.cb([discardCards.cards[0], discardCards.cards[1], discardCards.cards[2]]);
    expect(player.cardsInHand).has.lengthOf(1);
  });

  it('Effect', function() {
    player.corporationCards.push(card);

    card.onCardPlayed(player, noTagsCard);
    expect(card.resourceCount).eq(0);

    card.onCardPlayed(player, singleTagCard);
    expect(card.resourceCount).eq(0);

    card.onCardPlayed(player, twoTagsCard);
    expect(card.resourceCount).eq(1);

    card.onCardPlayed(player, twoTagsEventCard);
    expect(card.resourceCount).eq(2);

    card.onCardPlayed(player2, twoTagsEventCard);
    expect(card.resourceCount).eq(2);
  });
});
