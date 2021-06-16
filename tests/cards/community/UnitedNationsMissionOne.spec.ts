import {expect} from 'chai';
import {Mine} from '../../../src/cards/base/Mine';
import {UnitedNationsMissionOne} from '../../../src/cards/community/corporations/UnitedNationsMissionOne';
import {UNMIContractor} from '../../../src/cards/prelude/UNMIContractor';
import {Game} from '../../../src/Game';
import {Phase} from '../../../src/Phase';
import {Player} from '../../../src/Player';
import {Election} from '../../../src/turmoil/globalEvents/Election';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';

describe('UnitedNationsMissionOne', function() {
  let card : UnitedNationsMissionOne; let player : Player; let player2 : Player; let game: Game;

  beforeEach(() => {
    card = new UnitedNationsMissionOne();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player, TestingUtils.setCustomGameOptions());

    card.play(player);
    player.corporationCard = card;
  });

  it('Initializes correctly', function() {
    expect(game.unitedNationsMissionOneOwner).to.eq(player.id);
    expect(player.getTerraformRating()).to.eq(21);
  });

  it('Gains 1 MC whenever any player raises TR during action phase', function() {
    game.phase = Phase.ACTION;

    player.increaseTerraformRating();
    expect(player.megaCredits).to.eq(1);

    player2.increaseTerraformRating();
    expect(player.megaCredits).to.eq(2);
  });

  it('Gives MC during initial preludes phase', function() {
    game.phase = Phase.PRELUDES;

    const card = new UNMIContractor();
    card.play(player);
    expect(player.megaCredits).to.eq(3);
  });

  it('Does not give MC during turmoil phase', function() {
    game.phase = Phase.PRODUCTION;

    const card = new Election();
    const turmoil = game.turmoil!;
    player2.playedCards.push(new Mine());
    turmoil.initGlobalEvent(game);

    card.resolve(game, turmoil);
    expect(player2.getTerraformRating()).to.eq(22);
    expect(player.megaCredits).to.eq(0); // no increase
  });
});
