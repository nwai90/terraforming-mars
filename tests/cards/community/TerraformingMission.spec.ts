import {expect} from 'chai';
import {TerraformingMission} from '../../../src/cards/community/preludes/TerraformingMission';
import {Game} from '../../../src/Game';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TestPlayers} from '../../TestPlayers';

describe('TerraformingMission', function() {
  it('Should play', function() {
    const card = new TerraformingMission();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const initialTR = player.getTerraformRating();
    player.megaCredits = 20;

    card.play(player);
    const selectSpace = game.deferredActions.pop()!.execute() as SelectSpace;
    selectSpace.cb(selectSpace.availableSpaces[0]);
    game.deferredActions.runAll(() => {});

    expect(player.getTerraformRating()).to.eq(initialTR + 1);
    expect(player.plants).to.greaterThanOrEqual(8);
    expect(player.heat).to.eq(8);
    expect(player.megaCredits).to.eq(8);
  });
});
