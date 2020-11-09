import {expect} from 'chai';
import {PoliticalAlliance} from '../../../src/cards/turmoil/PoliticalAlliance';
import {Game, GameOptions} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {setCustomGameOptions, TestPlayers} from '../../TestingUtils';

describe('PoliticalAlliance', function() {
  let card : PoliticalAlliance; let player : Player; let game : Game; let turmoil: Turmoil;

  beforeEach(function() {
    card = new PoliticalAlliance();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
<<<<<<< HEAD
    const gameOptions = setCustomGameOptions();
    game = Game.newInstance('foobar', [player, redPlayer], player, gameOptions);
=======
    const gameOptions = setCustomGameOptions() as GameOptions;
    game = new Game('foobar', [player, redPlayer], player, gameOptions);
>>>>>>> Fix GTS issues
    turmoil = game.turmoil!;
  });

  it('Can\'t play', function() {
    const greens = turmoil.getPartyByName(PartyName.GREENS)!;
    greens.partyLeader = player.id;
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    const greens = turmoil.getPartyByName(PartyName.GREENS)!;
    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    greens.partyLeader = player.id;
    reds.partyLeader = player.id;
    expect(card.canPlay(player)).is.true;

    card.play(player);
    expect(player.getTerraformRating()).to.eq(21);
  });
});
