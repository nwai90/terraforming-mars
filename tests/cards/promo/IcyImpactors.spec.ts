import {expect} from 'chai';
import {IcyImpactors} from '../../../src/cards/promo/IcyImpactors';
import {Game} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {TestingUtils} from '../../TestingUtils';

describe('IcyImpactors', function() {
  let card : IcyImpactors; let player : Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new IcyImpactors();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    
    // Make player2 the first player for test purposes
    game = Game.newInstance('foobar', [player, player2], player2);
  });

  it('Should play', function() {
    expect(card.play()).is.undefined;
  });

  it('canAct', function() {
    player.megaCredits = 9;
    expect(card.canAct(player)).is.false;

    player.megaCredits = 10;
    expect(card.canAct(player)).is.true;
  });

  it('Action', function() {
    player.playedCards.push(card);
    player.megaCredits = 10;

    card.action(player);
    game.deferredActions.runAll(() => {});
    expect(player.megaCredits).eq(0);
    expect(card.resourceCount).eq(2);

    expect(card.canAct(player)).is.true;
    card.action(player);
    expect(card.resourceCount).eq(1);

    expect(game.deferredActions).has.lengthOf(1);
    const deferredAction = game.deferredActions.pop()!;
    expect(deferredAction.player.id).eq(player2.id);

    const selectSpace = deferredAction.execute() as SelectSpace;
    selectSpace.cb(selectSpace.availableSpaces[0]);
    expect(player.getTerraformRating()).eq(21);
    expect(player2.getTerraformRating()).eq(20);
  });

  it('Can spend resource to place ocean if oceans are maxed', function() {
    player.playedCards.push(card);
    card.resourceCount = 1;
    TestingUtils.maxOutOceans(player);
    expect(card.canAct(player)).is.true;

    player.megaCredits = 10;
    const action = card.action(player) as OrOptions;
    expect(action.options).has.lengthOf(2);
  });
});
