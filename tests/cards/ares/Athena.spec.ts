import {expect} from 'chai';
import {Athena} from '../../../src/cards/ares/Athena';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {_AresHazardPlacement} from '../../../src/ares/AresHazards';
import {ARES_OPTIONS_WITH_HAZARDS} from '../../ares/AresTestHelper';
import {SpaceType} from '../../../src/SpaceType';
import {TestPlayers} from '../../TestPlayers';
import {HAZARD_TILES} from '../../../src/TileType';

describe('Athena', function() {
  let card : Athena; let player : Player; let player2 : Player; let game : Game;

  beforeEach(function() {
    card = new Athena();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    game = Game.newInstance('foobar', [player, player2], player, ARES_OPTIONS_WITH_HAZARDS);

    card.play(player);
    player.corporationCard = card;
  });

  it('Correctly sets property', function() {
    expect(game.athenaOwner).to.eq(player.id);
  });

  it('Initial action', function() {
    card.initialAction(player);
    expect(game.deferredActions).has.lengthOf(2);
  });

  it('Can place next to hazard tiles without incurring production loss', function() {
    const hazardSpace = game.board.spaces.find((space) => space.tile && HAZARD_TILES.has(space.tile.tileType))!;
    const adjacentEmptySpace = game.board.getAdjacentSpaces(hazardSpace).find((space) => space.tile === undefined && space.spaceType === SpaceType.LAND)!;
    game.addGreenery(player, adjacentEmptySpace.id);
    expect(game.deferredActions).has.lengthOf(0);
  });
});
