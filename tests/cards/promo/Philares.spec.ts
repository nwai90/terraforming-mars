import {expect} from 'chai';
import {ISpace} from '../../../src/boards/ISpace';
import {Philares} from '../../../src/cards/promo/Philares';
import {MAX_TEMPERATURE, MAX_OXYGEN_LEVEL} from '../../../src/constants';
import {Game} from '../../../src/Game';
import {AndOptions} from '../../../src/inputs/AndOptions';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {Phase} from '../../../src/Phase';
import {SpaceType} from '../../../src/SpaceType';
import {TileType} from '../../../src/TileType';
import {Units} from '../../../src/Units';
import {EmptyBoard} from '../../ares/EmptyBoard';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayer} from '../../TestPlayer';
import {TestPlayers} from '../../TestPlayers';

describe('Philares', function() {
  let card : Philares;
  let philaresPlayer : TestPlayer;
  let otherPlayer: TestPlayer;
  let game: Game;
  let space: ISpace;
  let adjacentSpace: ISpace;
  let adjacentSpace2: ISpace;

  beforeEach(() => {
    card = new Philares();
    philaresPlayer = TestPlayers.BLUE.newPlayer();
    otherPlayer = TestPlayers.RED.newPlayer();

    // otherPlayer is first for the final placement test.
    game = Game.newInstance('foobar', [otherPlayer, philaresPlayer], otherPlayer);
    game.board = EmptyBoard.newInstance();
    space = game.board.spaces[4];
    adjacentSpace = game.board.getAdjacentSpaces(space)[0];
    adjacentSpace2 = game.board.getAdjacentSpaces(space)[2];

    philaresPlayer.corporationCard = card;
  });

  it('Should take initial action', function() {
    const action = card.initialAction(philaresPlayer);
    expect(action).is.not.undefined;

    action.cb(action.availableSpaces[0]);
    expect(philaresPlayer.getTerraformRating()).to.eq(21);
  });

  it('No bonus when placing next to self', () => {
    game.addTile(philaresPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    game.addTile(philaresPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(0);
  });

  it('Has bonus when placing next to opponent', () => {
    game.addTile(otherPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    game.addTile(philaresPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(1);
  });

  it('Has bonus when opponent places next to you', () => {
    game.addTile(philaresPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    game.addTile(otherPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(1);
  });

  it('Placing ocean tile does not grant bonus', () => {
    game.addTile(otherPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    adjacentSpace.spaceType = SpaceType.OCEAN; // Make this space an ocean space.
    game.addTile(philaresPlayer, SpaceType.OCEAN, adjacentSpace, {tileType: TileType.OCEAN});
    expect(game.deferredActions).has.length(0);
  });

  it('Placing next to ocean tile does not grant bonus', () => {
    space.spaceType = SpaceType.OCEAN; // Make this space an ocean space.
    game.addTile(otherPlayer, SpaceType.OCEAN, space, {tileType: TileType.OCEAN});
    game.addTile(philaresPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(0);
  });

  it('No adjacency bonus during WGT', () => {
    game.addTile(philaresPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(0);

    game.phase = Phase.SOLAR;
    game.addTile(otherPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(0);
  });

  it('One tile one bonus', () => {
    game.addTile(philaresPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    game.addTile(otherPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(1);

    const options = game.deferredActions.pop()!.execute() as AndOptions;
    // Options are ordered 0-5, MC to heat.
    expect(philaresPlayer.purse()).deep.eq(Units.EMPTY);
    options.options[0].cb(1);
    options.cb();
    expect(philaresPlayer.purse()).deep.eq(Units.of({megacredits: 1}));
  });

  it('One tile one bonus - player is greedy', () => {
    game.addTile(philaresPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    game.addTile(otherPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(1);

    const options = game.deferredActions.pop()!.execute() as AndOptions;
    // Options are ordered 0-5, MC to heat.
    expect(philaresPlayer.purse()).deep.eq(Units.EMPTY);
    options.options[0].cb(1);
    options.options[1].cb(1);
    expect(() => options.cb()).to.throw('Need to select 1 resource(s)');
  });

  it('Multiple bonuses when placing next to multiple opponent tiles', () => {
    game.addTile(otherPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    game.addTile(otherPlayer, SpaceType.LAND, adjacentSpace2, {tileType: TileType.GREENERY});
    game.addTile(philaresPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(1);

    const options = game.deferredActions.pop()!.execute() as AndOptions;
    // Options are ordered 0-5, MC to heat.
    expect(philaresPlayer.purse()).deep.eq(Units.EMPTY);
    options.options[0].cb(1);
    options.options[1].cb(1);
    options.cb();
    expect(philaresPlayer.purse()).deep.eq(Units.of({megacredits: 1, steel: 1}));
  });

  it('Multiple bonuses when opponent places next to multiple of your tiles', () => {
    game.addTile(philaresPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    game.addTile(philaresPlayer, SpaceType.LAND, adjacentSpace2, {tileType: TileType.GREENERY});
    game.addTile(otherPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(1);

    const options = game.deferredActions.pop()!.execute() as AndOptions;
    // Options are ordered 0-5, MC to heat.
    expect(philaresPlayer.purse()).deep.eq(Units.EMPTY);
    options.options[0].cb(1);
    options.options[1].cb(1);
    options.cb();
    expect(philaresPlayer.purse()).deep.eq(Units.of({megacredits: 1, steel: 1}));
  });

  it('Two tiles two bonuses - player is greedy', () => {
    game.addTile(otherPlayer, SpaceType.LAND, adjacentSpace, {tileType: TileType.GREENERY});
    game.addTile(otherPlayer, SpaceType.LAND, adjacentSpace2, {tileType: TileType.GREENERY});
    game.addTile(philaresPlayer, SpaceType.LAND, space, {tileType: TileType.GREENERY});
    expect(game.deferredActions).has.length(1);

    const options = game.deferredActions.pop()!.execute() as AndOptions;
    // Options are ordered 0-5, MC to heat.
    expect(philaresPlayer.purse()).deep.eq(Units.EMPTY);
    options.options[0].cb(1);
    options.options[1].cb(1);
    options.options[2].cb(1);
    expect(() => options.cb()).to.throw('Need to select 2 resource(s)');
  });

  it('Can place final greenery if gains enough plants from earlier players placing adjacent greeneries', function() {
    // Setup Philares with an existing greenery tile which otherPlayer will place its greenery adjacent to later
    game.addGreenery(philaresPlayer, space.id);

    // Max out all global parameters
    (game as any).temperature = MAX_TEMPERATURE;
    (game as any).oxygenLevel = MAX_OXYGEN_LEVEL;
    TestingUtils.maxOutOceans(philaresPlayer);

    // Setup plants for endgame
    philaresPlayer.plants = 7;
    otherPlayer.plants = 8;

    // First player final greenery placement, done adjacent to one of Philares' tiles
    game.gotoFinalGreeneryPlacement();
    const firstPlayerGreeneryPlacement = otherPlayer.getWaitingFor() as OrOptions;

    // Option 1 is 'Don't place a greenery'
    // Don't place a greenery using the callback; add it directly via game.addGreenery() instead
    // Workaround for test since the greenery placement option auto resolves deferred action
    firstPlayerGreeneryPlacement.options[1].cb();
    game.addGreenery(otherPlayer, adjacentSpace.id);
    expect(game.deferredActions).has.lengthOf(1);

    // Philares player gains plant and can subsequently place a greenery
    philaresPlayer.takeActionForFinalGreenery();
    const philaresPlayerResourceSelection = philaresPlayer.getWaitingFor() as AndOptions;

    // Option 3 is plants.
    philaresPlayerResourceSelection.options[3].cb(1);
    philaresPlayerResourceSelection.cb();
    expect(philaresPlayer.plants).to.eq(8);

    // Clear any existing waitingFor
    (philaresPlayer as any).waitingFor = undefined;
    (philaresPlayer as any).waitingForCb = undefined;
    game.gotoFinalGreeneryPlacement();

    // Philares player places final greenery, after which the game ends
    const finalGreeneryPlacement = philaresPlayer.getWaitingFor() as OrOptions;
    finalGreeneryPlacement.options[1].cb();
    expect(game.phase).eq(Phase.END);
  });
});
