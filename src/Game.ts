import * as constants from './constants';
import {BeginnerCorporation} from './cards/corporation/BeginnerCorporation';
import {Board} from './boards/Board';
import {BoardName} from './boards/BoardName';
import {CardFinder} from './CardFinder';
import {CardName} from './CardName';
import {CardType} from './cards/CardType';
import {ClaimedMilestone, serializeClaimedMilestones, deserializeClaimedMilestones} from './milestones/ClaimedMilestone';
import {Colony} from './colonies/Colony';
import {ColonyDealer, loadColoniesFromJSON} from './colonies/ColonyDealer';
import {ColonyModel} from './models/ColonyModel';
import {ColonyName} from './colonies/ColonyName';
import {Color} from './Color';
import {CorporationCard} from './cards/corporation/CorporationCard';
import {Database} from './database/Database';
import {Dealer} from './Dealer';
import {ElysiumBoard} from './boards/ElysiumBoard';
import {FundedAward, serializeFundedAwards, deserializeFundedAwards} from './awards/FundedAward';
import {HellasBoard} from './boards/HellasBoard';
import {IAward} from './awards/IAward';
import {ISerializable} from './ISerializable';
import {IMilestone} from './milestones/IMilestone';
import {IProjectCard} from './cards/IProjectCard';
import {ISpace, SpaceId} from './boards/ISpace';
import {ITile} from './ITile';
import {LogBuilder} from './LogBuilder';
import {LogHelper} from './LogHelper';
import {LogMessage} from './LogMessage';
import {ALL_MILESTONES} from './milestones/Milestones';
import {ALL_AWARDS} from './awards/Awards';
import {OriginalBoard} from './boards/OriginalBoard';
import {PartyHooks} from './turmoil/parties/PartyHooks';
import {Phase} from './Phase';
import {Player, PlayerId} from './Player';
import {PlayerInput} from './PlayerInput';
import {ResourceType} from './ResourceType';
import {Resources} from './Resources';
import {DeferredAction, Priority} from './deferredActions/DeferredAction';
import {DeferredActionsQueue} from './deferredActions/DeferredActionsQueue';
import {SelectHowToPayDeferred} from './deferredActions/SelectHowToPayDeferred';
import {SelectInitialCards} from './inputs/SelectInitialCards';
import {PlaceOceanTile} from './deferredActions/PlaceOceanTile';
import {RemoveColonyFromGame} from './deferredActions/RemoveColonyFromGame';
import {GainResources} from './deferredActions/GainResources';
import {SelectSpace} from './inputs/SelectSpace';
import {SerializedGame} from './SerializedGame';
import {SerializedPlayer} from './SerializedPlayer';
import {SpaceBonus} from './SpaceBonus';
import {SpaceName} from './SpaceName';
import {SpaceType} from './SpaceType';
import {Tags} from './cards/Tags';
import {TileType} from './TileType';
import {Turmoil} from './turmoil/Turmoil';
import {RandomMAOptionType} from './RandomMAOptionType';
import {AresHandler} from './ares/AresHandler';
import {IAresData} from './ares/IAresData';
import {AgendaStyle} from './turmoil/PoliticalAgendas';
import {GameSetup} from './GameSetup';
import {CardLoader} from './CardLoader';
import {GlobalParameter} from './GlobalParameter';
import {AresSetup} from './ares/AresSetup';
import {IMoonData} from './moon/IMoonData';
import {MoonExpansion} from './moon/MoonExpansion';
import {TurmoilHandler} from './turmoil/TurmoilHandler';
import {Random} from './Random';
import {AddResourcesToCard} from './deferredActions/AddResourcesToCard';
import {AmazonisBoard} from './boards/AmazonisBoard';
import {ArabiaTerraBoard} from './boards/ArabiaTerraBoard';
import {VastitasBorealisBoard} from './boards/VastitasBorealisBoard';
import {SilverCubeHandler} from './community/SilverCubeHandler';
import {MilestoneAwardSelector} from './MilestoneAwardSelector';
import {BoardType} from './boards/BoardType';

export type GameId = string;
export type SpectatorId = string;

export interface Score {
  corporation: String;
  playerScore: number;
}

export interface GameOptions {
  boardName: BoardName;
  clonedGamedId: GameId | undefined;

  // Configuration
  undoOption: boolean;
  showTimers: boolean;
  fastModeOption: boolean;

  // Extensions
  corporateEra: boolean;
  venusNextExtension: boolean;
  coloniesExtension: boolean;
  preludeExtension: boolean;
  turmoilExtension: boolean;
  promoCardsOption: boolean;
  communityCardsOption: boolean;
  aresExtension: boolean;
  aresHazards: boolean;
  politicalAgendasExtension: AgendaStyle;
  societyExpansion: boolean;
  solarPhaseOption: boolean;
  moonExpansion: boolean;

  // Variants
  colosseumVariant: boolean;
  draftVariant: boolean;
  initialDraftVariant: boolean;
  startingCorporations: number;
  shuffleMapOption: boolean;
  randomMA: RandomMAOptionType;
  randomTurmoil: boolean;
  soloTR: boolean; // Solo victory by getting TR 63 by game end
  customCorporationsList: Array<CardName>;
  cardsBlackList: Array<CardName>;
  customColoniesList: Array<ColonyName>;
  requiresVenusTrackCompletion: boolean; // Venus must be completed to end the game
  silverCubeVariant: boolean; // modified WGT phase
  requiresMoonTrackCompletion: boolean; // Moon must be completed to end the game
}

const DEFAULT_GAME_OPTIONS: GameOptions = {
  aresExtension: false,
  aresHazards: true,
  boardName: BoardName.ORIGINAL,
  cardsBlackList: [],
  clonedGamedId: undefined,
  coloniesExtension: false,
  colosseumVariant: false,
  communityCardsOption: false,
  corporateEra: true,
  customColoniesList: [],
  customCorporationsList: [],
  draftVariant: false,
  fastModeOption: false,
  initialDraftVariant: false,
  moonExpansion: false,
  politicalAgendasExtension: AgendaStyle.STANDARD,
  societyExpansion: false,
  preludeExtension: false,
  promoCardsOption: false,
  randomMA: RandomMAOptionType.NONE,
  randomTurmoil: false,
  requiresMoonTrackCompletion: false,
  requiresVenusTrackCompletion: false,
  showTimers: true,
  shuffleMapOption: false,
  solarPhaseOption: false,
  silverCubeVariant: false,
  soloTR: false,
  startingCorporations: 2,
  turmoilExtension: false,
  undoOption: false,
  venusNextExtension: false,
};

export class Game implements ISerializable<SerializedGame> {
  // Game-level data
  public lastSaveId: number = 0;
  private clonedGamedId: string | undefined;
  public seed: number;
  public spectatorId: SpectatorId | undefined;
  public deferredActions: DeferredActionsQueue = new DeferredActionsQueue();
  public gameAge: number = 0; // Each log event increases it
  public gameLog: Array<LogMessage> = [];
  public undoCount: number = 0; // Each undo increases it

  public generation: number = 1;
  public phase: Phase = Phase.RESEARCH;
  public dealer: Dealer;
  public board: Board;

  // Global parameters
  private oxygenLevel: number = constants.MIN_OXYGEN_LEVEL;
  private temperature: number = constants.MIN_TEMPERATURE;
  private venusScaleLevel: number = constants.MIN_VENUS_SCALE;

  // Player data
  public activePlayer: PlayerId;
  private donePlayers = new Set<PlayerId>();
  private passedPlayers = new Set<PlayerId>();
  private researchedPlayers = new Set<PlayerId>();
  private draftedPlayers = new Set<PlayerId>();

  // Drafting
  private draftRound: number = 1;
  // Used when drafting the first 10 project cards.
  private initialDraftIteration: number = 1;
  private unDraftedCards: Map<PlayerId, Array<IProjectCard>> = new Map();

  // Milestones and awards
  public claimedMilestones: Array<ClaimedMilestone> = [];
  public milestones: Array<IMilestone> = [];
  public fundedAwards: Array<FundedAward> = [];
  public awards: Array<IAward> = [];

