import {CardModel} from './CardModel';
import {ColonyModel} from './ColonyModel';
import {Color} from '../Color';
import {Game, GameOptions} from '../Game';
import {GameHomeModel} from './GameHomeModel';
import {GameOptionsModel} from './GameOptionsModel';
import {ICard} from '../cards/ICard';
import {IProjectCard} from '../cards/IProjectCard';
import {Board} from '../boards/Board';
import {ISpace} from '../boards/ISpace';
import {Player} from '../Player';
import {PlayerInput} from '../PlayerInput';
import {PlayerInputModel} from './PlayerInputModel';
import {PlayerInputTypes} from '../PlayerInputTypes';
import {PlayerModel} from './PlayerModel';
import {SelectAmount} from '../inputs/SelectAmount';
import {SelectCard} from '../inputs/SelectCard';
import {SelectHowToPay} from '../inputs/SelectHowToPay';
import {SelectHowToPayForProjectCard} from '../inputs/SelectHowToPayForProjectCard';
import {SelectPlayer} from '../inputs/SelectPlayer';
import {SelectSpace} from '../inputs/SelectSpace';
import {SpaceHighlight, SpaceModel} from './SpaceModel';
import {TileType} from '../TileType';
import {Phase} from '../Phase';
import {Resources} from '../Resources';
import {CardType} from '../cards/CardType';
import {
  ClaimedMilestoneModel,
  IMilestoneScore,
} from './ClaimedMilestoneModel';
import {FundedAwardModel, IAwardScore} from './FundedAwardModel';
import {
  getTurmoil,
} from './TurmoilModel';
import {SelectDelegate} from '../inputs/SelectDelegate';
import {SelectColony} from '../inputs/SelectColony';
import {SelectProductionToLose} from '../inputs/SelectProductionToLose';
import {ShiftAresGlobalParameters} from '../inputs/ShiftAresGlobalParameters';
import {SpectatorModel} from './SpectatorModel';
import {MoonModel} from './MoonModel';
import {Units} from '../Units';
import {SelectPartyToSendDelegate} from '../inputs/SelectPartyToSendDelegate';

export class Server {
  public static getGameModel(game: Game): GameHomeModel {
    return {
      activePlayer: game.getPlayerById(game.activePlayer).color,
      id: game.id,
      phase: game.phase,
      players: game.getPlayers().map((player) => ({
        color: player.color,
        id: player.id,
        name: player.name,
      })),
      gameOptions: getGameOptionsAsModel(game.gameOptions),
      lastSoloGeneration: game.lastSoloGeneration(),
      spectatorId: game.spectatorId,
    };
  }

