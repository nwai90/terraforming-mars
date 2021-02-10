import {expect} from 'chai';
import {PlanetFederation} from '../../../src/turmoil/globalEvents/society/PlanetFederation';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {VenusGovernor} from '../../../src/cards/venusNext/VenusGovernor';
import {LunaGovernor} from '../../../src/cards/colonies/LunaGovernor';
import {EarthOffice} from '../../../src/cards/base/EarthOffice';
import {OrOptions} from '../../../build/src/inputs/OrOptions';

describe('PlanetFederation', function() {
  it('resolve play', function() {
    const card = new PlanetFederation();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    player.playedCards.push(new LunaGovernor(), new VenusGovernor(), new EarthOffice());

    card.resolve(game, turmoil);
    expect(game.deferredActions).has.lengthOf(1);

    const action = game.deferredActions.pop()!.execute() as OrOptions;
    action.options[0].cb([player]);
    expect(player.titanium).to.eq(2);
  });
});