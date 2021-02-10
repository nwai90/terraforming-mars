import {expect} from 'chai';
import {TransparentPolitics} from '../../../src/turmoil/globalEvents/society/TransparentPolitics';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {OrOptions} from '../../../src/inputs/OrOptions';

describe('TransparentPolitics', function() {
  it('resolve play', function() {
    const card = new TransparentPolitics();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty = reds;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);

    card.resolve(game, turmoil);
    const removeDelegate = game.deferredActions.pop()!.execute() as OrOptions;
    removeDelegate.options[0].cb();
    expect(reds.delegates.find((p) => p === player.id)).is.undefined;
  });
});