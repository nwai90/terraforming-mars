import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {FortifiedOutpost} from '../../../src/cards/community/preludes/FortifiedOutpost';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TileType} from '../../../src/TileType';
import {TestPlayers} from '../../TestingUtils';

describe('FortifiedOutpost', function() {
  let card : FortifiedOutpost; let player : Player; let game : Game;

  beforeEach(function() {
    card = new FortifiedOutpost();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    player.megaCredits = 10;

    card.play(player, game);
    expect(game.deferredActions).has.lengthOf(3);

    const selectSpaceForCity = game.deferredActions.pop()!.execute() as SelectSpace;
    game.deferredActions.peek();

    const selectSpaceForGreenery = game.deferredActions.pop()!.execute() as SelectSpace;
    game.deferredActions.peek();

    game.deferredActions.runNext(); // howToPay

    expect(selectSpaceForCity.cb(selectSpaceForCity.availableSpaces[0])).is.undefined;
    expect(selectSpaceForCity.availableSpaces[0].player).to.eq(player);
    expect(selectSpaceForCity.availableSpaces[0].tile).is.not.undefined;
    expect(selectSpaceForCity.availableSpaces[0].tile!.tileType).to.eq(TileType.CITY);

    expect(selectSpaceForGreenery.cb(selectSpaceForGreenery.availableSpaces[1])).is.undefined;
    expect(selectSpaceForGreenery.availableSpaces[1].player).to.eq(player);
    expect(selectSpaceForGreenery.availableSpaces[1].tile).is.not.undefined;
    expect(selectSpaceForGreenery.availableSpaces[1].tile!.tileType).to.eq(TileType.GREENERY);

    expect(player.megaCredits).to.eq(0);
  });
});
