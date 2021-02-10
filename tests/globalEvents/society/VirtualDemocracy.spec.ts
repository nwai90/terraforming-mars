import {expect} from 'chai';
import {VirtualDemocracy} from '../../../src/turmoil/globalEvents/society/VirtualDemocracy';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {OrOptions} from '../../../src/inputs/OrOptions';

describe('VirtualDemocracy', function() {
  it('resolve play', function() {
    const card = new VirtualDemocracy();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    turmoil.dominantParty.delegates.push(player.id);
    
    game.addCityTile(player, '03');
    game.addCityTile(player, '20');

    card.resolve(game, turmoil);
    expect(game.deferredActions).has.lengthOf(2);

    while (game.deferredActions.length > 0) {
      const orOptions = game.deferredActions.peek()!.execute() as OrOptions;
      orOptions.options[0].cb();
      game.deferredActions.pop();
    }

    const marsFirst = turmoil.getPartyByName(PartyName.MARS)!;
    expect(marsFirst.delegates.filter((d) => d === player.id)).has.lengthOf(2);
  });
});