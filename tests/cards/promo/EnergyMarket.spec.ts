import {expect} from 'chai';
import {EnergyMarket} from '../../../src/cards/promo/EnergyMarket';
import {Game} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {SelectAmount} from '../../../src/inputs/SelectAmount';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('EnergyMarket', function() {
  let card : EnergyMarket; let player : Player;

  beforeEach(() => {
    card = new EnergyMarket();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
  });

  it('Can\'t act', function() {
    player.addResource(Resources.MEGACREDITS, 1);
    expect(card.canAct(player)).is.false;
  });

  it('Can act when sufficient M€ resources available', function() {
    player.addResource(Resources.MEGACREDITS, 2);
    expect(card.canAct(player)).is.true;
  });

  it('Can act when sufficient M€ (using heat) resources available', function() {
    player.canUseHeatAsMegaCredits = true;
    player.addResource(Resources.MEGACREDITS, 1);
    player.addResource(Resources.HEAT, 3);
    expect(card.canAct(player)).is.true;
  });

  it('Can act when energy production available', function() {
    player.addProduction(Resources.ENERGY, 1);
    expect(card.canAct(player)).is.true;
  });

  it('Should act and provide options when enough M€ resources and energy production available', function() {
    player.addResource(Resources.MEGACREDITS, 2);
    player.addProduction(Resources.ENERGY, 1);
    expect(card.canAct(player)).is.true;

    const result = card.action(player);
    expect(result).instanceOf(OrOptions);
  });

  it('Should act when sufficient M€ resources available', function() {
    player.addResource(Resources.MEGACREDITS, 2);
    const result = card.action(player);
    expect(result).instanceOf(SelectAmount);
  });

  it('Should act when energy production available', function() {
    player.addProduction(Resources.ENERGY, 1);
    const result = card.action(player);
    expect(result).is.undefined;

    expect(player.getProduction(Resources.ENERGY)).eq(0);
    expect(player.getResource(Resources.MEGACREDITS)).eq(8);
  });
});