  // Expansion-specific data
  public colonies: Array<Colony> = [];
  public colonyDealer: ColonyDealer | undefined = undefined;
  public turmoil: Turmoil | undefined;
  public aresData: IAresData | undefined;
  public moonData: IMoonData | undefined;
  public erodedSpaces: Array<string> = [];
  public temperatureSilverCubeBonusMC: number = 0;
  public oceansSilverCubeBonusMC: number = 0;
  public oxygenSilverCubeBonusMC: number = 0;
  public venusSilverCubeBonusMC: number = 0;

  // Card-specific data
  // Mons Insurance promo corp
  public monsInsuranceOwner: PlayerId | undefined = undefined;
  // Crash Site promo project
  public someoneHasRemovedOtherPlayersPlants: boolean = false;
  // United Nations Mission One community corp
  public unitedNationsMissionOneOwner: PlayerId | undefined = undefined;
  // Athena community corp
  public athenaOwner: PlayerId | undefined = undefined;
  // Syndicate Pirate Raids
  public syndicatePirateRaider: PlayerId | undefined = undefined;

  private constructor(
    public id: GameId,
    private players: Array<Player>,
    private first: Player,
    activePlayer: PlayerId,
    public gameOptions: GameOptions,
    seed: number,
    board: Board,
    dealer: Dealer) {
    const playerIds = players.map((p) => p.id);
    if (playerIds.includes(first.id) === false) {
      throw new Error('Cannot find first player ' + first.id + ' in ' + playerIds);
    }
    if (playerIds.includes(activePlayer) === false) {
      throw new Error('Cannot find active player ' + activePlayer + ' in ' + playerIds);
    }
    if (new Set(playerIds).size !== players.length) {
      throw new Error('Duplicate player found: ' + playerIds);
    }
    const colors = players.map((p) => p.color);
    if (new Set(colors).size !== players.length) {
      throw new Error('Duplicate color found: ' + colors);
    }

    this.activePlayer = activePlayer;
    this.seed = seed;
    this.dealer = dealer;
    this.board = board;

    this.players.forEach((player) => {
      player.game = this;
    });
  }

  public static newInstance(id: GameId,
    players: Array<Player>,
    firstPlayer: Player,
    gameOptions: GameOptions = {...DEFAULT_GAME_OPTIONS},
    seed: number = 0,
    spectatorId: SpectatorId | undefined = undefined): Game {
    if (gameOptions.clonedGamedId !== undefined) {
      throw new Error('Cloning should not come through this execution path.');
    }

    const rng = new Random(seed);
    const initialErodedSpaces: Array<string> = [];
    const board = GameSetup.newBoard(gameOptions.boardName, gameOptions.shuffleMapOption, rng, gameOptions.venusNextExtension, initialErodedSpaces);
    const cardFinder = new CardFinder();
    const cardLoader = new CardLoader(gameOptions);
    const dealer = Dealer.newInstance(cardLoader);

    const activePlayer = firstPlayer.id;

    // Single player game player starts with 14TR
    if (players.length === 1) {
      gameOptions.draftVariant = false;
      gameOptions.initialDraftVariant = false;
      gameOptions.randomMA = RandomMAOptionType.NONE;

      players[0].setTerraformRating(14);
      players[0].terraformRatingAtGenerationStart = 14;
    }

    const game = new Game(id, players, firstPlayer, activePlayer, gameOptions, seed, board, dealer);
    game.spectatorId = spectatorId;
    // Initialize Ares data
    if (gameOptions.aresExtension) {
      game.aresData = AresSetup.initialData(gameOptions.aresExtension, gameOptions.aresHazards, players);
    }

    const milestonesAwards = MilestoneAwardSelector.chooseMilestonesAndAwards(gameOptions);
    game.milestones = milestonesAwards.milestones;
    game.awards = milestonesAwards.awards;

    // Add colonies stuff
    if (gameOptions.coloniesExtension) {
      game.colonyDealer = new ColonyDealer();
      const communityColoniesSelected = GameSetup.includesCommunityColonies(gameOptions);
      const allowCommunityColonies = gameOptions.communityCardsOption || communityColoniesSelected;

      game.colonies = game.colonyDealer.drawColonies(players.length, gameOptions, allowCommunityColonies);
    }

    // Add Turmoil stuff
    if (gameOptions.turmoilExtension) {
      game.turmoil = Turmoil.newInstance(game, gameOptions.politicalAgendasExtension);
    }

    // and 2 neutral cities and forests on board
    if (players.length === 1) {
      //  Setup solo player's starting tiles
      GameSetup.setupNeutralPlayer(game);
    }

    // Setup Ares hazards
    if (gameOptions.aresExtension && gameOptions.aresHazards) {
      AresSetup.setupHazards(game, players.length);
    }

    if (gameOptions.moonExpansion) {
      game.moonData = MoonExpansion.initialize();
    }

    // Setup custom corporation list
    let corporationCards = game.dealer.corporationCards;

    const minCorpsRequired = gameOptions.colosseumVariant ? 1 : players.length * gameOptions.startingCorporations;
    if (gameOptions.customCorporationsList && gameOptions.customCorporationsList.length >= minCorpsRequired) {
      const customCorporationCards: CorporationCard[] = [];
      for (const corp of gameOptions.customCorporationsList) {
        const customCorp = cardFinder.getCorporationCardByName(corp);
        if (customCorp) customCorporationCards.push(customCorp);
      }
      corporationCards = customCorporationCards;
    }

    corporationCards = dealer.shuffleCards(corporationCards);

    // Failsafe for exceding corporation pool
    if (gameOptions.startingCorporations * players.length > corporationCards.length) {
      gameOptions.startingCorporations = 2;
    }

    // Initialize each player:
    // Give them their corporation cards, other cards, starting production,
    // handicaps.
    for (const player of game.getPlayers()) {
      player.setTerraformRating(player.getTerraformRating() + player.handicap);
      if (!gameOptions.corporateEra) {
        GameSetup.setStartingProductions(player);
      }

      if (gameOptions.colosseumVariant) {
        const corpCard = corporationCards[0];
        player.dealtCorporationCards.push(corpCard);

        if (gameOptions.initialDraftVariant === false) this.dealProjectCards(player, dealer, game);
        if (gameOptions.preludeExtension) this.dealPreludeCards(player, dealer);
      } else if (!player.beginner ||
        // Bypass beginner choice if any extension is choosen
        gameOptions.preludeExtension ||
        gameOptions.venusNextExtension ||
        gameOptions.coloniesExtension ||
        gameOptions.turmoilExtension ||
        gameOptions.initialDraftVariant) {
        for (let i = 0; i < gameOptions.startingCorporations; i++) {
          const corpCard = corporationCards.pop();
          if (corpCard !== undefined) {
            player.dealtCorporationCards.push(corpCard);
          } else {
            throw new Error('No corporation card dealt for player');
          }
        }
        if (gameOptions.initialDraftVariant === false) this.dealProjectCards(player, dealer, game);
        if (gameOptions.preludeExtension) this.dealPreludeCards(player, dealer);
      } else {
        game.playerHasPickedCorporationCard(player, new BeginnerCorporation());
      }
    }

    // Print game_id if solo game
    if (players.length === 1) {
      game.log('The id of this game is ${0}', (b) => b.rawString(id));
    }

    game.log('Generation ${0}', (b) => b.forNewGeneration().number(game.generation));

    // Initial Draft
    if (gameOptions.initialDraftVariant) {
      game.phase = Phase.INITIALDRAFTING;
      game.runDraftRound(true);
    } else {
      game.gotoInitialResearchPhase();
    }

    return game;
  }

  private static dealProjectCards(player: Player, dealer: Dealer, game: Game): void {
    for (let i = 0; i < 10; i++) {
      player.dealtProjectCards.push(dealer.dealCard(game));
    }
  }

  private static dealPreludeCards(player: Player, dealer: Dealer): void {
    for (let i = 0; i < 4; i++) {
      player.dealtPreludeCards.push(dealer.dealPreludeCard());
    }
  }

