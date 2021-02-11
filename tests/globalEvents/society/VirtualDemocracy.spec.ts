import {expect} from 'chai';
import {VirtualDemocracy} from '../../../src/turmoil/globalEvents/society/VirtualDemocracy';
import {Game} from '../../../src/Game';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {setCustomGameOptions, TestPlayers} from '../../TestingUtils';
import {OrOptions} from '../../../src/inputs/OrOptions';

describe('VirtualDemocracy', function() {
  it('resolve play', function() {
    const card = new VirtualDemocracy();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player, setCustomGameOptions({turmoilExtension: true}));
    const turmoil = game.turmoil!

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    turmoil.dominantParty.delegates.push(player.id);
    
    game.addCityTile(player, '05');
    game.addCityTile(player, '21');

    card.resolve(game, turmoil);
    expect(game.deferredActions).has.lengthOf(3);

    while (game.deferredActions.length > 0) {
      const orOptions = game.deferredActions.pop()!.execute() as OrOptions;
      orOptions.options[0].cb();
    }

    const marsFirst = turmoil.getPartyByName(PartyName.MARS)!;
    expect(marsFirst.delegates.filter((d) => d === player.id)).has.lengthOf(3);
  });
});