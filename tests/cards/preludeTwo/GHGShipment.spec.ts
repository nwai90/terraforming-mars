import {expect} from 'chai';
import {GHGShipment} from '../../../src/cards/preludeTwo/GHGShipment';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {Resources} from '../../../src/Resources';
import {Dirigibles} from '../../../src/cards/venusNext/Dirigibles';

describe('GHGShipment', function() {
  let card : GHGShipment; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new GHGShipment();
    
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
  });

  it('canPlay', function() {
    expect(card.canPlay(player)).is.false;

    const turmoil = Turmoil.getTurmoil(game);
    const kelvinists = turmoil.getPartyByName(PartyName.KELVINISTS)!;
    const greens = turmoil.getPartyByName(PartyName.GREENS)!;

    turmoil.rulingParty = kelvinists;
    expect(card.canPlay(player)).is.true;

    turmoil.rulingParty = greens;
    expect(card.canPlay(player)).is.false;

    kelvinists.delegates.push(player.id, player.id);
    expect(card.canPlay(player)).is.true;
  });

  it('Play', function() {
    const dirigibles = new Dirigibles();
    dirigibles.resourceCount = 3;
    player.playedCards.push(dirigibles);

    card.play(player);
    expect(player.getProduction(Resources.HEAT)).eq(1);
    expect(player.heat).eq(3);
  });
});