  public save(): void {
    Database.getInstance().saveGame(this);
  }

  public toJSON(): string {
    return JSON.stringify(this.serialize());
  }

  public serialize(): SerializedGame {
    const result: SerializedGame = {
      activePlayer: this.activePlayer,
      athenaOwner: this.athenaOwner,
      awards: this.awards,
      board: this.board.serialize(),
      claimedMilestones: serializeClaimedMilestones(this.claimedMilestones),
      colonies: this.colonies,
      colonyDealer: this.colonyDealer,
      dealer: this.dealer.serialize(),
      deferredActions: [],
      donePlayers: Array.from(this.donePlayers),
      draftedPlayers: Array.from(this.draftedPlayers),
      draftRound: this.draftRound,
      erodedSpaces: this.erodedSpaces,
      first: this.first.id,
      fundedAwards: serializeFundedAwards(this.fundedAwards),
      gameAge: this.gameAge,
      gameLog: this.gameLog,
      gameOptions: this.gameOptions,
      generation: this.generation,
      id: this.id,
      initialDraftIteration: this.initialDraftIteration,
      lastSaveId: this.lastSaveId,
      milestones: this.milestones,
      monsInsuranceOwner: this.monsInsuranceOwner,
      moonData: IMoonData.serialize(this.moonData),
      oxygenLevel: this.oxygenLevel,
      passedPlayers: Array.from(this.passedPlayers),
      phase: this.phase,
      players: this.players.map((p) => p.serialize()),
      researchedPlayers: Array.from(this.researchedPlayers),
      seed: this.seed,
      someoneHasRemovedOtherPlayersPlants: this.someoneHasRemovedOtherPlayersPlants,
      spectatorId: this.spectatorId,
      syndicatePirateRaider: this.syndicatePirateRaider,
      temperature: this.temperature,
      undoCount: this.undoCount,
      unDraftedCards: Array.from(this.unDraftedCards.entries()).map((a) => {
        return [
          a[0],
          a[1].map((c) => c.name),
        ];
      }),
      unitedNationsMissionOneOwner: this.unitedNationsMissionOneOwner,
      venusScaleLevel: this.venusScaleLevel,
      temperatureSilverCubeBonusMC: this.temperatureSilverCubeBonusMC,
      oceansSilverCubeBonusMC: this.oceansSilverCubeBonusMC,
      oxygenSilverCubeBonusMC: this.oxygenSilverCubeBonusMC,
      venusSilverCubeBonusMC: this.venusSilverCubeBonusMC,
    };
    if (this.aresData !== undefined) {
      result.aresData = this.aresData;
    }
    if (this.clonedGamedId !== undefined) {
      result.clonedGamedId = this.clonedGamedId;
    }
    if (this.turmoil !== undefined) {
      result.turmoil = this.turmoil.serialize();
    }
    return result;
  }

  public isSoloMode() :boolean {
    return this.players.length === 1;
  }

  // Function to retrieve a player by it's id
  public getPlayerById(id: string): Player {
    const player = this.players.find((p) => p.id === id);
    if (player === undefined) {
      throw new Error(`player ${id} does not exist on game ${this.id}`);
    }
    return player;
  }

  // Function to return an array of players from an array of player ids
  public getPlayersById(ids: Array<string>): Array<Player> {
    return ids.map((id) => this.getPlayerById(id));
  }

  public defer(action: DeferredAction, priority?: Priority | number): void {
    if (priority !== undefined) {
      action.priority = priority;
    }
    this.deferredActions.push(action);
  }

  public getColoniesModel(colonies: Array<Colony>) : Array<ColonyModel> {
    return colonies.map(
      (colony): ColonyModel => ({
        colonies: colony.colonies.map(
          (playerId): Color => this.getPlayerById(playerId).color,
        ),
        isActive: colony.isActive,
        name: colony.name,
        trackPosition: colony.trackPosition,
        visitor:
              colony.visitor === undefined ?
                undefined :
                this.getPlayerById(colony.visitor).color,
      }),
    );
  }

  public milestoneClaimed(milestone: IMilestone): boolean {
    return this.claimedMilestones.find(
      (claimedMilestone) => claimedMilestone.milestone === milestone,
    ) !== undefined;
  }

  public noOceansAvailable(): boolean {
    return this.board.getOceansOnBoard() >= constants.MAX_OCEAN_TILES;
  }

  public marsIsTerraformed(): boolean {
    const oxygenMaxed = this.oxygenLevel >= constants.MAX_OXYGEN_LEVEL;
    const temperatureMaxed = this.temperature >= constants.MAX_TEMPERATURE;
    const oceansMaxed = this.board.getOceansOnBoard() === constants.MAX_OCEAN_TILES;
    let globalParametersMaxed = oxygenMaxed && temperatureMaxed && oceansMaxed;
    const venusMaxed = this.getVenusScaleLevel() === constants.MAX_VENUS_SCALE;

    MoonExpansion.ifMoon(this, (moonData) => {
      if (this.gameOptions.requiresMoonTrackCompletion) {
        const moonMaxed =
          moonData.colonyRate === constants.MAXIMUM_COLONY_RATE &&
          moonData.miningRate === constants.MAXIMUM_MINING_RATE &&
          moonData.logisticRate === constants.MAXIMUM_LOGISTICS_RATE;
        globalParametersMaxed = globalParametersMaxed && moonMaxed;
      }
    });

    // Solo games with Venus needs Venus maxed to end the game.
    if (this.players.length === 1 && this.gameOptions.venusNextExtension) {
      return globalParametersMaxed && venusMaxed;
    }
    // new option "requiresVenusTrackCompletion" also makes maximizing Venus a game-end requirement
    if (this.gameOptions.venusNextExtension && this.gameOptions.requiresVenusTrackCompletion) {
      return globalParametersMaxed && venusMaxed;
    }
    return globalParametersMaxed;
  }

  public lastSoloGeneration(): number {
    let lastGeneration = 14;
    const options = this.gameOptions;
    if (options.preludeExtension) {
      lastGeneration -= 2;
    }

    // Only add 2 more generations when using the track completion option
    // and not the solo TR option.
    //
    // isSoloModeWin backs this up.
    if (options.moonExpansion) {
      if (!options.soloTR && options.requiresMoonTrackCompletion) {
        lastGeneration += 2;
      }
    }
    return lastGeneration;
  }

  public isSoloModeWin(): boolean {
    // Solo TR victory condition
    if (this.gameOptions.soloTR) {
      return this.players[0].getTerraformRating() >= 63;
    }

    // Complete terraforing victory condition.
    if (!this.marsIsTerraformed()) {
      return false;
    }

    // This last conditional doesn't make much sense to me. It's only ever really used
    // on the client at components/GameEnd.ts. Which is probably why it doesn't make
    // obvious sense why when this generation is earlier than the last generation
    // of the game means "true, is solo mode win."
    return this.generation <= this.lastSoloGeneration();
  }

  public getAwardFundingCost(): number {
    return 8 + (6 * this.fundedAwards.length);
  }

  public fundAward(player: Player, award: IAward): void {
    if (this.allAwardsFunded()) {
      throw new Error('All awards already funded');
    }
    this.log('${0} funded ${1} award',
      (b) => b.player(player).award(award));

    this.fundedAwards.push({
      award: award,
      player: player,
    });
  }

  public hasBeenFunded(award: IAward): boolean {
    return this.fundedAwards.find(
      (fundedAward) => fundedAward.award === award,
    ) !== undefined;
  }

  public allAwardsFunded(): boolean {
    // Awards are disabled for 1 player games
    if (this.players.length === 1) return true;

    return this.fundedAwards.length >= constants.MAX_AWARDS;
  }

  public allMilestonesClaimed(): boolean {
    // Milestones are disabled for 1 player games
    if (this.players.length === 1) return true;

    return this.claimedMilestones.length >= constants.MAX_MILESTONES;
  }

