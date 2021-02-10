import {expect} from 'chai';
import {SmugglingActivity} from '../../../src/turmoil/globalEvents/society/SmugglingActivity';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {VestaShipyard} from '../../../src/cards/base/VestaShipyard';
import {Luna} from '../../../src/colonies/Luna';

describe('SmugglingActivity', function() {
  it('resolve play', function() {
    const card = new SmugglingActivity();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    player.playedCards.push(new VestaShipyard());

    const colony1 = new Luna();
    colony1.colonies.push(player.id);
    game.colonies.push(colony1);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(4);
    expect(colony1.trackPosition).to.eq(3);
  });
});