import {expect} from 'chai';
import {GenomeControl} from '../../../src/turmoil/globalEvents/society/GenomeControl';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {TestPlayers} from '../../TestingUtils';
import {VestaShipyard} from '../../../src/cards/base/VestaShipyard';
import {DustSeals} from '../../../src/cards/base/DustSeals';
import {SearchForLife} from '../../../src/cards/base/SearchForLife';
import {SelectCard} from '../../../src/inputs/SelectCard';

describe('GenomeControl', function() {
  it('resolve play', function() {
    const card = new GenomeControl();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const turmoil = Turmoil.newInstance(game);

    player.cardsInHand.push(new VestaShipyard(), new DustSeals(), new SearchForLife());

    card.resolve(game, turmoil);
    expect(game.deferredActions).has.lengthOf(1);
    expect(game.deferredActions.pop()!.execute() instanceof SelectCard).is.true;
  });
});