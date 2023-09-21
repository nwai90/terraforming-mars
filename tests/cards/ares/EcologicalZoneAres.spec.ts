import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TileType} from '../../../src/TileType';
import {SpaceBonus} from '../../../src/SpaceBonus';
import {EcologicalZoneAres} from '../../../src/cards/ares/EcologicalZoneAres';
import {ARES_OPTIONS_NO_HAZARDS} from '../../ares/AresTestHelper';
import {TestPlayers} from '../../TestPlayers';

describe('EcologicalZoneAres', function() {
  let card : EcologicalZoneAres; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new EcologicalZoneAres();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player, ARES_OPTIONS_NO_HAZARDS);
    player.playedCards.push(card);
  });

  it('Should play', function() {
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
    expect(adjacentSpace.adjacency).to.deep.eq({bonus: [SpaceBonus.ANIMAL]});

    card.onCardPlayed(player2, card);
    expect(card.resourceCount).eq(2);
  });
});

