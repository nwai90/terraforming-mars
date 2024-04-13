import {expect} from 'chai';
import {ColonialEnvoys} from '../../../src/cards/preludeTwo/ColonialEnvoys';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {SelectPartyToSendDelegate} from '../../../src/inputs/SelectPartyToSendDelegate';

describe('ColonialEnvoys', function() {
  let card : ColonialEnvoys; let player : Player; let game : Game; let turmoil: Turmoil;

  beforeEach(() => {
    card = new ColonialEnvoys();
    player = TestPlayers.BLUE.newPlayer();
    
    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true, turmoilExtension: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
    game.colonies.forEach((colony) => colony.colonies.push(player.id));
    
    turmoil = Turmoil.getTurmoil(game);
  });

  it('canPlay: has enough delegates', function() {
    const unity = turmoil.getPartyByName(PartyName.UNITY)!;
    turmoil.rulingParty = unity;
    turmoil.setRulingParty(game);

    expect(card.canPlay(player)).is.true;
  });

  it('canPlay: not enough delegates', function() {
    turmoil.delegateReserve = [];
    expect(card.canPlay(player)).is.false;
  });

  it('Play', function() {
    card.play(player);

    while (game.deferredActions.length) {
      const selectParty = game.deferredActions.pop()!.execute() as SelectPartyToSendDelegate;
      if (selectParty !== undefined) {
        selectParty.cb(PartyName.MARS);
      }
    }

    const marsFirst = turmoil.getPartyByName(PartyName.MARS)!;
    const expectedDelegatesCount = game.colonies.length;
    expect(marsFirst.delegates.filter((d) => d === player.id)).has.lengthOf(expectedDelegatesCount);
  });
});
