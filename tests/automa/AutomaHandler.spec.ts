import {expect} from 'chai';
import {Player} from '../../src/Player';
import {Game} from '../../src/Game';
import {TestPlayers} from '../TestPlayers';
import {TestingUtils} from '../TestingUtils';
import {AutomaHandler} from '../../src/automa/AutomaHandler';
import {MAX_OCEAN_TILES_AUTOMA, MAX_OXYGEN_LEVEL, MAX_VENUS_SCALE, MILESTONE_VP, SOLO_START_TR_AUTOMA} from '../../src/constants';
import {TileType} from '../../src/TileType';
import {EmptyBoard} from '../ares/EmptyBoard';
import {BoardName} from '../../src/boards/BoardName';
import {Tags} from '../../src/cards/Tags';
import {SaturnSystems} from '../../src/cards/corporation/SaturnSystems';
import {Resources} from '../../src/Resources';
import {TharsisBot} from '../../src/cards/automa/TharsisBot';
import {Callisto} from '../../src/colonies/Callisto';
import {Ceres} from '../../src/colonies/Ceres';
import {Miranda} from '../../src/colonies/Miranda';
import {SelectCard} from '../../src/inputs/SelectCard';
import {IProjectCard} from '../../src/cards/IProjectCard';
import {TestPlayer} from '../TestPlayer';

