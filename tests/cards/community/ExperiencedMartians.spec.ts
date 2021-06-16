import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';
import {Game, GameOptions} from '../../../src/Game';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {ExperiencedMartians} from '../../../src/cards/community/preludes/ExperiencedMartians';
import {Resources} from '../../../src/Resources';
import {SelectPartyToSendDelegate} from '../../../src/inputs/SelectPartyToSendDelegate';

describe('ExperiencedMartians', function() {
  let card : ExperiencedMartians; let player : Player; let game : Game;

  beforeEach(() => {
    card = new ExperiencedMartians();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions() as GameOptions;
    game = Game.newInstance('foobar', [player, redPlayer], player, gameOptions);
  });

  it('Should play', function() {
    card.play(player);
    expect(game.deferredActions).has.lengthOf(1);

    const selectParty = game.deferredActions.pop()!.execute() as SelectPartyToSendDelegate;
    selectParty.cb(PartyName.MARS);
    game.deferredActions.peek();

    const turmoil = game.turmoil!;
    const marsFirst = turmoil.getPartyByName(PartyName.MARS)!;
    expect(marsFirst.delegates.filter((d) => d === player.id)).has.lengthOf(2);
    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    expect(player.getProduction(Resources.HEAT)).to.eq(1);
  });
});
