import {expect} from 'chai';
import {CorridorsOfPower} from '../../../src/cards/preludeTwo/CorridorsOfPower';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestingUtils} from '../../TestingUtils';
import {PartyName} from '../../../src/turmoil/parties/PartyName';

describe('CorridorsOfPower', function() {
  let card : CorridorsOfPower; let player : Player; let player2 : Player; let game : Game; let turmoil : Turmoil;

  beforeEach(() => {
    card = new CorridorsOfPower();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);
    turmoil = Turmoil.getTurmoil(game);
  });

  it('Play', function() {
    card.play(player);
    expect(player.megaCredits).eq(4);
    expect(player.getTerraformRating()).eq(21);
  });

  it('Gives 1 card when player becomes party leader', function() {
    player.playedCards.push(card);

    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    reds.delegates = [];

    turmoil.sendDelegateToParty(player.id, PartyName.REDS, player.game);
    expect(player.cardsInHand).has.length(1);
  });
});