  public static getPlayerModel(player: Player): PlayerModel {
    const game = player.game;
    const turmoil = getTurmoil(game);

    return {
      actionsTakenThisRound: player.actionsTakenThisRound,
      actionsTakenThisGame: player.actionsTakenThisGame,
      actionsThisGeneration: Array.from(player.getActionsThisGeneration()),
      aresData: game.aresData,
      availableBlueCardActionCount: player.getAvailableBlueActionCount(),
      awards: getAwards(game),
      cardCost: player.cardCost,
      cardsInHand: getCards(player, player.cardsInHand, {showNewCost: true}),
      cardsInHandNbr: player.cardsInHand.length,
      citiesCount: player.getCitiesCount(),
      colonies: getColonies(game),
      coloniesCount: player.getColoniesCount(),
      color: player.color,
      corporationCard: getCorporationCard(player),
      dealtCorporationCards: getCards(player, player.dealtCorporationCards),
      dealtPreludeCards: getCards(player, player.dealtPreludeCards),
      dealtProjectCards: getCards(player, player.dealtProjectCards),
      deckSize: game.dealer.getDeckSize(),
      draftedCards: getCards(player, player.draftedCards, {showNewCost: true}),
      draftedPlayers: game.getDraftedPlayers(),
      endGenerationScores: player.endGenerationScores,
      energy: player.energy,
      energyProduction: player.getProduction(Resources.ENERGY),
      fleetSize: player.getFleetSize(),
      gameAge: game.gameAge,
      gameOptions: getGameOptionsAsModel(game.gameOptions),
      generation: game.getGeneration(),
      heat: player.heat,
      heatProduction: player.getProduction(Resources.HEAT),
      id: player.id,
      influence: turmoil ? game.turmoil!.getPlayerInfluence(player) : 0,
      isActive: player.id === game.activePlayer,
      isSoloModeWin: game.isSoloModeWin(),
      lastSoloGeneration: game.lastSoloGeneration(),
      marsIsTerraformed: game.marsIsTerraformed(),
      megaCredits: player.megaCredits,
      megaCreditProduction: player.getProduction(Resources.MEGACREDITS),
      milestones: getMilestones(game),
      moon: MoonModel.serialize(game),
      name: player.name,
      needsToDraft: player.needsToDraft,
      noTagsCount: player.getNoTagsCount(),
      oceans: game.board.getOceansOnBoard(),
      oxygenLevel: game.getOxygenLevel(),
      passedPlayers: game.getPassedPlayers(),
      phase: game.phase,
      pickedCorporationCard: player.pickedCorporationCard ? getCards(player, [player.pickedCorporationCard]) : [],
      plants: player.plants,
      plantProduction: player.getProduction(Resources.PLANTS),
      plantsAreProtected: player.plantsAreProtected(),
      plantsNeededForGreenery: player.plantsNeededForGreenery,
      playedCards: getCards(player, player.playedCards, {showResources: true}),
      players: getPlayers(game.getPlayers(), game),
      preludeCardsInHand: getCards(player, player.preludeCardsInHand),
      remainingStallActionsCount: player.remainingStallActionsCount,
      researchedPlayers: game.getResearchedPlayers(),
      selfReplicatingRobotsCards: getSelfReplicatingRobotsTargetCards(player),
      spaces: getSpaces(game.board),
      spectatorId: game.spectatorId,
      steel: player.steel,
      steelProduction: player.getProduction(Resources.STEEL),
      steelValue: player.getSteelValue(),
      tags: player.getAllTags(),
      temperature: game.getTemperature(),
      terraformRating: player.getTerraformRating(),
      timer: player.timer.serialize(),
      titanium: player.titanium,
      titaniumProduction: player.getProduction(Resources.TITANIUM),
      titaniumValue: player.getTitaniumValue(),
      totalSpend: player.totalSpend,
      tradesThisGeneration: player.tradesThisGeneration,
      turmoil: turmoil,
      undoCount: game.undoCount,
      venusScaleLevel: game.getVenusScaleLevel(),
      victoryPointsBreakdown: player.getVictoryPoints(),
      waitingFor: getWaitingFor(player, player.getWaitingFor(), game),
      silverCubeVariant: game.gameOptions.silverCubeVariant,
      temperatureSilverCubeBonusMC: game.temperatureSilverCubeBonusMC,
      oceansSilverCubeBonusMC: game.oceansSilverCubeBonusMC,
      oxygenSilverCubeBonusMC: game.oxygenSilverCubeBonusMC,
      venusSilverCubeBonusMC: game.venusSilverCubeBonusMC,
    };
  }

  public static getSpectatorModel(game: Game): SpectatorModel {
    return {
      aresData: game.aresData,
      awards: getAwards(game),
      colonies: getColonies(game),
      coloniesCount: getColonies(game).length,
      color: Color.NEUTRAL,
      deckSize: game.dealer.getDeckSize(),
      draftedPlayers: game.getDraftedPlayers(),
      gameOptions: getGameOptionsAsModel(game.gameOptions),
      generation: game.generation,
      id: game.spectatorId as string,
      lastSoloGeneration: game.lastSoloGeneration(),
      milestones: getMilestones(game),
      moon: MoonModel.serialize(game),
      oceans: game.board.getOceansOnBoard(),
      oxygenLevel: game.getOxygenLevel(),
      passedPlayers: game.getPassedPlayers(),
      phase: game.phase,
      players: getPlayers(game.getPlayers(), game),
      researchedPlayers: game.getResearchedPlayers(),
      temperature: game.getTemperature(),
      turmoil: getTurmoil(game),
      spaces: getSpaces(game.board),
      venusScaleLevel: game.getVenusScaleLevel(),
      silverCubeVariant: game.gameOptions.silverCubeVariant,
      temperatureSilverCubeBonusMC: game.temperatureSilverCubeBonusMC,
      oceansSilverCubeBonusMC: game.oceansSilverCubeBonusMC,
      oxygenSilverCubeBonusMC: game.oxygenSilverCubeBonusMC,
      venusSilverCubeBonusMC: game.venusSilverCubeBonusMC,
    };
  }
}

