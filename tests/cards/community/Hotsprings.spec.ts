import {expect} from 'chai';
import {ImportOfAdvancedGHG} from '../../../src/cards/base/ImportOfAdvancedGHG';
import {MicroMills} from '../../../src/cards/base/MicroMills';
import {Hotsprings} from '../../../src/cards/community/corporations/Hotsprings';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestPlayers';

describe('Hotsprings', function() {
  let card : Hotsprings; let player : Player;

  beforeEach(function() {
    card = new Hotsprings();
    player = TestPlayers.BLUE.newPlayer();

    card.play(player);
    player.corporationCard = card;
  });

  it('Cannot act', function() {
    expect(card.canAct(player)).to.be.false;
  });

  it('Increases 1 MC production if heat production was increased 1 step', function() {
    const microMills = new MicroMills();
    microMills.play(player);
    expect(card.canAct(player)).to.be.true;

    card.action(player);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1);
  });

  it('Increases 2 MC production if heat production was increased more than 1 step', function() {
    const importOfAdvancedGHG = new ImportOfAdvancedGHG();
    importOfAdvancedGHG.play(player);
    expect(card.canAct(player)).to.be.true;

    card.action(player);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);
  });
});