  private playerHasPickedCorporationCard(player: Player, corporationCard: CorporationCard) {
    player.pickedCorporationCard = corporationCard;
    // if all players picked corporationCard
    if (this.players.every((p) => p.pickedCorporationCard !== undefined)) {
      for (const somePlayer of this.getPlayers()) {
        this.playCorporationCard(somePlayer, somePlayer.pickedCorporationCard!);
      }
    }
  }

  private playCorporationCard(
    player: Player, corporationCard: CorporationCard,
  ): void {
    player.corporationCard = corporationCard;
    player.megaCredits = corporationCard.startingMegaCredits;
    if (corporationCard.cardCost !== undefined) {
      player.cardCost = corporationCard.cardCost;
    }

    if (corporationCard.name !== CardName.BEGINNER_CORPORATION) {
      const cardsToPayFor: number = player.cardsInHand.length;
      player.megaCredits -= cardsToPayFor * player.cardCost;
      player.totalSpend += cardsToPayFor * player.cardCost;
    }
    corporationCard.play(player);
    this.log('${0} played ${1}', (b) => b.player(player).card(corporationCard));

    // trigger other corp's effect, e.g. SaturnSystems,PharmacyUnion,Splice
    for (const somePlayer of this.getPlayers()) {
      if (somePlayer !== player && somePlayer.corporationCard !== undefined && somePlayer.corporationCard.onCorpCardPlayed !== undefined) {
        this.defer(new DeferredAction(
          player,
          () => {
            if (somePlayer.corporationCard !== undefined && somePlayer.corporationCard.onCorpCardPlayed !== undefined) {
              return somePlayer.corporationCard.onCorpCardPlayed(player, corporationCard) || undefined;
            }
            return undefined;
          },
        ));
      }
    }

    // Activate some colonies
    if (this.gameOptions.coloniesExtension && corporationCard.resourceType !== undefined) {
      this.colonies.forEach((colony) => {
        if (colony.resourceType !== undefined && colony.resourceType === corporationCard.resourceType) {
          colony.isActive = true;
        }
      });

      // Check for Venus colony
      if (corporationCard.tags.includes(Tags.VENUS)) {
        const venusColony = this.colonies.find((colony) => colony.name === ColonyName.VENUS);
        if (venusColony) venusColony.isActive = true;
      }
    }

    this.playerIsFinishedWithResearchPhase(player);
  }

  private pickCorporationCard(player: Player): PlayerInput {
    return new SelectInitialCards(player, (corporation: CorporationCard) => {
      // Check for negative M€
      const cardCost = corporation.cardCost !== undefined ? corporation.cardCost : player.cardCost;
      if (corporation.name !== CardName.BEGINNER_CORPORATION && player.cardsInHand.length * cardCost > corporation.startingMegaCredits) {
        player.cardsInHand = [];
        player.preludeCardsInHand = [];
        throw new Error('Too many cards selected');
      }
      // discard all unpurchased cards
      player.dealtProjectCards.forEach((card) => {
        if (player.cardsInHand.includes(card) === false) {
          this.dealer.discard(card);
        }
      });

      this.playerHasPickedCorporationCard(player, corporation); return undefined;
    });
  }

  public hasPassedThisActionPhase(player: Player): boolean {
    return this.passedPlayers.has(player.id);
  }

  private incrementFirstPlayer(): void {
    let firstIndex: number = this.players.map(function(x) {
      return x.id;
    }).indexOf(this.first.id);
    if (firstIndex === -1) {
      throw new Error('Didn\'t even find player');
    }
    if (firstIndex === this.players.length - 1) {
      firstIndex = 0;
    } else {
      firstIndex++;
    }
    this.first = this.players[firstIndex];
  }

  private runDraftRound(initialDraft: boolean = false, preludeDraft: boolean = false): void {
    this.save();
    this.draftedPlayers.clear();
    this.players.forEach((player) => {
      player.needsToDraft = true;
      if (this.draftRound === 1 && !preludeDraft) {
        player.runDraftPhase(initialDraft, this.getNextDraft(player).name);
      } else if (this.draftRound === 1 && preludeDraft) {
        player.runDraftPhase(initialDraft, this.getNextDraft(player).name, player.dealtPreludeCards);
      } else {
        const cards = this.unDraftedCards.get(this.getDraftCardsFrom(player));
        this.unDraftedCards.delete(this.getDraftCardsFrom(player));
        player.runDraftPhase(initialDraft, this.getNextDraft(player).name, cards);
      }
    });
  }

  private gotoInitialResearchPhase(): void {
    this.phase = Phase.RESEARCH;
    this.save();
    for (const player of this.players) {
      if (player.pickedCorporationCard === undefined && player.dealtCorporationCards.length > 0) {
        player.setWaitingFor(this.pickCorporationCard(player), () => {});
      }
    }
    if (this.players.length === 1 && this.gameOptions.coloniesExtension) {
      this.players[0].addProduction(Resources.MEGACREDITS, -2);
      this.defer(new RemoveColonyFromGame(this.players[0]));
    }
  }

  private gotoResearchPhase(): void {
    this.phase = Phase.RESEARCH;
    this.researchedPlayers.clear();
    this.save();
    this.players.forEach((player) => {
      player.runResearchPhase(this.gameOptions.draftVariant);
    });
  }

  private gotoDraftingPhase(): void {
    this.phase = Phase.DRAFTING;
    this.draftRound = 1;
    this.runDraftRound();
  }

  public gameIsOver(): boolean {
    if (this.isSoloMode()) {
      // Solo games continue until the designated generation end even if Mars is already terraformed
      return this.generation === this.lastSoloGeneration();
    }
    return this.marsIsTerraformed();
  }

  private gotoProductionPhase(): void {
    this.phase = Phase.PRODUCTION;
    this.passedPlayers.clear();
    this.someoneHasRemovedOtherPlayersPlants = false;
    this.players.forEach((player) => {
      player.cardDiscount = 0; // Iapetus reset hook
      player.runProductionPhase();
    });

    if (this.gameIsOver()) {
      this.gotoFinalGreeneryPlacement();
      return;
    }

    // solar Phase Option
    this.phase = Phase.SOLAR;
    if (this.gameOptions.solarPhaseOption && ! this.marsIsTerraformed()) {
      this.gotoWorldGovernmentTerraforming();
      return;
    }
    this.gotoEndGeneration();
  }

  private gotoEndGeneration() {
    if (this.gameOptions.coloniesExtension) {
      this.colonies.forEach((colony) => {
        colony.endGeneration(this);
      });
      // Syndicate Pirate Raids hook. Also see Colony.ts and Player.ts
      this.syndicatePirateRaider = undefined;
    }

    if (this.gameOptions.turmoilExtension) {
      this.turmoil?.endGeneration(this);
    }

    // Resolve Turmoil deferred actions
    if (this.deferredActions.length > 0) {
      this.resolveTurmoilDeferredActions();
      return;
    }

    this.phase = Phase.INTERGENERATION;
    this.goToDraftOrResearch();
  }

  private resolveTurmoilDeferredActions() {
    this.deferredActions.runAll(() => this.goToDraftOrResearch());
  }

  private goToDraftOrResearch() {
    this.generation++;
    this.log('Generation ${0}', (b) => b.forNewGeneration().number(this.generation));
    this.incrementFirstPlayer();

    this.players.forEach((player) => {
      player.terraformRatingAtGenerationStart = player.getTerraformRating();
      player.hasIncreasedTerraformRatingThisGeneration = false;
      player.heatProductionStepsIncreasedThisGeneration = 0;
    });

    if (this.gameOptions.draftVariant) {
      this.gotoDraftingPhase();
    } else {
      this.gotoResearchPhase();
    }
  }

  private gotoWorldGovernmentTerraforming() {
    this.first.worldGovernmentTerraforming();
  }

  public doneWorldGovernmentTerraforming() {
    // Carry on to next phase
    this.gotoEndGeneration();
  }

  private allPlayersHavePassed(): boolean {
    for (const player of this.players) {
      if (!this.hasPassedThisActionPhase(player)) {
        return false;
      }
    }
    return true;
  }

  public playerHasPassed(player: Player): void {
    this.passedPlayers.add(player.id);
  }

