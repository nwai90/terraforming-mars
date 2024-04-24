import {expect} from 'chai';
import {SpaceCorridors} from '../../../src/cards/preludeTwo/SpaceCorridors';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {Sponsors} from '../../../src/cards/base/Sponsors';
import {LunaGovernor} from '../../../src/cards/colonies/LunaGovernor';
import {VenusGovernor} from '../../../src/cards/venusNext/VenusGovernor';
import {SisterPlanetSupport} from '../../../src/cards/venusNext/SisterPlanetSupport';
import {JovianEmbassy} from '../../../src/cards/promo/JovianEmbassy';
import {SaturnSurfing} from '../../../src/cards/promo/SaturnSurfing';
import {FloatingHabs} from '../../../src/cards/venusNext/FloatingHabs';

describe('SpaceCorridors', function() {
  let card : SpaceCorridors; let player : Player; let player2 : Player;

  beforeEach(() => {
    card = new SpaceCorridors();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    Game.newInstance('foobar', [player, player2], player);
  });

  it('Play', function() {
    card.play(player);
    expect(player.titanium).eq(3);
  });

  it('Gives discount', function() {
    expect(card.getCardDiscount(player, new Sponsors())).eq(2);
    expect(card.getCardDiscount(player, new LunaGovernor())).eq(4);
    expect(card.getCardDiscount(player, new FloatingHabs())).eq(2);
    expect(card.getCardDiscount(player, new VenusGovernor())).eq(4);
    expect(card.getCardDiscount(player, new SisterPlanetSupport())).eq(4);
    expect(card.getCardDiscount(player, new JovianEmbassy())).eq(2);
    expect(card.getCardDiscount(player, new SaturnSurfing())).eq(4);
  });
});
