import {expect} from "chai";
import {Ants} from "../../src/cards/base/Ants";
import {Birds} from "../../src/cards/base/Birds";
import {ICard} from "../../src/cards/ICard";
import {Will} from "../../src/cards/leaders/Will";
import {AsteroidRights} from "../../src/cards/promo/AsteroidRights";
import {Game} from "../../src/Game";
import {SelectCard} from "../../src/inputs/SelectCard";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Will', function() {
  let card: Will; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Will();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    game = Game.newInstance('foobar', [player, player2], player);
    player.playedCards.push(card);
  });

  it('Takes OPG action', function() {
    const birds = new Birds();
    const ants = new Ants();
    const asteroidRights = new AsteroidRights();
    player.playedCards.push(birds, ants, asteroidRights);

    card.action(player);
    expect(game.deferredActions).has.length(6);

    // Add animals
    game.deferredActions.runNext();
    expect(birds.resourceCount).to.eq(2);

    // Add microbes
    game.deferredActions.runNext();
    expect(ants.resourceCount).to.eq(2);

    game.deferredActions.runNext(); // No Science resource cards, skip
    game.deferredActions.runNext(); // No Floater resource cards, skip

    // Add asteroid
    game.deferredActions.runNext();
    expect(asteroidRights.resourceCount).to.eq(1);

    // Add resource to any card
    const selectCard = game.deferredActions.pop()!.execute() as SelectCard<ICard>;;
    selectCard.cb([selectCard.cards[1]]);
    expect(ants.resourceCount).to.eq(3);
  });

  it('Can only act once per game', function() {
    card.action(player);
    TestingUtils.forceGenerationEnd(game);

    expect(card.isDisabled).is.true;
    expect(card.canAct()).is.false;
  });
});