function getSelfReplicatingRobotsTargetCards(player: Player): Array<CardModel> {
  return player.getSelfReplicatingRobotsTargetCards().map((targetCard) => ({
    resources: targetCard.resourceCount,
    resourceType: undefined, // Card on SRR cannot gather its own resources (if any)
    name: targetCard.card.name,
    calculatedCost: player.getCardCost(targetCard.card),
    cardType: CardType.ACTIVE,
    isDisabled: false,
    reserveUnits: Units.EMPTY, // I wonder if this could just be removed.
  }));
}

function getMilestones(game: Game): Array<ClaimedMilestoneModel> {
  const allMilestones = game.milestones;
  const claimedMilestones = game.claimedMilestones;
  const milestoneModels: Array<ClaimedMilestoneModel> = [];

  for (const milestone of allMilestones) {
    const claimed = claimedMilestones.find(
      (m) => m.milestone.name === milestone.name,
    );
    const scores: Array<IMilestoneScore> = [];
    if (claimed === undefined && claimedMilestones.length < 3) {
      game.getPlayers().forEach((player) => {
        scores.push({
          playerColor: player.color,
          playerScore: milestone.getScore(player),
        });
      });
    }

    milestoneModels.push({
      player_name: claimed === undefined ? '' : claimed.player.name,
      player_color: claimed === undefined ? '' : claimed.player.color,
      milestone,
      scores,
    });
  }

  return milestoneModels;
}

function getAwards(game: Game): Array<FundedAwardModel> {
  const allAwards = game.awards;
  const fundedAwards = game.fundedAwards;
  const awardModels: Array<FundedAwardModel> = [];

  for (const award of allAwards) {
    const funded = fundedAwards.find(
      (a) => a.award.name === award.name,
    );
    const scores: Array<IAwardScore> = [];
    if (fundedAwards.length < 3 || funded !== undefined) {
      game.getPlayers().forEach((player) => {
        scores.push({
          playerColor: player.color,
          playerScore: award.getScore(player),
        });
      });
    }

    awardModels.push({
      player_name: funded === undefined ? '' : funded.player.name,
      player_color: funded === undefined ? '' : funded.player.color,
      award,
      scores: scores,
    });
  }

  return awardModels;
}

function getCorporationCard(player: Player): CardModel | undefined {
  if (player.corporationCard === undefined) return undefined;
  return {
    name: player.corporationCard.name,
    resources: player.getResourcesOnCard(player.corporationCard),
    cardType: CardType.CORPORATION,
    isDisabled: player.corporationCard.isDisabled,
    warning: player.corporationCard.warning,
    discount: player.corporationCard.cardDiscount,
  } as CardModel;
}

