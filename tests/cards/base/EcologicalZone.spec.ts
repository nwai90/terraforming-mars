import {expect} from 'chai';
import {EcologicalZone} from '../../../src/cards/base/EcologicalZone';
import {EcologyExperts} from '../../../src/cards/prelude/EcologyExperts';
import {Game} from '../../../src/Game';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {Phase} from '../../../src/Phase';
import {Player} from '../../../src/Player';
import {TileType} from '../../../src/TileType';
import {TestPlayers} from '../../TestPlayers';

describe('EcologicalZone', function() {
  let card : EcologicalZone; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new EcologicalZone();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Cannot play', function() {
    expect(card.canPlay(player)).is.false;
  });

  it('Should play', function() {
    player.playedCards.push(card);

    const landSpace = game.board.getAvailableSpacesOnLand(player)[0];
    game.addGreenery(player, landSpace.id);
    expect(card.canPlay(player)).is.true;

    const action = card.play(player);
    expect(action).instanceOf(SelectSpace);

    const adjacentSpace = action.availableSpaces[0];
    action.cb(adjacentSpace);
    expect(adjacentSpace.tile && adjacentSpace.tile.tileType).eq(TileType.ECOLOGICAL_ZONE);

    card.onCardPlayed(player, card);
    expect(card.resourceCount).eq(2);
    expect(card.getVictoryPoints()).eq(1);
    expect(adjacentSpace.adjacency?.bonus).eq(undefined);

    card.onCardPlayed(player2, card);
    expect(card.resourceCount).eq(2);
  });

  it('Should get triggered by EcoExperts if played together', function() {
    game.phase = Phase.PRELUDES;

    const landSpace = game.board.getAvailableSpacesOnLand(player)[0];
    game.addGreenery(player, landSpace.id);

    const ecoExpertCard = new EcologyExperts();
    player.playCard(ecoExpertCard);
    expect(card.canPlay(player)).is.true;

    player.playCard(card);
    expect(card.resourceCount).eq(3);
  });
});

