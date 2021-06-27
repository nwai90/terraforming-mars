import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {TharsisPrototypeCity} from '../../../src/cards/community/preludes/TharsisPrototypeCity';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TileType} from '../../../src/TileType';
import {TestPlayers} from '../../TestPlayers';
import {Resources} from '../../../src/Resources';

describe('TharsisPrototypeCity', function() {
  let card : TharsisPrototypeCity; let player : Player; let game : Game;

  beforeEach(() => {
    card = new TharsisPrototypeCity();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    card.play(player);
    expect(game.deferredActions).has.lengthOf(1);

    const selectSpaceForCity = game.deferredActions.pop()!.execute() as SelectSpace;
    expect(selectSpaceForCity.cb(selectSpaceForCity.availableSpaces[0])).is.undefined;
    expect(selectSpaceForCity.availableSpaces[0].player).to.eq(player);
    expect(selectSpaceForCity.availableSpaces[0].tile).is.not.undefined;
    expect(selectSpaceForCity.availableSpaces[0].tile!.tileType).to.eq(TileType.CITY);

    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1);
    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
  });
});