  public hasResearched(player: Player): boolean {
    return this.researchedPlayers.has(player.id);
  }

  private hasDrafted(player: Player): boolean {
    return this.draftedPlayers.has(player.id);
  }

  private allPlayersHaveFinishedResearch(): boolean {
    for (const player of this.players) {
      if (!this.hasResearched(player)) {
        return false;
      }
    }
    return true;
  }

  private allPlayersHaveFinishedDraft(): boolean {
    for (const player of this.players) {
      if (!this.hasDrafted(player)) {
        return false;
      }
    }
    return true;
  }

  public playerIsFinishedWithResearchPhase(player: Player): void {
    this.researchedPlayers.add(player.id);
    if (this.allPlayersHaveFinishedResearch()) {
      this.deferredActions.runAll(() => {
        this.phase = Phase.ACTION;
        this.passedPlayers.clear();
        this.startActionsForPlayer(this.first);
      });
    }
  }

  public playerIsFinishedWithDraftingPhase(initialDraft: boolean, player: Player, cards : Array<IProjectCard>): void {
    this.draftedPlayers.add(player.id);
    this.unDraftedCards.set(player.id, cards);

    player.needsToDraft = false;
    if (this.allPlayersHaveFinishedDraft() === false) {
      return;
    }

    // If more than 1 card are to be passed to the next player, that means we're still drafting
    if (cards.length > 1) {
      this.draftRound++;
      this.runDraftRound(initialDraft);
      return;
    }

    // Push last card for each player
    this.players.forEach((player) => {
      const lastCards = this.unDraftedCards.get(this.getDraftCardsFrom(player));
      if (lastCards !== undefined) {
        player.draftedCards.push(...lastCards);
      }
      player.needsToDraft = undefined;

      if (initialDraft) {
        if (this.initialDraftIteration === 2) {
          player.dealtProjectCards = player.draftedCards;
          player.draftedCards = [];
        } else if (this.initialDraftIteration === 3) {
          player.dealtPreludeCards = player.draftedCards;
          player.draftedCards = [];
        }
      }
    });

    if (initialDraft === false) {
      this.gotoResearchPhase();
      return;
    }

    if (this.initialDraftIteration === 1) {
      this.initialDraftIteration++;
      this.draftRound = 1;
      this.runDraftRound(true);
    } else if (this.initialDraftIteration === 2 && this.gameOptions.preludeExtension) {
      this.initialDraftIteration++;
      this.draftRound = 1;
      this.runDraftRound(true, true);
    } else {
      this.gotoInitialResearchPhase();
    }
  }

  private getDraftCardsFrom(player: Player): PlayerId {
    let nextPlayer: Player | undefined;

    // Change initial draft direction on second iteration
    if (this.generation === 1 && this.initialDraftIteration === 2) {
      nextPlayer = this.getPreviousPlayer(this.players, player);
    } else if (this.generation % 2 === 1) {
      nextPlayer = this.getNextPlayer(this.players, player);
    } else {
      nextPlayer = this.getPreviousPlayer(this.players, player);
    }

    if (nextPlayer !== undefined) {
      return nextPlayer.id;
    }
    return player.id;
  }

  private getNextDraft(player: Player): Player {
    let nextPlayer = this.getNextPlayer(this.players, player);
    if (this.generation%2 === 1) {
      nextPlayer = this.getPreviousPlayer(this.players, player);
    }
    // Change initial draft direction on second iteration
    if (this.initialDraftIteration === 2 && this.generation === 1) {
      nextPlayer = this.getNextPlayer(this.players, player);
    }

    if (nextPlayer !== undefined) {
      return nextPlayer;
    }
    return player;
  }

  private getPreviousPlayer(
    players: Array<Player>, player: Player,
  ): Player | undefined {
    const playerIndex: number = players.indexOf(player);

    // The player was not found
    if (playerIndex === -1) {
      return undefined;
    }

    // Go to the end of the array if stand at the start
    return players[(playerIndex === 0) ? players.length - 1 : playerIndex - 1];
  }

  private getNextPlayer(
    players: Array<Player>, player: Player,
  ): Player | undefined {
    const playerIndex: number = players.indexOf(player);

    // The player was not found
    if (playerIndex === -1) {
      return undefined;
    }

    // Go to the beginning of the array if we reached the end
    return players[(playerIndex + 1 >= players.length) ? 0 : playerIndex + 1];
  }


  public playerIsFinishedTakingActions(): void {
    // Deferred actions hook
    if (this.deferredActions.length > 0) {
      this.deferredActions.runAll(() => this.playerIsFinishedTakingActions());
      return;
    }

    if (this.allPlayersHavePassed()) {
      this.gotoProductionPhase();
      return;
    }

    const nextPlayer = this.getNextPlayer(this.players, this.getPlayerById(this.activePlayer));

    // Defensive coding to fail fast, if we don't find the next
    // player we are in an unexpected game state
    if (nextPlayer === undefined) {
      throw new Error('Did not find player');
    }

    if (!this.hasPassedThisActionPhase(nextPlayer)) {
      this.startActionsForPlayer(nextPlayer);
    } else {
      // Recursively find the next player
      this.activePlayer = nextPlayer.id;
      this.playerIsFinishedTakingActions();
    }
  }

  private gotoEndGame(): void {
    // Log id or cloned game id
    if (this.clonedGamedId !== undefined && this.clonedGamedId.startsWith('#')) {
      this.log('This game was a clone from game ' + this.clonedGamedId);
    } else {
      this.log('This game id was ' + this.id);
    }

    Database.getInstance().cleanSaves(this.id, this.lastSaveId);
    const scores: Array<Score> = [];
    this.players.forEach((player) => {
      let corponame: String = '';
      if (player.corporationCard !== undefined) {
        corponame = player.corporationCard.name;
      }
      scores.push({corporation: corponame, playerScore: player.victoryPointsBreakdown.total});
    });

    Database.getInstance().saveGameResults(this.id, this.players.length, this.generation, this.gameOptions, scores);
    if (this.phase === Phase.END) return;
    this.phase = Phase.END;
  }

  public canPlaceGreenery(player: Player): boolean {
    return !this.donePlayers.has(player.id) &&
            player.plants >= player.plantsNeededForGreenery &&
            this.board.getAvailableSpacesForGreenery(player).length > 0;
  }

  public playerIsDoneWithGame(player: Player): void {
    this.donePlayers.add(player.id);
    this.gotoFinalGreeneryPlacement();
  }

  private gotoFinalGreeneryPlacement(): void {
    const players: Player[] = [];

    this.players.forEach((player) => {
      if (this.canPlaceGreenery(player)) {
        players.push(player);
      } else {
        this.donePlayers.add(player.id);
      }
    });

    // If no players can place greeneries we are done
    if (players.length === 0) {
      this.gotoEndGame();
      return;
    }

    // iterate through players in order and allow them to convert plants
    // into greenery if possible, there needs to be spaces available for
    // greenery and the player needs enough plants
    let firstPlayer: Player | undefined = this.first;
    while (
      firstPlayer !== undefined && players.includes(firstPlayer) === false
    ) {
      firstPlayer = this.getNextPlayer(this.players, firstPlayer);
    }

    if (firstPlayer !== undefined) {
      this.startFinalGreeneryPlacement(firstPlayer);
    } else {
      throw new Error('Was no player left to place final greenery');
    }
  }

  private startFinalGreeneryPlacement(player: Player) {
    this.activePlayer = player.id;
    player.takeActionForFinalGreenery();
  }

  private startActionsForPlayer(player: Player) {
    this.activePlayer = player.id;
    player.actionsTakenThisRound = 0;

    player.takeAction();
  }

