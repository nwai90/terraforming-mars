import {expect} from 'chai';
import {PhaetonRescue} from '../../../src/turmoil/globalEvents/society/PhaetonRescue';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {Mine} from '../../../src/cards/base/Mine';
import {MedicalLab} from '../../../src/cards/base/MedicalLab';
import {Luna} from '../../../src/colonies/Luna';

describe('PhaetonRescue', function() {
  it('resolve play', function() {
    const card = new PhaetonRescue();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    const colony1 = new Luna();
    colony1.colonies.push(player.id);
    game.colonies.push(colony1);
    player.playedCards.push(new Mine(), new MedicalLab());

    card.resolve(game, turmoil);
    expect(player.steel).to.eq(1);
    expect(colony1.trackPosition).to.eq(1);
  });
});