describe('AutomaHandler: Initial setup', function() {
  let player : Player; let game : Game;

  beforeEach(() => {
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({automaSoloVariant: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
  });

  it('Correct starting TR', function() {
    expect(player.getTerraformRating()).eq(SOLO_START_TR_AUTOMA);
    expect(game.automaBotVictoryPointsBreakdown.terraformRating).greaterThanOrEqual(SOLO_START_TR_AUTOMA);
  });

  it('Places initial ocean', function() {
    // Tharsis map
    AutomaHandler.placeInitialOcean(player, game);
    expect(game.board.getSpace('13').tile!.tileType).to.eq(TileType.OCEAN);

    // Hellas map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.HELLAS}));
    AutomaHandler.placeInitialOcean(player, game);
    expect(game.board.getSpace('03').tile!.tileType).to.eq(TileType.OCEAN);

    // Elysium map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.ELYSIUM}));
    AutomaHandler.placeInitialOcean(player, game);
    expect(game.board.getSpace('32').tile!.tileType).to.eq(TileType.OCEAN);

    // Amazonis Planitia map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.AMAZONIS}));
    AutomaHandler.placeInitialOcean(player, game);
    expect(game.board.getSpace('12').tile!.tileType).to.eq(TileType.OCEAN);

    // Arabia Terra map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.ARABIA_TERRA}));
    AutomaHandler.placeInitialOcean(player, game);
    expect(game.board.getSpace('07').tile!.tileType).to.eq(TileType.OCEAN);

    // Terra Cimmeria map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.TERRA_CIMMERIA}));
    AutomaHandler.placeInitialOcean(player, game);
    expect(game.board.getSpace('61').tile!.tileType).to.eq(TileType.OCEAN);

    // Vastitas Borealis map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.VASTITAS_BOREALIS}));
    AutomaHandler.placeInitialOcean(player, game);
    expect(game.board.getSpace('19').tile!.tileType).to.eq(TileType.OCEAN);

    // Utopia Planitia map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.UTOPIA_PLANITIA}));
    AutomaHandler.placeInitialOcean(player, game);
    expect(game.board.getSpace('14').tile!.tileType).to.eq(TileType.OCEAN);
  });

  it('Places initial greenery', function() {
    // Hellas map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.HELLAS}));
    AutomaHandler.placeInitialGreenery(game);
    expect(game.board.getSpace('61').tile!.tileType).to.eq(TileType.GREENERY);

    // Elysium map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.ELYSIUM}));
    AutomaHandler.placeInitialGreenery(game);
    expect(game.board.getSpace('20').tile!.tileType).to.eq(TileType.GREENERY);

    // Amazonis Planitia map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.AMAZONIS}));
    AutomaHandler.placeInitialGreenery(game);
    expect(game.board.getSpace('05').tile!.tileType).to.eq(TileType.GREENERY);

    // Arabia Terra map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.ARABIA_TERRA}));
    AutomaHandler.placeInitialGreenery(game);
    expect(game.board.getSpace('48').tile!.tileType).to.eq(TileType.GREENERY);

    // Terra Cimmeria map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.TERRA_CIMMERIA}));
    AutomaHandler.placeInitialGreenery(game);
    expect(game.board.getSpace('38').tile!.tileType).to.eq(TileType.GREENERY);

    // Vastitas Borealis map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.VASTITAS_BOREALIS}));
    AutomaHandler.placeInitialGreenery(game);
    expect(game.board.getSpace('33').tile!.tileType).to.eq(TileType.GREENERY);

    // Utopia Planitia map
    game.board = EmptyBoard.newInstance();
    game = Game.newInstance('x', [player], player, TestingUtils.setCustomGameOptions({automaSoloVariant: true, boardName: BoardName.UTOPIA_PLANITIA}));
    AutomaHandler.placeInitialGreenery(game);
    expect(game.board.getSpace('19').tile!.tileType).to.eq(TileType.GREENERY);
  });
});

describe('AutomaHandler: Global parameter adjustments', function() {
  let player : Player; let game : Game;

  beforeEach(() => {
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({automaSoloVariant: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
  });

  it('Sets temperature correctly after decrease', function() {
    game.setTemperature(-22);
    AutomaHandler.decreaseTemperature(game, -1);
    expect(game.getTemperature()).to.eq(-28);

    game.setTemperature(-20);
    AutomaHandler.decreaseTemperature(game, -2);
    expect(game.getTemperature()).to.eq(-28);

    game.setTemperature(-12);
    AutomaHandler.decreaseTemperature(game, -1);
    expect(game.getTemperature()).to.eq(-16);

    game.setTemperature(-8);
    AutomaHandler.decreaseTemperature(game, -2);
    expect(game.getTemperature()).to.eq(-16);
  });

  it('Sets temperature correctly after increase', function() {
    game.setTemperature(-28);
    AutomaHandler.increaseTemperature(game, 1);
    expect(game.getTemperature()).to.eq(-22);

    game.setTemperature(-30);
    AutomaHandler.increaseTemperature(game, 2);
    expect(game.getTemperature()).to.eq(-22);

    game.setTemperature(-16);
    AutomaHandler.increaseTemperature(game, 1);
    expect(game.getTemperature()).to.eq(-12);

    game.setTemperature(-16);
    AutomaHandler.increaseTemperature(game, 2);
    expect(game.getTemperature()).to.eq(-8);
  });

  it('Sets Venus scale correctly after decrease', function() {
    game.setVenusScaleLevel(24);
    AutomaHandler.decreaseVenusScale(game, -1);
    expect(game.getVenusScaleLevel()).to.eq(20);

    game.setVenusScaleLevel(24);
    AutomaHandler.decreaseVenusScale(game, -2);
    expect(game.getVenusScaleLevel()).to.eq(16);

    // Cannot decrease parameter if Venus is maxed
    game.setVenusScaleLevel(MAX_VENUS_SCALE);
    game.increaseVenusScaleLevel(player, -1);
    expect(game.getVenusScaleLevel()).to.eq(MAX_VENUS_SCALE);
    game.increaseVenusScaleLevel(player, -2);
    expect(game.getVenusScaleLevel()).to.eq(MAX_VENUS_SCALE);
  });

  it('Sets Venus scale correctly after increase', function() {
    game.setVenusScaleLevel(24);
    AutomaHandler.increaseVenusScale(game, 1);
    expect(game.getVenusScaleLevel()).to.eq(MAX_VENUS_SCALE);

    game.setVenusScaleLevel(20);
    AutomaHandler.increaseVenusScale(game, 2);
    expect(game.getVenusScaleLevel()).to.eq(MAX_VENUS_SCALE);

    game.setVenusScaleLevel(4);
    AutomaHandler.increaseVenusScale(game, 3);
    expect(game.getVenusScaleLevel()).to.eq(16);
  });

  it('Sets oxygen level correctly after decrease', function() {
    game.setOxygenLevel(6);
    AutomaHandler.decreaseOxygenLevel(game, -1);
    expect(game.getOxygenLevel()).to.eq(4);

    game.setOxygenLevel(6);
    AutomaHandler.decreaseOxygenLevel(game, -2);
    expect(game.getOxygenLevel()).to.eq(2);

    // Cannot decrease parameter if oxygen is maxed
    game.setOxygenLevel(MAX_OXYGEN_LEVEL);
    game.increaseOxygenLevel(player, -1);
    expect(game.getOxygenLevel()).to.eq(MAX_OXYGEN_LEVEL);
  });

  it('Sets oxygen level correctly after increase', function() {
    game.setOxygenLevel(6);
    AutomaHandler.increaseOxygenLevel(game, 1);
    expect(game.getOxygenLevel()).to.eq(8);

    AutomaHandler.increaseOxygenLevel(game, 2);
    expect(game.getOxygenLevel()).to.eq(12);
  });
});

describe('AutomaHandler: Milestones', function() {
  let player : Player; let game : Game;

  beforeEach(() => {
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({automaSoloVariant: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
  });

  it('Player can claim milestones for free', function() {
    player.megaCredits = 7;
    player.setTerraformRating(35); // Can claim Terraformer milestone

    const claimMilestoneAction = player.getActions().options.find((option) => option.title == "Claim a milestone");
    expect(claimMilestoneAction).is.not.undefined;

    claimMilestoneAction!.options![0].cb();
    game.deferredActions.runAll(() => {});
    const claimedMilestones = player.game.claimedMilestones;
    expect(player.megaCredits).eq(7); // No M€ cost incurred
    expect(claimedMilestones.find((cm) => cm.milestone.name === 'Terraformer' && cm.player === player)).is.not.undefined;
  });

  it('Bot scores unclaimed milestones', function() {
    player.setTerraformRating(35); // Can claim Terraformer milestone

    const claimMilestoneAction = player.getActions().options.find((option) => option.title == "Claim a milestone");
    claimMilestoneAction!.options![0].cb();
    game.deferredActions.runAll(() => {});
    expect(game.claimedMilestones).has.length(1);

    const initialBotScore = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.scoreUnclaimedMilestones(game);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialBotScore + 5 * MILESTONE_VP);
  });
});

describe('AutomaHandler: performActionForTag', function() {
  let player : Player; let game : Game;

  beforeEach(() => {
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({automaSoloVariant: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
  });

  it('Science tag: Raises temperature', function() {
    const initialTR = game.automaBotVictoryPointsBreakdown.terraformRating;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.SCIENCE);

    expect(game.automaBotVictoryPointsBreakdown.terraformRating).to.eq(initialTR + 1);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialTotal + 1);
    expect(game.getTemperature()).to.eq(-28);
  });

  it('Power tag: Raises temperature', function() {
    // Any corp will do here for testing purposes, as long as it's not Thorgate Bot
    game.automaBotCorporation = new TharsisBot();

    const initialTR = game.automaBotVictoryPointsBreakdown.terraformRating;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.ENERGY);

    expect(game.automaBotVictoryPointsBreakdown.terraformRating).to.eq(initialTR + 1);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialTotal + 1);
    expect(game.getTemperature()).to.eq(-28);
  });

  it('Works with 0 degrees bonus ocean', function() {
    game.setTemperature(-4);
    const initialTR = game.automaBotVictoryPointsBreakdown.terraformRating;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.SCIENCE);

    expect(game.automaBotVictoryPointsBreakdown.terraformRating).to.eq(initialTR + 2);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialTotal + 2);
    expect(game.board.getOceansOnBoard()).to.eq(2); // including the initial ocean
  });

  it('Building tag: Raises TR', function() {
    const initialTR = game.automaBotVictoryPointsBreakdown.terraformRating;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.BUILDING);

    expect(game.automaBotVictoryPointsBreakdown.terraformRating).to.eq(initialTR + 1);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialTotal + 1);
  });

  it('Venus tag: Raises Venus scale', function() {
    const initialTR = game.automaBotVictoryPointsBreakdown.terraformRating;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.VENUS);

    expect(game.automaBotVictoryPointsBreakdown.terraformRating).to.eq(initialTR + 1);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialTotal + 1);
    expect(game.getVenusScaleLevel()).to.eq(4);
  });

  it('Earth tag: Places ocean', function() {
    const initialTR = game.automaBotVictoryPointsBreakdown.terraformRating;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.EARTH);

    expect(game.automaBotVictoryPointsBreakdown.terraformRating).to.eq(initialTR + 1);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialTotal + 1);
    expect(game.board.getOceansOnBoard()).to.eq(2); // including the initial ocean
  });

  it('Earth tag: Does not place ocean when oceans are maxed', function() {
    const initialTR = game.automaBotVictoryPointsBreakdown.terraformRating;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;

    TestingUtils.maxOutOceans(player);
    expect(game.board.getOceansOnBoard()).to.eq(MAX_OCEAN_TILES_AUTOMA);

    AutomaHandler.performActionForTag(game, Tags.EARTH);
    expect(game.automaBotVictoryPointsBreakdown.terraformRating).to.eq(initialTR + 1);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialTotal + 1);
    expect(game.board.getOceansOnBoard()).to.eq(MAX_OCEAN_TILES_AUTOMA);
  });

  it('Space tag: Places city', function() {
    const initialCityVP = game.automaBotVictoryPointsBreakdown.city;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.SPACE);

    expect(game.automaBotVictoryPointsBreakdown.city).greaterThan(initialCityVP);
    expect(game.automaBotVictoryPointsBreakdown.total).greaterThan(initialTotal);
    // Possibly a 2nd city from Tharsis bot initial action
    expect(game.getCitiesInPlayOnMars()).greaterThanOrEqual(1);
  });

  it('City tag: Places city', function() {
    const initialCityVP = game.automaBotVictoryPointsBreakdown.city;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.CITY);

    expect(game.automaBotVictoryPointsBreakdown.city).greaterThan(initialCityVP);
    expect(game.automaBotVictoryPointsBreakdown.total).greaterThan(initialTotal);
    // Possibly a 2nd city from Tharsis bot initial action
    expect(game.getCitiesInPlayOnMars()).greaterThanOrEqual(1);
  });

  it('Event tag: Takes corp action', function() {
    game.automaBotCorporation = new TharsisBot();
    const initialCitiesCount = game.getCitiesInPlayOnMars();

    AutomaHandler.performActionForTag(game, Tags.EVENT);
    expect(game.getCitiesInPlayOnMars()).to.eq(initialCitiesCount + 1);
  });

  it('Jovian tag: Takes corp action', function() {
    game.automaBotCorporation = new TharsisBot();
    const initialCitiesCount = game.getCitiesInPlayOnMars();

    AutomaHandler.performActionForTag(game, Tags.JOVIAN);
    expect(game.getCitiesInPlayOnMars()).to.eq(initialCitiesCount + 1);
  });

  it('Wild tag: Takes corp action', function() {
    game.automaBotCorporation = new TharsisBot();
    const initialCitiesCount = game.getCitiesInPlayOnMars();

    AutomaHandler.performActionForTag(game, Tags.WILDCARD);
    expect(game.getCitiesInPlayOnMars()).to.eq(initialCitiesCount + 1);
  });

  it('Jovian tag: If player is Saturn Systems, gain 1 M€ production', function() {
    const saturn = new SaturnSystems();
    player.corporationCards.push(saturn);

    const initialMegacreditProduction = player.getProduction(Resources.MEGACREDITS);
    AutomaHandler.performActionForTag(game, Tags.JOVIAN);
    game.deferredActions.runAll(() => {});
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(initialMegacreditProduction + 1);
  });

  it('Moon tag: Raises lowest Moon rate', function() {
    const gameOptions = TestingUtils.setCustomGameOptions({automaSoloVariant: true, moonExpansion: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);

    const initialTR = game.automaBotVictoryPointsBreakdown.terraformRating;
    const initialTotal = game.automaBotVictoryPointsBreakdown.total;
    AutomaHandler.performActionForTag(game, Tags.MOON);

    expect(game.automaBotVictoryPointsBreakdown.terraformRating).to.eq(initialTR + 1);
    expect(game.automaBotVictoryPointsBreakdown.total).to.eq(initialTotal + 1);
    expect(game.moonData?.colonyRate).to.eq(2);
  });
});