  public increaseOxygenLevel(player: Player, increments: -1 | 1 | 2): undefined {
    if (this.oxygenLevel >= constants.MAX_OXYGEN_LEVEL) {
      return undefined;
    }

    // PoliticalAgendas Reds P3 hook
    if (increments === -1) {
      this.oxygenLevel = Math.max(constants.MIN_OXYGEN_LEVEL, this.oxygenLevel + increments);
      return undefined;
    }

    // Literal typing makes |increments| a const
    const steps = Math.min(increments, constants.MAX_OXYGEN_LEVEL - this.oxygenLevel);

    if (this.phase !== Phase.SOLAR) {
      TurmoilHandler.onGlobalParameterIncrease(player, GlobalParameter.OXYGEN, steps);
      player.increaseTerraformRatingSteps(steps);
    }
    if (this.oxygenLevel < 8 && this.oxygenLevel + steps >= 8) {
      this.increaseTemperature(player, 1);
    }

    this.oxygenLevel += steps;

    AresHandler.ifAres(this, (aresData) => {
      AresHandler.onOxygenChange(this, aresData);
    });
    
    SilverCubeHandler.onOxygenIncrease(player, this);

    return undefined;
  }

  public getOxygenLevel(): number {
    return this.oxygenLevel;
  }

  public increaseVenusScaleLevel(player: Player, increments: -2 | -1 | 1 | 2 | 3): SelectSpace | undefined {
    if (this.venusScaleLevel >= constants.MAX_VENUS_SCALE) {
      return undefined;
    }

    // PoliticalAgendas Reds P3 hook
    if (increments === -1 || increments === -2) {
      this.venusScaleLevel = Math.max(constants.MIN_VENUS_SCALE, this.venusScaleLevel + increments * 2);
      return undefined;
    }

    // Literal typing makes |increments| a const
    const steps = Math.min(increments, (constants.MAX_VENUS_SCALE - this.venusScaleLevel) / 2);

    if (this.phase !== Phase.SOLAR) {
      if (this.venusScaleLevel < 8 && this.venusScaleLevel + steps * 2 >= 8) {
        player.drawCard();
      }
      if (this.venusScaleLevel < 16 && this.venusScaleLevel + steps * 2 >= 16) {
        player.increaseTerraformRating();
      }

      TurmoilHandler.onGlobalParameterIncrease(player, GlobalParameter.VENUS, steps);
      player.increaseTerraformRatingSteps(steps);
    }

    // Check for Aphrodite corporation
    const aphrodite = this.players.find((player) => player.isCorporation(CardName.APHRODITE));
    if (aphrodite !== undefined) {
      aphrodite.megaCredits += steps * 2;
    }

    this.venusScaleLevel += steps * 2;
    SilverCubeHandler.onVenusIncrease(player, this);

    return undefined;
  }

  public getVenusScaleLevel(): number {
    return this.venusScaleLevel;
  }

  public increaseTemperature(player: Player, increments: -2 | -1 | 1 | 2 | 3): undefined {
    if (increments === -2 || increments === -1) {
      this.temperature = Math.max(constants.MIN_TEMPERATURE, this.temperature + increments * 2);
      return undefined;
    }

    if (this.temperature >= constants.MAX_TEMPERATURE) {
      return undefined;
    }

    // Literal typing makes |increments| a const
    const steps = Math.min(increments, (constants.MAX_TEMPERATURE - this.temperature) / 2);

    if (this.phase !== Phase.SOLAR) {
      // BONUS FOR HEAT PRODUCTION AT -20 and -24
      if (this.temperature < -24 && this.temperature + steps * 2 >= -24) {
        player.addProduction(Resources.HEAT);
      }
      if (this.temperature < -20 && this.temperature + steps * 2 >= -20) {
        player.addProduction(Resources.HEAT);
      }

      TurmoilHandler.onGlobalParameterIncrease(player, GlobalParameter.TEMPERATURE, steps);
      player.increaseTerraformRatingSteps(steps);
    }

    // BONUS FOR OCEAN TILE AT 0
    if (this.temperature < 0 && this.temperature + steps * 2 >= 0) {
      this.defer(new PlaceOceanTile(player, 'Select space for ocean from temperature increase'));
    }

    this.temperature += steps * 2;

    AresHandler.ifAres(this, (aresData) => {
      AresHandler.onTemperatureChange(this, aresData);
    });

    SilverCubeHandler.onTemperatureIncrease(player, this);

    return undefined;
  }

  public getTemperature(): number {
    return this.temperature;
  }

  public checkMinRequirements(player: Player, parameter: GlobalParameter, level: number): boolean {
    return this.checkRequirements(player, parameter, level);
  }

  public checkMaxRequirements(player: Player, parameter: GlobalParameter, level: number): boolean {
    return this.checkRequirements(player, parameter, level, true);
  }

  public checkRequirements(player: Player, parameter: GlobalParameter, level: number, max: boolean = false): boolean {
    let currentLevel: number;
    let playerRequirementsBonus: number = player.getRequirementsBonus(parameter);

    switch (parameter) {
    case GlobalParameter.OCEANS:
      currentLevel = this.board.getOceansOnBoard();
      break;
    case GlobalParameter.OXYGEN:
      currentLevel = this.getOxygenLevel();
      break;
    case GlobalParameter.TEMPERATURE:
      currentLevel = this.getTemperature();
      playerRequirementsBonus *= 2;
      break;

    case GlobalParameter.VENUS:
      currentLevel = this.getVenusScaleLevel();
      playerRequirementsBonus *= 2;
      break;

    case GlobalParameter.MOON_COLONY_RATE:
      currentLevel = MoonExpansion.moonData(player.game).colonyRate;
      break;
    case GlobalParameter.MOON_MINING_RATE:
      currentLevel = MoonExpansion.moonData(player.game).miningRate;
      break;
    case GlobalParameter.MOON_LOGISTICS_RATE:
      currentLevel = MoonExpansion.moonData(player.game).logisticRate;
      break;

    default:
      console.warn(`Unknown GlobalParameter provided: ${parameter}`);
      return false;
    }

    if (max) {
      return currentLevel <= level + playerRequirementsBonus;
    } else {
      return currentLevel >= level - playerRequirementsBonus;
    }
  }

  public getGeneration(): number {
    return this.generation;
  }

  public getPassedPlayers():Array<Color> {
    const passedPlayersColors: Array<Color> = [];
    this.passedPlayers.forEach((player) => {
      passedPlayersColors.push(this.getPlayerById(player).color);
    });
    return passedPlayersColors;
  }

  public getDraftedPlayers():Array<Color> {
    const draftedPlayersColors: Array<Color> = [];
    this.draftedPlayers.forEach((player) => {
      draftedPlayersColors.push(this.getPlayerById(player).color);
    });
    return draftedPlayersColors;
  }

  public getResearchedPlayers():Array<Color> {
    const researchedPlayersColors: Array<Color> = [];
    this.researchedPlayers.forEach((player) => {
      researchedPlayersColors.push(this.getPlayerById(player).color);
    });
    return researchedPlayersColors;
  }

  public getPlayer(name: string): Player {
    const player = this.players.find((player) => player.name === name);
    if (player === undefined) {
      throw new Error('Player not found');
    }
    return player;
  }

  public getCitiesInPlayOnMars(): number {
    return this.board.spaces.filter(
      (space) => Board.isCitySpace(space) && space.spaceType !== SpaceType.COLONY).length;
  }
  public getCitiesInPlay(): number {
    return this.board.spaces.filter((space) => Board.isCitySpace(space)).length;
  }
  public getSpaceCount(tileType: TileType, player: Player): number {
    return this.board.spaces.filter(
      (space) => space.tile !== undefined &&
                  space.tile.tileType === tileType &&
                  space.player !== undefined &&
                  space.player === player,
    ).length;
  }

