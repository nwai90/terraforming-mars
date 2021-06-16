import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {PerseveranceLanding} from '../../../src/cards/community/PerseveranceLanding';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TileType} from '../../../src/TileType';

describe('PerseveranceLanding', function() {
  let card : PerseveranceLanding; let player : Player;

  beforeEach(() => {
    card = new PerseveranceLanding();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
  });

  it('Should play', function() {
    const selectSpace = card.play(player) as SelectSpace;
    expect(selectSpace.cb(selectSpace.availableSpaces[0])).is.undefined;

    expect(selectSpace.availableSpaces[0].player).to.eq(player);
    expect(selectSpace.availableSpaces[0].tile).is.not.undefined;
    expect(selectSpace.availableSpaces[0].tile!.tileType).to.eq(TileType.PERSEVERANCE_LANDING);
  });
});
