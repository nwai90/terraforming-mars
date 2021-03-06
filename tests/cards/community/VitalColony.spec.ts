import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';
import {Game, GameOptions} from '../../../src/Game';
import {ColonyName} from '../../../src/colonies/ColonyName';
import {SelectColony} from '../../../src/inputs/SelectColony';
import {VitalColony} from '../../../src/cards/community/preludes/VitalColony';

describe('VitalColony', function() {
  let card : VitalColony; let player : Player; let game : Game;

  beforeEach(() => {
    card = new VitalColony();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true}) as GameOptions;
    game = Game.newInstance('foobar', [player, redPlayer], player, gameOptions);
  });

  it('Should play', function() {
    player.megaCredits = 5;
    card.play(player);
    expect(game.deferredActions).has.lengthOf(2);

    const selectColony = game.deferredActions.pop()!.execute() as SelectColony;
    game.deferredActions.peek();
    selectColony.cb((<any>ColonyName)[selectColony.coloniesModel[0].name.toUpperCase()]);

    const openColonies = game.colonies.filter((colony) => colony.isActive);
    expect(openColonies[0].colonies.find((c) => c === player.id)).is.not.undefined;
    expect(player.megaCredits).to.eq(0);
  });
});