  // addTile applies to the Mars board, but not the Moon board, see MoonExpansion.addTile for placing
  // a tile on The Moon.
  public addTile(
    player: Player, spaceType: SpaceType,
    space: ISpace, tile: ITile): void {
    // Part 1, basic validation checks.

    if (space.tile !== undefined && !this.gameOptions.aresExtension) {
      throw new Error('Selected space is occupied');
    }

    // Land claim a player can claim land for themselves
    if (space.player !== undefined && space.player !== player) {
      throw new Error('This space is land claimed by ' + space.player.name);
    }

    if (space.spaceType !== spaceType && !space.bonus.includes(SpaceBonus.COVE)) {
      throw new Error(
        `Select a valid location ${space.spaceType} is not ${spaceType}`,
      );
    }
    AresHandler.ifAres(this, () => {
      if (!AresHandler.canCover(space, tile)) {
        throw new Error('Selected space is occupied: ' + space.id);
      }
    });

    // Oceans are not subject to Ares adjacency production penalties.
    const subjectToHazardAdjacency = tile.tileType !== TileType.OCEAN;

    AresHandler.ifAres(this, () => {
      AresHandler.assertCanPay(player, space, subjectToHazardAdjacency);
    });

    // Part 2. Collect additional fees.
    // Adjacency costs are before the hellas ocean tile because this is a mandatory cost.
    AresHandler.ifAres(this, () => {
      AresHandler.payAdjacencyAndHazardCosts(player, space, subjectToHazardAdjacency);
    });

    // Hellas special requirements ocean tile
    if (space.id === SpaceName.HELLAS_OCEAN_TILE &&
        this.board.getOceansOnBoard() < constants.MAX_OCEAN_TILES &&
        this.gameOptions.boardName === BoardName.HELLAS) {
      if (player.color !== Color.NEUTRAL) {
        this.defer(new PlaceOceanTile(player, 'Select space for ocean from placement bonus'));
        this.defer(new SelectHowToPayDeferred(player, 6, {title: 'Select how to pay for placement bonus ocean'}));
      }
    }

    TurmoilHandler.resolveTilePlacementCosts(player);

    // Vastitas Borealis special requirements temperature tile
    if (space.id === SpaceName.VASTITAS_BOREALIS_NORTH_POLE && this.temperature < constants.MAX_TEMPERATURE && this.gameOptions.boardName === BoardName.VASTITAS_BOREALIS) {
      if (player.color !== Color.NEUTRAL) {
        this.defer(new DeferredAction(player, () => this.increaseTemperature(player, 1)));
        this.defer(new SelectHowToPayDeferred(player, 3, {title: 'Select how to pay for placement bonus temperature'}));
      }
    }

    // Part 3. Setup for bonuses
    const arcadianCommunityBonus = space.player === player && player.isCorporation(CardName.ARCADIAN_COMMUNITIES);
    const initialTileTypeForAres = space.tile?.tileType;
    const coveringExistingTile = space.tile !== undefined;

    // Part 4. Place the tile
    this.simpleAddTile(player, space, tile);

    // Part 5. Collect the bonuses
    if (this.phase !== Phase.SOLAR) {
      if (!coveringExistingTile) {
        space.bonus.forEach((spaceBonus) => {
          this.grantSpaceBonus(player, spaceBonus);
        });
      }

      this.board.getAdjacentSpaces(space).forEach((adjacentSpace) => {
        if (Board.isOceanSpace(adjacentSpace)) {
          player.megaCredits += player.oceanBonus;
        }
      });

      AresHandler.ifAres(this, (aresData) => {
        AresHandler.earnAdjacencyBonuses(aresData, player, space);
      });

      TurmoilHandler.resolveTilePlacementBonuses(player, spaceType);

      if (arcadianCommunityBonus) {
        this.defer(new GainResources(player, Resources.MEGACREDITS, {count: 3}));
      }
    } else {
      space.player = undefined;
    }

    this.players.forEach((p) => {
      p.corporationCard?.onTilePlaced?.(p, player, space, BoardType.MARS);
      p.playedCards.forEach((playedCard) => {
        playedCard.onTilePlaced?.(p, player, space, BoardType.MARS);
      });
    });


    AresHandler.ifAres(this, () => {
      AresHandler.grantBonusForRemovingHazard(player, initialTileTypeForAres);
    });
  }

  public simpleAddTile(player: Player, space: ISpace, tile: ITile) {
    space.tile = tile;
    space.player = tile.tileType !== TileType.OCEAN ? player : undefined;
    LogHelper.logTilePlacement(player, space, tile.tileType);
  }

  public grantSpaceBonus(player: Player, spaceBonus: SpaceBonus) {
    if (spaceBonus === SpaceBonus.DRAW_CARD) {
      player.drawCard();
    } else if (spaceBonus === SpaceBonus.PLANT) {
      player.plants++;
    } else if (spaceBonus === SpaceBonus.STEEL) {
      player.steel++;
    } else if (spaceBonus === SpaceBonus.TITANIUM) {
      player.titanium++;
    } else if (spaceBonus === SpaceBonus.HEAT) {
      player.heat++;
    } else if (spaceBonus === SpaceBonus.ANIMAL) {
      const animalCards = player.getResourceCards(ResourceType.ANIMAL);

      if (animalCards.length === 1) {
        player.addResourceTo(animalCards[0], 1);
        LogHelper.logAddResource(player, animalCards[0]);
      } else if (animalCards.length > 1) {
        this.defer(new AddResourcesToCard(player, ResourceType.ANIMAL));
      }
    } else if (spaceBonus === SpaceBonus.MICROBE) {
      const microbeCards = player.getResourceCards(ResourceType.MICROBE);

      if (microbeCards.length === 1) {
        player.addResourceTo(microbeCards[0], 1);
        LogHelper.logAddResource(player, microbeCards[0]);
      } else if (microbeCards.length > 1) {
        this.defer(new AddResourcesToCard(player, ResourceType.MICROBE));
      }
    }
  }

  public addGreenery(
    player: Player, spaceId: SpaceId,
    spaceType: SpaceType = SpaceType.LAND,
    shouldRaiseOxygen: boolean = true): undefined {
    this.addTile(player, spaceType, this.board.getSpace(spaceId), {
      tileType: TileType.GREENERY,
    });
    // Turmoil Greens ruling policy
    PartyHooks.applyGreensRulingPolicy(player, this.board.getSpace(spaceId));

    if (shouldRaiseOxygen) return this.increaseOxygenLevel(player, 1);
    return undefined;
  }

  public addCityTile(
    player: Player, spaceId: SpaceId, spaceType: SpaceType = SpaceType.LAND,
    cardName: string | undefined = undefined): void {
    const space = this.board.getSpace(spaceId);
    this.addTile(player, spaceType, space, {
      tileType: TileType.CITY,
      card: cardName,
    });
  }

  public addOceanTile(
    player: Player, spaceId: SpaceId,
    spaceType: SpaceType = SpaceType.OCEAN): void {
    if (this.board.getOceansOnBoard() === constants.MAX_OCEAN_TILES) {
      return;
    }
    this.addTile(player, spaceType, this.board.getSpace(spaceId), {
      tileType: TileType.OCEAN,
    });
    if (this.phase !== Phase.SOLAR) {
      TurmoilHandler.onGlobalParameterIncrease(player, GlobalParameter.OCEANS);
      player.increaseTerraformRating();
    }
    AresHandler.ifAres(this, (aresData) => {
      AresHandler.onOceanPlaced(aresData, player);
    });

    SilverCubeHandler.onOceanPlaced(player, this);
  }

  public removeTile(spaceId: string): void {
    const space = this.board.getSpace(spaceId);
    space.tile = undefined;
    space.player = undefined;
  }

  public getPlayers(): Array<Player> {
    // We always return them in turn order
    const ret: Array<Player> = [];
    let insertIdx: number = 0;
    for (const p of this.players) {
      if (p.id === this.first.id || insertIdx > 0) {
        ret.splice(insertIdx, 0, p);
        insertIdx ++;
      } else {
        ret.push(p);
      }
    }
    return ret;
  }

  public getCardPlayer(name: string): Player {
    for (const player of this.players) {
      // Check cards player has played
      for (const card of player.playedCards) {
        if (card.name === name) {
          return player;
        }
      }
      // Check player corporation
      if (player.corporationCard !== undefined && player.corporationCard.name === name) {
        return player;
      }
    }
    throw new Error('No player has played requested card');
  }
  public getCard(name: string): IProjectCard | undefined {
    for (let i = 0; i < this.players.length; i++) {
      for (let j = 0; j < this.players[i].playedCards.length; j++) {
        if (this.players[i].playedCards[j].name === name) {
          return this.players[i].playedCards[j];
        }
      }
    }
    return undefined;
  }

