import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {setCustomGameOptions, TestPlayers} from '../../TestingUtils';
import {Game, GameOptions} from '../../../src/Game';
import {ColonyName} from '../../../src/colonies/ColonyName';
import {SelectColony} from '../../../src/inputs/SelectColony';
import {StrategicBasePlanning} from '../../../src/cards/community/preludes/StrategicBasePlanning';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TileType} from '../../../src/TileType';
import {Iapetus} from '../../../src/cards/community/colonies/Iapetus';

describe('StrategicBasePlanning', function() {
  let card : StrategicBasePlanning; let player : Player; let player2 : Player; let game : Game;

  beforeEach(function() {
    card = new StrategicBasePlanning();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    const gameOptions = setCustomGameOptions({coloniesExtension: true}) as GameOptions;
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
    game.colonies.push(new Iapetus()); // ensure an open colony is always available
  });

  it('Should play', function() {
    player.megaCredits = 6;
    card.play(player);
    expect(game.deferredActions).has.lengthOf(2);

    const selectColony = game.deferredActions.pop()!.execute() as SelectColony;
    selectColony.cb((<any>ColonyName)[selectColony.coloniesModel[0].name.toUpperCase()]);

    game.deferredActions.pop()!.execute(); // howToPay
    const selectSpace = game.deferredActions.pop()!.execute() as SelectSpace;
    
    if (selectSpace !== undefined) {
      const openColonies = game.colonies.filter((colony) => colony.isActive);
      expect(openColonies[0].colonies.find((c) => c === player.id)).is.not.undefined;

      expect(selectSpace.cb(selectSpace.availableSpaces[0])).is.undefined;
      expect(selectSpace.availableSpaces[0].player).to.eq(player);
      expect(selectSpace.availableSpaces[0].tile).is.not.undefined;
      expect(selectSpace.availableSpaces[0].tile!.tileType).to.eq(TileType.CITY);

      expect(player.megaCredits).to.eq(0);
    }
  });
});
