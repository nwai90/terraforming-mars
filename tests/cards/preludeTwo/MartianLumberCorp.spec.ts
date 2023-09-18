import {expect} from 'chai';
import {MartianLumberCorp} from '../../../src/cards/preludeTwo/MartianLumberCorp';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';

describe('MartianLumberCorp', function() {
  let card : MartianLumberCorp; let player : Player; let game: Game;

  beforeEach(() => {
    card = new MartianLumberCorp();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('foobar', [player], player);
  });

  it('canPlay', function() {
    expect(card.canPlay(player)).is.false;

    game.addGreenery(player, game.board.getAvailableSpacesForGreenery(player)[0].id);
    expect(card.canPlay(player)).is.false;

    game.addGreenery(player, game.board.getAvailableSpacesForGreenery(player)[0].id);
    expect(card.canPlay(player)).is.true;
  });

  it('Play', function() {
    card.play(player);
    expect(player.getProduction(Resources.PLANTS)).eq(1);
  });
});