  public getCardsInHandByResource(player: Player, resourceType: ResourceType) {
    return player.cardsInHand.filter((card) => card.resourceType === resourceType);
  }

  public getCardsInHandByType(player: Player, cardType: CardType) {
    return player.cardsInHand.filter((card) => card.cardType === cardType);
  }

  public log(message: string, f?: (builder: LogBuilder) => void) {
    const builder = new LogBuilder(message);
    if (f) {
      f(builder);
    }
    this.gameLog.push(builder.logMessage());
    this.gameAge++;
  }

  public someoneHasResourceProduction(resource: Resources, minQuantity: number = 1): boolean {
    // in soloMode you don't have to decrease resources
    return this.getPlayers().some((p) => p.getProduction(resource) >= minQuantity) || this.isSoloMode();
  }

  public discardForCost(toPlace: TileType) {
    const card = this.dealer.dealCard(this);
    this.dealer.discard(card);
    this.log('Drew and discarded ${0} (cost ${1}) to place a ${2}', (b) => b.card(card).number(card.cost).tileType(toPlace));
    return card.cost;
  }

  public getSpaceByOffset(direction: -1 | 1, toPlace: TileType) {
    const cost = this.discardForCost(toPlace);

    const distance = Math.max(cost-1, 0); // Some cards cost zero.
    const space = this.board.getNthAvailableLandSpace(distance, direction, undefined /* player */,
      (space) => {
        const adjacentSpaces = this.board.getAdjacentSpaces(space);
        return adjacentSpaces.filter((sp) => sp.tile?.tileType === TileType.CITY).length === 0 && // no cities nearby
            adjacentSpaces.find((sp) => this.board.canPlaceTile(sp)) !== undefined; // can place forest nearby
      });
    if (space === undefined) {
      throw new Error('Couldn\'t find space when card cost is ' + cost);
    }
    return space;
  }

  public static deserialize(d: SerializedGame): Game {
    const gameOptions = d.gameOptions;

    const players = d.players.map((element: SerializedPlayer) => Player.deserialize(element));
    const first = players.find((player) => player.id === d.first);
    if (first === undefined) {
      throw new Error(`Player ${d.first} not found when rebuilding First Player`);
    }

    const playersForBoard = players.length !== 1 ? players : [players[0], GameSetup.neutralPlayerFor(d.id)];
    let board;
    if (gameOptions.boardName === BoardName.ELYSIUM) {
      board = ElysiumBoard.deserialize(d.board, playersForBoard);
    } else if (gameOptions.boardName === BoardName.HELLAS) {
      board = HellasBoard.deserialize(d.board, playersForBoard);
    } else if (gameOptions.boardName === BoardName.AMAZONIS) {
      board = AmazonisBoard.deserialize(d.board, playersForBoard);
    } else if (gameOptions.boardName === BoardName.ARABIA_TERRA) {
      board = ArabiaTerraBoard.deserialize(d.board, playersForBoard);
    } else if (gameOptions.boardName === BoardName.VASTITAS_BOREALIS) {
      board = VastitasBorealisBoard.deserialize(d.board, playersForBoard);
    } else {
      board = OriginalBoard.deserialize(d.board, playersForBoard);
    }

    // Rebuild dealer object to be sure that we will have cards in the same order
    const dealer = Dealer.deserialize(d.dealer);
    const game = new Game(d.id, players, first, d.activePlayer, gameOptions, d.seed, board, dealer);
    game.spectatorId = d.spectatorId;

    const milestones: Array<IMilestone> = [];
    d.milestones.forEach((element: IMilestone) => {
      ALL_MILESTONES.forEach((ms: IMilestone) => {
        if (ms.name === element.name) {
          milestones.push(ms);
        }
      });
    });

    game.milestones = milestones;
    game.claimedMilestones = deserializeClaimedMilestones(d.claimedMilestones, players, milestones);

    const awards: Array<IAward> = [];
    d.awards.forEach((element: IAward) => {
      // TODO(kberg): remove by 2021-03-30
      if (element.name === 'Entrepeneur') {
        element.name = 'Entrepreneur';
      }
      ALL_AWARDS.forEach((award: IAward) => {
        if (award.name === element.name) {
          awards.push(award);
        }
      });
    });

    game.awards = awards;
    game.fundedAwards = deserializeFundedAwards(d.fundedAwards, players, awards);

    if (gameOptions.aresExtension) {
      game.aresData = d.aresData;
      game.erodedSpaces = d.erodedSpaces;
    }

    // Reload colonies elements if needed
    if (gameOptions.coloniesExtension) {
      game.colonyDealer = new ColonyDealer();

      if (d.colonyDealer !== undefined) {
        game.colonyDealer.discardedColonies = loadColoniesFromJSON(d.colonyDealer.discardedColonies);
      }

      game.colonies = loadColoniesFromJSON(d.colonies);
    }

    // Reload turmoil elements if needed
    if (d.turmoil && gameOptions.turmoilExtension) {
      game.turmoil = Turmoil.deserialize(d.turmoil, gameOptions.societyExpansion, gameOptions.randomTurmoil);
    }

    // Reload moon elements if needed
    if (d.moonData !== undefined && gameOptions.moonExpansion === true) {
      game.moonData = IMoonData.deserialize(d.moonData, players);
    }

    game.passedPlayers = new Set<PlayerId>(d.passedPlayers);
    game.donePlayers = new Set<PlayerId>(d.donePlayers);
    game.researchedPlayers = new Set<PlayerId>(d.researchedPlayers);
    game.draftedPlayers = new Set<PlayerId>(d.draftedPlayers);

    const cardFinder = new CardFinder();
    // Reinit undrafted cards map
    game.unDraftedCards = new Map<PlayerId, IProjectCard[]>();
    d.unDraftedCards.forEach((unDraftedCard) => {
      game.unDraftedCards.set(unDraftedCard[0], cardFinder.cardsFromJSON(unDraftedCard[1]));
    });

    game.lastSaveId = d.lastSaveId;
    game.clonedGamedId = d.clonedGamedId;
    game.gameAge = d.gameAge;
    game.gameLog = d.gameLog;
    game.generation = d.generation;
    game.phase = d.phase;
    game.oxygenLevel = d.oxygenLevel;
    game.undoCount = d.undoCount ?? 0;
    game.temperature = d.temperature;
    game.venusScaleLevel = d.venusScaleLevel;
    game.activePlayer = d.activePlayer;
    game.draftRound = d.draftRound;
    game.initialDraftIteration = d.initialDraftIteration;
    game.monsInsuranceOwner = d.monsInsuranceOwner;
    game.unitedNationsMissionOneOwner = d.unitedNationsMissionOneOwner;
    game.athenaOwner = d.athenaOwner;
    game.someoneHasRemovedOtherPlayersPlants = d.someoneHasRemovedOtherPlayersPlants;
    game.temperatureSilverCubeBonusMC = d.temperatureSilverCubeBonusMC;
    game.oceansSilverCubeBonusMC = d.oceansSilverCubeBonusMC;
    game.oxygenSilverCubeBonusMC = d.oxygenSilverCubeBonusMC;
    game.venusSilverCubeBonusMC = d.venusSilverCubeBonusMC;
    game.syndicatePirateRaider = d.syndicatePirateRaider;

    // Still in Draft or Research of generation 1
    if (game.generation === 1 && players.some((p) => p.corporationCard === undefined)) {
      if (game.phase === Phase.INITIALDRAFTING) {
        if (game.initialDraftIteration === 3) {
          game.runDraftRound(true, true);
        } else {
          game.runDraftRound(true);
        }
      } else {
        game.gotoInitialResearchPhase();
      }
    } else if (game.phase === Phase.DRAFTING) {
      game.runDraftRound();
    } else if (game.phase === Phase.RESEARCH) {
      game.gotoResearchPhase();
    } else {
      // We should be in ACTION phase, let's prompt the active player for actions
      game.getPlayerById(game.activePlayer).takeAction();
    }

    return game;
  }
}
