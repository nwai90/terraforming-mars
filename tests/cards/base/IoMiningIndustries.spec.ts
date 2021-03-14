import {expect} from 'chai';
import {IoMiningIndustries} from '../../../src/cards/base/IoMiningIndustries';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('IoMiningIndustries', function() {
  it('Should play', function() {
    const card = new IoMiningIndustries();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);

    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.TITANIUM)).to.eq(2);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);
    player.playedCards.push(card);
    expect(card.getVictoryPoints(player)).to.eq(1);
  });
});