function getWaitingFor(
  player: Player,
  waitingFor: PlayerInput | undefined,
  game: Game | undefined,
): PlayerInputModel | undefined {
  if (waitingFor === undefined) {
    return undefined;
  }
  const playerInputModel: PlayerInputModel = {
    title: waitingFor.title,
    buttonLabel: waitingFor.buttonLabel,
    inputType: waitingFor.inputType,
    amount: undefined,
    options: undefined,
    cards: undefined,
    maxCardsToSelect: undefined,
    minCardsToSelect: undefined,
    canUseSteel: undefined,
    canUseTitanium: undefined,
    canUseHeat: undefined,
    players: undefined,
    availableSpaces: undefined,
    availableParties: undefined,
    min: undefined,
    max: undefined,
    maxByDefault: undefined,
    microbes: undefined,
    floaters: undefined,
    science: undefined,
    coloniesModel: undefined,
    payProduction: undefined,
    aresData: undefined,
    selectBlueCardAction: false,
    turmoil: undefined,
  };
  switch (waitingFor.inputType) {
  case PlayerInputTypes.AND_OPTIONS:
  case PlayerInputTypes.OR_OPTIONS:
  case PlayerInputTypes.SELECT_INITIAL_CARDS:
    playerInputModel.options = [];
    if (waitingFor.options !== undefined) {
      for (const option of waitingFor.options) {
        const subOption = getWaitingFor(player, option, game);
        if (subOption !== undefined) {
          playerInputModel.options.push(subOption);
        }
      }
    } else {
      throw new Error('required options not defined');
    }
    break;
  case PlayerInputTypes.SELECT_HOW_TO_PAY_FOR_PROJECT_CARD:
    const shtpfpc: SelectHowToPayForProjectCard = waitingFor as SelectHowToPayForProjectCard;
    playerInputModel.cards = getCards(player, shtpfpc.cards, {showNewCost: true, reserveUnits: shtpfpc.reserveUnits});
    playerInputModel.microbes = shtpfpc.microbes;
    playerInputModel.floaters = shtpfpc.floaters;
    playerInputModel.canUseHeat = shtpfpc.canUseHeat;
    playerInputModel.science = shtpfpc.scienceResources;
    break;
  case PlayerInputTypes.SELECT_CARD:
    const selectCard = waitingFor as SelectCard<ICard>;
    playerInputModel.cards = getCards(player, selectCard.cards, {
      showNewCost: !selectCard.played,
      showResources: selectCard.played,
      enabled: selectCard.enabled,
    });
    playerInputModel.maxCardsToSelect = selectCard.maxCardsToSelect;
    playerInputModel.minCardsToSelect = selectCard.minCardsToSelect;
    playerInputModel.showOnlyInLearnerMode = selectCard.enabled?.every((p: boolean) => p === false);
    playerInputModel.selectBlueCardAction = selectCard.selectBlueCardAction;
    if (selectCard.showOwner) {
      playerInputModel.showOwner = true;
    }
    break;
  case PlayerInputTypes.SELECT_COLONY:
    playerInputModel.coloniesModel = (waitingFor as SelectColony).coloniesModel;
    break;
  case PlayerInputTypes.SELECT_HOW_TO_PAY:
    playerInputModel.amount = (waitingFor as SelectHowToPay).amount;
    playerInputModel.canUseSteel = (waitingFor as SelectHowToPay).canUseSteel;
    playerInputModel.canUseTitanium = (waitingFor as SelectHowToPay).canUseTitanium;
    playerInputModel.canUseHeat = (waitingFor as SelectHowToPay).canUseHeat;
    break;
  case PlayerInputTypes.SELECT_PLAYER:
    playerInputModel.players = (waitingFor as SelectPlayer).players.map(
      (player) => player.color,
    );
    break;
  case PlayerInputTypes.SELECT_SPACE:
    playerInputModel.availableSpaces = (waitingFor as SelectSpace).availableSpaces.map(
      (space) => space.id,
    );
    break;
  case PlayerInputTypes.SELECT_AMOUNT:
    playerInputModel.min = (waitingFor as SelectAmount).min;
    playerInputModel.max = (waitingFor as SelectAmount).max;
    playerInputModel.maxByDefault = (waitingFor as SelectAmount).maxByDefault;
    break;
  case PlayerInputTypes.SELECT_PARTY_TO_SEND_DELEGATE:
    playerInputModel.availableParties = (waitingFor as SelectPartyToSendDelegate).availableParties;
    if (game !== undefined) {
      playerInputModel.turmoil = getTurmoil(game);
    }
    break;
  case PlayerInputTypes.SELECT_DELEGATE:
    playerInputModel.players = (waitingFor as SelectDelegate).players.map(
      (player) => {
        if (player === 'NEUTRAL') {
          return 'NEUTRAL';
        } else {
          return player.color;
        }
      },
    );
    break;
  case PlayerInputTypes.SELECT_PARTY_TO_SEND_DELEGATE:
    playerInputModel.availableParties = (waitingFor as SelectPartyToSendDelegate).availableParties;
    if (player.game !== undefined) {
      playerInputModel.turmoil = getTurmoil(player.game);
    }
    break;
  case PlayerInputTypes.SELECT_PRODUCTION_TO_LOSE:
    const _player = (waitingFor as SelectProductionToLose).player;
    playerInputModel.payProduction = {
      cost: (waitingFor as SelectProductionToLose).unitsToLose,
      units: {
        megacredits: _player.getProduction(Resources.MEGACREDITS),
        steel: _player.getProduction(Resources.STEEL),
        titanium: _player.getProduction(Resources.TITANIUM),
        plants: _player.getProduction(Resources.PLANTS),
        energy: _player.getProduction(Resources.ENERGY),
        heat: _player.getProduction(Resources.HEAT),
      },
    };
    break;
  case PlayerInputTypes.SHIFT_ARES_GLOBAL_PARAMETERS:
    playerInputModel.aresData = (waitingFor as ShiftAresGlobalParameters).aresData;
    break;
  }
  return playerInputModel;
}

