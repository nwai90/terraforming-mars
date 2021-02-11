import {expect} from 'chai';
import {LuxuryFoods} from '../../../src/cards/venusNext/LuxuryFoods';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestingUtils';

describe('LuxuryFoods', function() {
  it('Should play', function() {
    const card = new LuxuryFoods();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    expect(card.canPlay(player)).is.not.true;
    const action = card.play();
    expect(action).is.undefined;
    player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
    expect(player.victoryPointsBreakdown.victoryPoints).to.eq(2);
  });
});
