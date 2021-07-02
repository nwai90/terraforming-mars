import {expect} from "chai";
import {Cartel} from "../../../src/cards/base/Cartel";
import {Comet} from "../../../src/cards/base/Comet";
import {Fish} from "../../../src/cards/base/Fish";
import {LavaFlows} from "../../../src/cards/base/LavaFlows";
import {Mine} from "../../../src/cards/base/Mine";
import {NoctisCity} from "../../../src/cards/base/NoctisCity";
import {IProjectCard} from "../../../src/cards/IProjectCard";
import {Game} from "../../../src/Game";
import {SelectCard} from "../../../src/inputs/SelectCard";
import {Monument} from "../../../src/milestones/fanmade/Monument";
import {Player} from "../../../src/Player";
import {TestPlayers} from "../../TestPlayers";

describe('Monument', () => {
  let milestone : Monument; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    milestone = new Monument();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    game = Game.newInstance('test', [player, player2], player);
    player.cardsInHand.push(new Cartel(), new Mine(), new Comet(), new Fish());
  });

  it('Cannot claim with less than 5 cards in hand', () => {
    expect(milestone.canClaim(player)).is.false;
  });

  it('Can claim with 5 cards in hand', () => {
    player.cardsInHand.push(new LavaFlows());
    expect(milestone.canClaim(player)).is.true;
    
    player.claimMilestone(milestone).cb();
    game.deferredActions.runNext(); // pay for milestone
    expect(game.deferredActions.pop()!.execute()).is.undefined; // DiscardCards
  });

  it('Can claim with more than 5 cards in hand', () => {
    player.cardsInHand.push(new LavaFlows(), new NoctisCity());
    expect(milestone.canClaim(player)).is.true;

    player.claimMilestone(milestone).cb();
    game.deferredActions.runNext(); // pay for milestone
    game.deferredActions.runNext();

    const selectCardsToDiscard = game.deferredActions.pop()!.execute() as SelectCard<IProjectCard>;
    selectCardsToDiscard.cb([...selectCardsToDiscard.cards.slice(0, 5)]);
    expect(player.cardsInHand).has.length(1);
  });
});
