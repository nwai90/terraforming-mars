import {expect} from 'chai';
import {EarthCatapult} from '../../../src/cards/base/EarthCatapult';
import {Advertising} from '../../../src/cards/promo/Advertising';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('Advertising', function() {
  it('Should play', function() {
    const advertising = new Advertising();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);

    player.playedCards.push(advertising);
    advertising.play();
    expect(player.getProduction(Resources.MEGACREDITS)).eq(0);

    advertising.onCardPlayed(player, new EarthCatapult());
    expect(player.getProduction(Resources.MEGACREDITS)).eq(1);

    advertising.onCardPlayed(player2, new EarthCatapult());
    expect(player.getProduction(Resources.MEGACREDITS)).eq(1);
    expect(player2.getProduction(Resources.MEGACREDITS)).eq(0);
  });
});
