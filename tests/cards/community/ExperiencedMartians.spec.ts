import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {setCustomGameOptions, TestPlayers} from '../../TestingUtils';
import {Game, GameOptions} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {ExperiencedMartians} from '../../../src/cards/community/preludes/ExperiencedMartians';
import {Resources} from '../../../src/Resources';

describe('ExperiencedMartians', function() {
  let card : ExperiencedMartians; let player : Player; let game : Game;

  beforeEach(function() {
    card = new ExperiencedMartians();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();

    const gameOptions = setCustomGameOptions() as GameOptions;
    game = Game.newInstance('foobar', [player, redPlayer], player, gameOptions);
  });

  it('Should play', function() {
    card.play(player);
    expect(game.deferredActions).has.lengthOf(1);

    const orOptions = game.deferredActions.pop()!.execute() as OrOptions;
    orOptions.options[0].cb();
    game.deferredActions.peek();

    const turmoil = game.turmoil!;
    const marsFirst = turmoil.getPartyByName(PartyName.MARS)!;
    expect(marsFirst.delegates.filter((d) => d === player.id)).has.lengthOf(2);
    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    expect(player.getProduction(Resources.HEAT)).to.eq(1);
  });
});