function getCards(
  player: Player,
  cards: Array<ICard>,
  options: {
    showResources?: boolean,
    showNewCost?: boolean,
    reserveUnits?: Array<Units>,
    enabled?: Array<boolean>, // If provided, then the cards with false in `enabled` are not selectable and grayed out
  } = {},
): Array<CardModel> {
  return cards.map((card, index) => ({
    resources: options.showResources ? player.getResourcesOnCard(card) : undefined,
    resourceType: card.resourceType,
    name: card.name,
    calculatedCost: options.showNewCost ? (card.cost === undefined ? undefined : player.getCardCost(card as IProjectCard)) : card.cost,
    cardType: card.cardType,
    isDisabled: options.enabled?.[index] === false,
    warning: card.warning,
    reserveUnits: options.reserveUnits ? options.reserveUnits[index] : Units.EMPTY,
    bonusResource: (card as IProjectCard).bonusResource,
    discount: card.cardDiscount,
  }));
}

// NOTE: This doesn't return a proper PlayerModel. It returns only a partial one, because
// many of the field's values aren't set. That's why the code needs an "as PlayerModel" at
// the end. Eyuch. Warning, surprises ahead.
function getPlayers(players: Array<Player>, game: Game): Array<PlayerModel> {
  const turmoil = getTurmoil(game);

  return players.map((player) => {
    return {
        color: player.color,
        corporationCard: getCorporationCard(player),
        endGenerationScores: player.endGenerationScores,
        energy: player.energy,
        energyProduction: player.getProduction(Resources.ENERGY),
        // TODO(kberg): strictly speaking, game options shouldn't be necessary on the
        // individual player level.
        gameOptions: getGameOptionsAsModel(game.gameOptions),
        heat: player.heat,
        heatProduction: player.getProduction(Resources.HEAT),
        id: game.phase === Phase.END ? player.id : player.color,
        megaCredits: player.megaCredits,
        megaCreditProduction: player.getProduction(Resources.MEGACREDITS),
        name: player.name,
        plants: player.plants,
        plantProduction: player.getProduction(Resources.PLANTS),
        plantsAreProtected: player.plantsAreProtected(),
        plantsNeededForGreenery: player.plantsNeededForGreenery,
        playedCards: getCards(player, player.playedCards, {showResources: true}),
        cardsInHandNbr: player.cardsInHand.length,
        citiesCount: player.getCitiesCount(),
        coloniesCount: player.getColoniesCount(),
        noTagsCount: player.getNoTagsCount(),
        influence: turmoil ? game.turmoil!.getPlayerInfluence(player) : 0,
        steel: player.steel,
        steelProduction: player.getProduction(Resources.STEEL),
        steelValue: player.getSteelValue(),
        terraformRating: player.getTerraformRating(),
        titanium: player.titanium,
        titaniumProduction: player.getProduction(Resources.TITANIUM),
        titaniumValue: player.getTitaniumValue(),
        victoryPointsBreakdown: player.getVictoryPoints(),
        isActive: player.id === game.activePlayer,
        venusScaleLevel: game.getVenusScaleLevel(),
        colonies: getColonies(game),
        tags: player.getAllTags(),
        showTimers: game.gameOptions.showTimers,
        actionsThisGeneration: Array.from(
            player.getActionsThisGeneration()
        ),
        fleetSize: player.getFleetSize(),
        tradesThisGeneration: player.tradesThisGeneration,
        turmoil: turmoil,
        selfReplicatingRobotsCards: getSelfReplicatingRobotsTargetCards(player),
        needsToDraft: player.needsToDraft,
        deckSize: game.dealer.getDeckSize(),
        actionsTakenThisRound: player.actionsTakenThisRound,
        actionsTakenThisGame: player.actionsTakenThisGame,
        remainingStallActionsCount: player.remainingStallActionsCount,
        passedPlayers: game.getPassedPlayers(),
        draftedPlayers: game.getDraftedPlayers(),
        researchedPlayers: game.getResearchedPlayers(),
        preludeExtension: game.gameOptions.preludeExtension,
        politicalAgendasExtension: game.gameOptions.politicalAgendasExtension,
        societyExpansion: game.gameOptions.societyExpansion,
        colosseumVariant: game.gameOptions.colosseumVariant,
        newOpsExpansion: game.gameOptions.newOpsExpansion,
        timer: player.timer.serialize(),
        totalSpend: player.totalSpend,
        silverCubeVariant: game.gameOptions.silverCubeVariant,
        temperatureSilverCubeBonusMC: game.temperatureSilverCubeBonusMC,
        oceansSilverCubeBonusMC: game.oceansSilverCubeBonusMC,
        oxygenSilverCubeBonusMC: game.oxygenSilverCubeBonusMC,
        venusSilverCubeBonusMC: game.venusSilverCubeBonusMC,
        availableBlueCardActionCount: player.getAvailableBlueActionCount(),
    } as unknown as PlayerModel;
  });
}

