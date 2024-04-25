import {expect} from 'chai';
import {RedAppeasement} from '../../../src/cards/preludeTwo/RedAppeasement';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {Resources} from '../../../src/Resources';

describe('RedAppeasement', function() {
  let card : RedAppeasement; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new RedAppeasement();
    
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
  });

  it('canPlay', function() {
    expect(card.canPlay(player)).is.false;

    const turmoil = Turmoil.getTurmoil(game);
    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    const greens = turmoil.getPartyByName(PartyName.GREENS)!;

    turmoil.rulingParty = reds;
    expect(card.canPlay(player)).is.true;

    turmoil.rulingParty = greens;
    reds.delegates.push(player.id, player.id);
    expect(card.canPlay(player)).is.true;

    player2.pass();
    expect(card.canPlay(player)).is.false;
  });

  it('Play', function() {
    card.play(player);
    expect(player.getProduction(Resources.MEGACREDITS)).eq(2);

    const passedPlayers = game.getPassedPlayers();
    expect(passedPlayers.includes (player.color));
  });
});
