import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {GroundwaterMohole} from '../../../src/cards/community/preludes/GroundwaterMohole';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestPlayers';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {SpaceType} from '../../../src/SpaceType';

describe('GroundwaterMohole', function() {
  let card : GroundwaterMohole; let player : Player;

  beforeEach(() => {
    card = new GroundwaterMohole();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    const selectSpace = card.play(player) as SelectSpace;
    expect(selectSpace.availableSpaces).has.length(7);
    expect(selectSpace.availableSpaces.filter((space) => space.spaceType === SpaceType.LAND)).has.length(6);
    expect(selectSpace.availableSpaces.filter((space) => space.spaceType === SpaceType.OCEAN)).has.length(1);

    selectSpace.cb(selectSpace.availableSpaces[0]);
    expect(player.steel).is.greaterThan(0);

    expect(player.getProduction(Resources.STEEL)).to.eq(1);
    expect(player.heat).to.eq(3);
  });
});