describe('AutomaHandler: getBotTagCount', function() {
  let player : Player; let game : Game;

  beforeEach(() => {
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({automaSoloVariant: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
  });

  it('Counts bot tags correctly', function() {
    game.generation = 1;
    expect(AutomaHandler.getBotTagCount(game)).to.eq(2);

    game.generation = 3;
    expect(AutomaHandler.getBotTagCount(game)).to.eq(3);

    game.generation = 4;
    expect(AutomaHandler.getBotTagCount(game)).to.eq(3);
  });
});

describe('AutomaHandler: performBotTrade', function() {
  let player : Player; let game : Game;

  beforeEach(() => {
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({automaSoloVariant: true, coloniesExtension: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
    game.colonies = [new Callisto(), new Ceres(), new Miranda()];
  });

  it('Bot trades with colony at generation end', function() {
    // Build a colony on Callisto
    game.colonies[0].colonies.push(player.id);

    TestingUtils.forceGenerationEnd(game);
    expect(player.energy).to.eq(3);
    expect(game.colonies[0].visitor).is.not.undefined;
  });
});

describe('AutomaHandler: conductDraftPhase', function() {
  let player : TestPlayer; let game : Game;

  beforeEach(() => {
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({automaSoloVariant: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
  });

  it('Drafts 4 packs of 3 cards each', function() {
    AutomaHandler.conductDraftPhase(game);
    // We should have 3 more draft rounds in addition to our waitingFor
    expect(game.deferredActions).has.length(3);

    for (let i = 0; i < 3; i++) {
      game.deferredActions.runNext();
    }

    const selectCard = player.popWaitingFor() as SelectCard<IProjectCard>;
    selectCard.cb([selectCard.cards[0]]);
    game.deferredActions.runNext(); // SelectHowToPay
    expect(player.cardsInHand).has.length(1);
  });
});