function getColonies(game: Game): Array<ColonyModel> {
  return game.colonies.map(
    (colony): ColonyModel => ({
      colonies: colony.colonies.map(
        (playerId): Color => game.getPlayerById(playerId).color,
      ),
      isActive: colony.isActive,
      name: colony.name,
      trackPosition: colony.trackPosition,
      visitor:
          colony.visitor === undefined ?
            undefined :
            game.getPlayerById(colony.visitor).color,
    }),
  );
}

// Oceans can't be owned so they shouldn't have a color associated with them
// Land claim can have a color on a space without a tile
function getColor(space: ISpace): Color | undefined {
  if (
    (space.tile === undefined || space.tile.tileType !== TileType.OCEAN) &&
    space.player !== undefined
  ) {
    return space.player.color;
  }
  if (space.tile?.protectedHazard === true) {
    return Color.BRONZE;
  }
  return undefined;
}

function getSpaces(board: Board): Array<SpaceModel> {
  const volcanicSpaceIds = board.getVolcanicSpaceIds();
  const noctisCitySpaceIds = board.getNoctisCitySpaceIds();

  return board.spaces.map((space) => {
    let highlight: SpaceHighlight = undefined;
    if (volcanicSpaceIds.includes(space.id)) {
      highlight = 'volcanic';
    } else if (noctisCitySpaceIds.includes(space.id)) {
      highlight = 'noctis';
    }
    return {
      x: space.x,
      y: space.y,
      id: space.id,
      bonus: space.bonus,
      spaceType: space.spaceType,
      tileType: space.tile && space.tile.tileType,
      color: getColor(space),
      highlight: highlight,
    };
  });
}

function getGameOptionsAsModel(options: GameOptions): GameOptionsModel {
  return {
    aresExtension: options.aresExtension,
    boardName: options.boardName,
    cardsBlackList: options.cardsBlackList,
    coloniesExtension: options.coloniesExtension,
    colosseumVariant: options.colosseumVariant,
    communityCardsOption: options.communityCardsOption,
    corporateEra: options.corporateEra,
    draftVariant: options.draftVariant,
    escapeVelocityMode: options.escapeVelocityMode,
    escapeVelocityThreshold: options.escapeVelocityThreshold,
    escapeVelocityPeriod: options.escapeVelocityPeriod,
    escapeVelocityPenalty: options.escapeVelocityPenalty,
    fastModeOption: options.fastModeOption,
    initialDraftVariant: options.initialDraftVariant,
    moonExpansion: options.moonExpansion,
    newOpsExpansion: options.newOpsExpansion,
    preludeExtension: options.preludeExtension,
    promoCardsOption: options.promoCardsOption,
    politicalAgendasExtension: options.politicalAgendasExtension,
    societyExpansion: options.societyExpansion,
    showTimers: options.showTimers,
    shuffleMapOption: options.shuffleMapOption,
    silverCubeVariant: options.silverCubeVariant,
    solarPhaseOption: options.solarPhaseOption,
    soloTR: options.soloTR,
    randomMA: options.randomMA,
    randomTurmoil: options.randomTurmoil,
    turmoilExtension: options.turmoilExtension,
    venusNextExtension: options.venusNextExtension,
    requiresVenusTrackCompletion: options.requiresVenusTrackCompletion,
  };
}
