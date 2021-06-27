import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {NewMarsResearchFacility} from '../../../src/cards/community/preludes/NewMarsResearchFacility';
import {TestPlayers} from '../../TestPlayers';
import {SelectCard} from '../../../src/inputs/SelectCard';
import {IProjectCard} from '../../../src/cards/IProjectCard';

describe('NewMarsResearchFacility', function() {
  let card : NewMarsResearchFacility; let player : Player; let game: Game;

  beforeEach(() => {
    card = new NewMarsResearchFacility();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play: Keep some cards', function() {
    card.play(player);
    expect(game.deferredActions).has.length(2);
    
    const selectCardsToKeep = game.deferredActions.pop()!.execute() as SelectCard<IProjectCard>;
    selectCardsToKeep.cb([selectCardsToKeep.cards[0], selectCardsToKeep.cards[4]]);
    expect(player.cardsInHand).has.lengthOf(2);

    game.deferredActions.runAll(() => {});
    expect(player.megaCredits).to.eq(12);
  });

  it('Should play: Keep all cards', function() {
    card.play(player);
    expect(game.deferredActions).has.length(2);
    
    const selectCardsToKeep = game.deferredActions.pop()!.execute() as SelectCard<IProjectCard>;
    selectCardsToKeep.cb([...selectCardsToKeep.cards]);
    expect(player.cardsInHand).has.lengthOf(6);

    game.deferredActions.runAll(() => {});
    expect(player.megaCredits).to.eq(0);
  });
});
