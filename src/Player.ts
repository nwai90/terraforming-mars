import * as constants from './constants';
import {DEFAULT_FLOATERS_VALUE, DEFAULT_GRAPHENE_VALUE, DEFAULT_MICROBES_VALUE, DEFAULT_PLANT_VALUE, ENERGY_TRADE_COST, MAX_FLEET_SIZE, MC_TRADE_COST, MILESTONE_COST, POLITICAL_AGENDAS_MAX_ACTION_USES, REDS_RULING_POLICY_COST, TITANIUM_TRADE_COST} from './constants';
import {AndOptions} from './inputs/AndOptions';
import {Aridor} from './cards/colonies/Aridor';
import {Board} from './boards/Board';
import {CardFinder} from './CardFinder';
import {CardName} from './CardName';
import {CardType} from './cards/CardType';
import {ColonyModel} from './models/ColonyModel';
import {ColonyName} from './colonies/ColonyName';
import {Color} from './Color';
import {CorporationCard} from './cards/corporation/CorporationCard';
import {Game} from './Game';
import {HowToPay} from './inputs/HowToPay';
import {IAward} from './awards/IAward';
import {ICard, IResourceCard} from './cards/ICard';
import {Colony} from './colonies/Colony';
import {ISerializable} from './ISerializable';
import {IMilestone} from './milestones/IMilestone';
import {IProjectCard} from './cards/IProjectCard';
import {ITagCount} from './ITagCount';
import {LogMessageDataType} from './LogMessageDataType';
import {MiningCard} from './cards/base/MiningCard';
import {OrOptions} from './inputs/OrOptions';
import {PartyHooks} from './turmoil/parties/PartyHooks';
import {PartyName} from './turmoil/parties/PartyName';
import {PharmacyUnion} from './cards/promo/PharmacyUnion';
import {Phase} from './Phase';
import {PlayerInput} from './PlayerInput';
import {ResourceType} from './ResourceType';
import {Resources} from './Resources';
import {SelectAmount} from './inputs/SelectAmount';
import {SelectCard} from './inputs/SelectCard';
import {SellPatentsStandardProject} from './cards/base/standardProjects/SellPatentsStandardProject';
import {SendDelegateToArea} from './deferredActions/SendDelegateToArea';
import {DeferredAction, Priority} from './deferredActions/DeferredAction';
import {SelectHowToPayDeferred} from './deferredActions/SelectHowToPayDeferred';
import {SelectColony} from './inputs/SelectColony';
import {SelectPartyToSendDelegate} from './inputs/SelectPartyToSendDelegate';
import {SelectDelegate} from './inputs/SelectDelegate';
import {SelectHowToPay} from './inputs/SelectHowToPay';
import {SelectHowToPayForProjectCard} from './inputs/SelectHowToPayForProjectCard';
import {SelectOption} from './inputs/SelectOption';
import {SelectPlayer} from './inputs/SelectPlayer';
import {SelectSpace} from './inputs/SelectSpace';
import {RobotCard, SelfReplicatingRobots} from './cards/promo/SelfReplicatingRobots';
import {SerializedCard} from './SerializedCard';
import {SerializedPlayer} from './SerializedPlayer';
import {SpaceType} from './SpaceType';
import {StormCraftIncorporated} from './cards/colonies/StormCraftIncorporated';
import {Tags} from './cards/Tags';
import {TileType} from './TileType';
import {VictoryPointsBreakdown} from './VictoryPointsBreakdown';
import {SelectProductionToLose} from './inputs/SelectProductionToLose';
import {IAresGlobalParametersResponse, ShiftAresGlobalParameters} from './inputs/ShiftAresGlobalParameters';
import {Timer} from './Timer';
import {TurmoilHandler} from './turmoil/TurmoilHandler';
import {TurmoilPolicy} from './turmoil/TurmoilPolicy';
import {CardLoader} from './CardLoader';
import {DrawCards} from './deferredActions/DrawCards';
import {Units} from './Units';
import {MoonExpansion} from './moon/MoonExpansion';
import {StandardProjectCard} from './cards/StandardProjectCard';
import {ConvertPlants} from './cards/base/standardActions/ConvertPlants';
import {ConvertPlantsEcoline} from './cards/base/standardActions/ConvertPlantsEcoline';
import {ConvertHeat} from './cards/base/standardActions/ConvertHeat';
import {Manutech} from './cards/venusNext/Manutech';
import {LunaProjectOffice} from './cards/moon/LunaProjectOffice';
import {UnitedNationsMissionOne} from './cards/community/corporations/UnitedNationsMissionOne';
import {SilverCubeHandler} from './community/SilverCubeHandler';
import {MonsInsurance} from './cards/promo/MonsInsurance';
import {GlobalParameter} from './GlobalParameter';
import {GlobalEventName} from './turmoil/globalEvents/GlobalEventName';
import {LogHelper} from './LogHelper';
import {UndoActionOption} from './inputs/UndoActionOption';
import {LawSuit} from './cards/promo/LawSuit';
import {CrashSiteCleanup} from './cards/promo/CrashSiteCleanup';
import {MarsCoalition} from './cards/community/corporations/MarsCoalition';
import {Monument} from './milestones/fanmade/Monument';
import {Awards} from './awards/Awards';
import {TopsoilContract} from './cards/promo/TopsoilContract';
import {MeatIndustry} from './cards/promo/MeatIndustry';
import {Turmoil} from './turmoil/Turmoil';
import {LeaderCard} from './cards/LeaderCard';
import {LeadersExpansion} from './cards/leaders/LeadersExpansion';
import {VanAllen} from './cards/leaders/VanAllen';
import {_AresHazardPlacement} from './ares/AresHazards';
import {ISpace} from './boards/ISpace';
import {Eris} from './cards/ares/Eris';
import {HowToAffordRedsPolicy, RedsPolicy} from './turmoil/RedsPolicy';
import {StandardActionCard} from './cards/StandardActionCard';
import {TurmoilActionCard} from './cards/TurmoilActionCard';
import {KelvinistsDefaultAction} from './cards/turmoil/standardActions/KelvinistsDefaultAction';
import {KelvinistsPolicy3Action} from './cards/turmoil/standardActions/KelvinistsPolicy3Action';
import {ScientistsDefaultAction} from './cards/turmoil/standardActions/ScientistsDefaultAction';
import {GreensPolicy4Action} from './cards/turmoil/standardActions/GreensPolicy4Action';
import {MarsFirstPolicy4Action} from './cards/turmoil/standardActions/MarsFirstPolicy4Action';
import {UnityPolicy2Action} from './cards/turmoil/standardActions/UnityPolicy2Action';
import {UnityPolicy3Action} from './cards/turmoil/standardActions/UnityPolicy3Action';
import {RedsPolicy3Action} from './cards/turmoil/standardActions/RedsPolicy3Action';
import {SpomePolicy2Action} from './cards/turmoil/standardActions/SpomePolicy2Action';
import {SpomePolicy4Action} from './cards/turmoil/standardActions/SpomePolicy4Action';
import {EmpowerDefaultAction} from './cards/turmoil/standardActions/EmpowerDefaultAction';
import {BureaucratsDefaultAction} from './cards/turmoil/standardActions/BureaucratsDefaultAction';
import {BureaucratsPolicy3Action} from './cards/turmoil/standardActions/BureaucratsPolicy3Action';
import {PopulistsPolicy3Action} from './cards/turmoil/standardActions/PopulistsPolicy3Action';
import {TranshumansPolicy2Action} from './cards/turmoil/standardActions/TranshumansPolicy2Action';
import {TranshumansPolicy3Action} from './cards/turmoil/standardActions/TranshumansPolicy3Action';
import {CentristsDefaultAction} from './cards/turmoil/standardActions/CentristsDefaultAction';
import {CentristsPolicy3Action} from './cards/turmoil/standardActions/CentristsPolicy3Action';
import {Supercapacitors} from './cards/promo/Supercapacitors';
import {Card} from './cards/Card';
import {TerraformingDeal} from './cards/preludeTwo/TerraformingDeal';

export type PlayerId = string;
export type Password = string;

export class Player implements ISerializable<SerializedPlayer> {
  public readonly id: PlayerId;
  public password: Password | undefined = undefined;
  protected waitingFor?: PlayerInput;
  protected waitingForCb?: () => void;
  private _game: Game | undefined = undefined;

  // Corporate identity
  public corporationCards: Array<CorporationCard> = [];
  // Used only during set-up
  public pickedCorporationCard: CorporationCard | undefined = undefined;

  // Terraforming Rating
  private terraformRating: number = 20;
  public hasIncreasedTerraformRatingThisGeneration: boolean = false;
  public terraformRatingAtGenerationStart: number = 20;

  // Resources
  public megaCredits: number = 0;
  protected megaCreditProduction: number = 0;
  public steel: number = 0;
  protected steelProduction: number = 0;
  public titanium: number = 0;
  protected titaniumProduction: number = 0;
  public plants: number = 0;
  protected plantProduction: number = 0;
  public energy: number = 0;
  protected energyProduction: number = 0;
  public heat: number = 0;
  protected heatProduction: number = 0;

  // Resource values
  private titaniumValue: number = 3;
  private steelValue: number = 2;
  // Helion
  public canUseHeatAsMegaCredits: boolean = false;

  // This generation / this round
  public actionsTakenThisRound: number = 0;
  public actionsThisGeneration: Set<CardName> = new Set();
  public lastCardPlayed: IProjectCard | undefined;
  public pendingInitialActions: Array<CorporationCard> = [];
  public remainingStallActionsCount: number = 2;
  public canUndoLastAction: boolean = true;

  // Cards
  public dealtCorporationCards: Array<CorporationCard> = [];
  public dealtProjectCards: Array<IProjectCard> = [];
  public dealtPreludeCards: Array<IProjectCard> = [];
  public dealtLeaderCards: Array<IProjectCard> = [];
  public cardsInHand: Array<IProjectCard> = [];
  public preludeCardsInHand: Array<IProjectCard> = [];
  public leaderCardsInHand: Array<IProjectCard> = [];
  public playedCards: Array<IProjectCard> = [];
  public draftedCards: Array<IProjectCard> = [];
  public cardCost: number = constants.CARD_COST;
  public needsToDraft: boolean | undefined = undefined;
  public cardDiscount: number = 0;

  public timer: Timer = Timer.newInstance();
  public hasConceded: boolean = false;

  // Colonies
  private fleetSize: number = 1;
  public tradesThisGeneration: number = 0;
  public hasTradedThisTurn: boolean = false;
  public colonyTradeOffset: number = 0;
  public colonyTradeDiscount: number = 0;
  public colonyVictoryPoints: number = 0;
  // PoliticalAgendas Bureaucrats P2
  public hasBureaucratsColonyTradePenalty: boolean = false;
  // PoliticalAgendas Transhumans P4
  public hasTranshumansColonyTradeOffset: boolean = false;

  // Turmoil
  public turmoilPolicyActionUsed: boolean = false;
  public politicalAgendasActionUsedCount: number = 0;
  public dominantPartyActionUsedCount: number = 0; // Mars Coalition
  public howToAffordReds?: HowToAffordRedsPolicy;
  public victoryPointsBreakdown = new VictoryPointsBreakdown();

  public oceanBonus: number = constants.OCEAN_BONUS;
  // PoliticalAgendas Scientists P4
  public hasTurmoilScienceTagBonus: boolean = false;

  // Custom cards
  // Leavitt Station.
  public scienceTagCount: number = 0;
  // Ecoline
  public plantsNeededForGreenery: number = 8;
  // Lawsuit
  public removingPlayers: Array<PlayerId> = [];
  // For Playwrights corp.
  // removedFromPlayCards is a bit of a misname: it's a temporary storage for
  // cards that provide 'next card' discounts. This will clear between turns.
  public removedFromPlayCards: Array<IProjectCard> = [];
  // Hotsprings
  public heatProductionStepsIncreasedThisGeneration: number = 0;
  // Passer
  public consecutiveFirstPassCount: number = 0;
  // Double Down
  public requirementsBonus: number = 0;
  // Head Start
  public hasUsedHeadStart: boolean = false;
  // Purifier
  public hazardsRemoved: number = 0;

  // Stats
  public totalSpend: number = 0;
  public endGenerationScores: Array<number> = [];
  public actionsTakenThisGame: number = 0;
  public totalDelegatesPlaced: number = 0;
  public totalChairmanshipsWon: number = 0;

  constructor(
    public name: string,
    public color: Color,
    public beginner: boolean,
    public handicap: number = 0,
    id: PlayerId) {
    this.id = id;
  }

  public static initialize(
    name: string,
    color: Color,
    beginner: boolean,
    handicap: number = 0,
    id: PlayerId): Player {
    const player = new Player(name, color, beginner, handicap, id);
    return player;
  }

  public set game(game: Game) {
    if (this._game !== undefined) {
      // TODO(kberg): Replace this with an Error.
      console.warn(`Reinitializing game ${game.id} for player ${this.color}`);
    }
    this._game = game;
  }

  public get game(): Game {
    if (this._game === undefined) {
      throw new Error(`Fetching game for player ${this.color} too soon.`);
    }
    return this._game;
  }

  public isCorporation(corporationName: CardName): boolean {
    return this.corporationCards.some((corp) => corp.name === corporationName);
  }

  public getTitaniumValue(): number {
    if (PartyHooks.shouldApplyPolicy(this, PartyName.UNITY)) return this.titaniumValue + 1;
    if (MarsCoalition.shouldIncreaseMetalValue(this, PartyName.UNITY)) return this.titaniumValue + 1;
    return this.titaniumValue;
  }

  public increaseTitaniumValue(): void {
    this.titaniumValue++;
  }

  public decreaseTitaniumValue(): void {
    if (this.titaniumValue > constants.DEFAULT_TITANIUM_VALUE) {
      this.titaniumValue--;
    }
  }

  public getSelfReplicatingRobotsTargetCards(): Array<RobotCard> {
    return (this.playedCards.find((card) => card instanceof SelfReplicatingRobots) as (SelfReplicatingRobots | undefined))?.targetCards ?? [];
  }

  public getSteelValue(): number {
    if (PartyHooks.shouldApplyPolicy(this, PartyName.MARS, TurmoilPolicy.MARS_FIRST_POLICY_3)) return this.steelValue + 1;
    if (MarsCoalition.shouldIncreaseMetalValue(this, PartyName.MARS, TurmoilPolicy.MARS_FIRST_POLICY_3)) return this.steelValue + 1;
    return this.steelValue;
  }

  public increaseSteelValue(): void {
    this.steelValue++;
  }

  public decreaseSteelValue(): void {
    if (this.steelValue > constants.DEFAULT_STEEL_VALUE) {
      this.steelValue--;
    }
  }

  public getTerraformRating(): number {
    return this.terraformRating;
  }

  public decreaseTerraformRating(log: boolean = false) {
    this.terraformRating--;
    if (log) LogHelper.logGlobalEventTRDecrease(this);
  }

  public increaseTerraformRating() {
    // United Nations Mission One and Terraforming Deal hook
    UnitedNationsMissionOne.onTRIncrease(this.game);
    TerraformingDeal.onTRIncrease(this);

    if (!this.game.gameOptions.turmoilExtension || this.cardIsInEffect(CardName.ZAN)) {
      this.terraformRating++;
      this.hasIncreasedTerraformRatingThisGeneration = true;
      return;
    }

    // Turmoil Reds capacity
    if (PartyHooks.shouldApplyPolicy(this, PartyName.REDS)) {
      if (this.canAfford(REDS_RULING_POLICY_COST)) {
        this.game.defer(new SelectHowToPayDeferred(this, REDS_RULING_POLICY_COST, {title: 'Select how to pay for TR increase'}));
      } else {
        // Cannot pay Reds, will not increase TR
        return;
      }
    }

    this.terraformRating++;
    this.hasIncreasedTerraformRatingThisGeneration = true;
  }

  public increaseTerraformRatingSteps(value: number) {
    for (let i = 0; i < value; i++) {
      this.increaseTerraformRating();
    }

    // Greta CEO hook
    if (this.cardIsInEffect(CardName.GRETA)) {
      const greta = this.playedCards.find((card) => card.name === CardName.GRETA) as LeaderCard;
      greta.onTRIncrease!(this);
    }
  }

  public decreaseTerraformRatingSteps(value: number, log: boolean = false) {
    this.terraformRating -= value;
    if (log) LogHelper.logGlobalEventTRDecrease(this, value);
  }

  public setTerraformRating(value: number) {
    return this.terraformRating = value;
  }

  public getAvailableProductionUnits(): number {
    return (this.getProduction(Resources.MEGACREDITS) + 5) +
      this.getProduction(Resources.STEEL) +
      this.getProduction(Resources.TITANIUM) +
      this.getProduction(Resources.PLANTS) +
      this.getProduction(Resources.ENERGY) +
      this.getProduction(Resources.HEAT);
  }

  public getProduction(resource: Resources): number {
    if (resource === Resources.MEGACREDITS) return this.megaCreditProduction;
    if (resource === Resources.STEEL) return this.steelProduction;
    if (resource === Resources.TITANIUM) return this.titaniumProduction;
    if (resource === Resources.PLANTS) return this.plantProduction;
    if (resource === Resources.ENERGY) return this.energyProduction;
    if (resource === Resources.HEAT) return this.heatProduction;
    throw new Error('Resource ' + resource + ' not found');
  }

  public getResource(resource: Resources): number {
    if (resource === Resources.MEGACREDITS) return this.megaCredits;
    if (resource === Resources.STEEL) return this.steel;
    if (resource === Resources.TITANIUM) return this.titanium;
    if (resource === Resources.PLANTS) return this.plants;
    if (resource === Resources.ENERGY) return this.energy;
    if (resource === Resources.HEAT) return this.heat;
    throw new Error('Resource ' + resource + ' not found');
  }

  private logUnitDelta(resource: Resources, amount: number, unitType: 'production' | 'amount', from: Player | GlobalEventName | undefined, stealing = false) {
    if (amount === 0) return;

    const modifier = amount > 0 ? 'increased' : 'decreased';
    const absAmount = Math.abs(amount);
    let message = '${0}\'s ${1} ' + unitType + ' ${2} by ${3}';

    if (from !== undefined) {
      if (stealing === true) message = message + ' stolen';
      message = message + ' by ' + ((from instanceof Player) ? '${4}' : 'Global Event');
    }

    this.game.log(message, (b) => {
      b.player(this)
        .string(resource)
        .string(modifier)
        .number(absAmount);
      if (from instanceof Player) {
        b.player(from);
      }
    });
  }

  public deductResource(
    resource: Resources,
    amount: number,
    options? : {
      log?: boolean,
      from? : Player | GlobalEventName,
      stealing?: boolean,
    }) {
    const shouldApplyBentenmaruEffect = options?.from !== undefined && options.from instanceof Player && options.from.isCorporation(CardName.BENTENMARU) && options.from.id !== this.id;

    if (shouldApplyBentenmaruEffect) {
      const bentenmaruPlayer = (options!.from as Player);
      bentenmaruPlayer.addResource(resource, amount, options);
    } else {
      this.addResource(resource, -amount, options);
    }
  }

  public addResource(resource: Resources, amount: number = 1, options? : { log?: boolean, from? : Player | GlobalEventName, stealing?: boolean}) {
    const playerAmount = this.getResource(resource);
    const delta = (amount >= 0) ? amount : Math.max(amount, -playerAmount);

    // Error handling for invalid state of negative amount
    if (delta !== amount && options?.from === undefined) {
      this.game.logIllegalState(
        `Adjusting ${amount} ${resource} when player has ${playerAmount}`,
        {player: {color: this.color, id: this.id, name: this.name}, resource, amount},
      );
    }

    if (resource === Resources.MEGACREDITS) this.megaCredits += delta;
    else if (resource === Resources.STEEL) this.steel += delta;
    else if (resource === Resources.TITANIUM) this.titanium += delta;
    else if (resource === Resources.PLANTS) this.plants += delta;
    else if (resource === Resources.ENERGY) this.energy += delta;
    else if (resource === Resources.HEAT) this.heat += delta;
    else {
      throw new Error(`tried to add unsupported resource ${resource}`);
    }

    if (options?.log === true) {
      this.logUnitDelta(resource, delta, 'amount', options.from, options.stealing);
    }

    if (options?.from instanceof Player) {
      LawSuit.resourceHook(this, resource, delta, options.from);
      CrashSiteCleanup.resourceHook(this, resource, delta, options.from);
    }

    // Mons Insurance hook
    if (options?.from !== undefined && delta < 0 && (options.from instanceof Player && options.from.id !== this.id)) {
      MonsInsurance.resolveMonsInsurance(this);
    }
  }

  public addProduction(resource: Resources, amount : number = 1, options? : { log: boolean, from? : Player | GlobalEventName}) {
    const adj = resource === Resources.MEGACREDITS ? -5 : 0;
    const delta = (amount >= 0) ? amount : Math.max(amount, -(this.getProduction(resource) - adj));
    const shouldApplyBentenmaruEffect = delta < 0 && options?.from !== undefined && options.from instanceof Player && options.from.isCorporation(CardName.BENTENMARU) && options.from.id !== this.id;

    if (resource === Resources.MEGACREDITS) {
      if (shouldApplyBentenmaruEffect) {
        (options!.from as Player).addProduction(Resources.MEGACREDITS, Math.abs(delta));
      } else {
        this.megaCreditProduction += delta;
      }
    } else if (resource === Resources.STEEL) {
      if (shouldApplyBentenmaruEffect) {
        (options!.from as Player).addProduction(Resources.STEEL, Math.abs(delta));
      } else {
        this.steelProduction += delta;
      }
    } else if (resource === Resources.TITANIUM) {
      if (shouldApplyBentenmaruEffect) {
        (options!.from as Player).addProduction(Resources.TITANIUM, Math.abs(delta));
      } else {
        this.titaniumProduction += delta;
      }
    } else if (resource === Resources.PLANTS) {
      if (shouldApplyBentenmaruEffect) {
        (options!.from as Player).addProduction(Resources.PLANTS, Math.abs(delta));
      } else {
        this.plantProduction += delta;
      }
    } else if (resource === Resources.ENERGY) {
      const shouldGrantBonusEnergy = PartyHooks.shouldApplyPolicy(this, PartyName.EMPOWER, TurmoilPolicy.EMPOWER_POLICY_3);

      if (shouldApplyBentenmaruEffect) {
        (options!.from as Player).addProduction(Resources.ENERGY, Math.abs(delta));
        if (shouldGrantBonusEnergy) (options!.from as Player).addResource(Resources.ENERGY, 2);
      } else {
        this.energyProduction += delta;
        if (shouldGrantBonusEnergy) this.addResource(Resources.ENERGY, 2);
      }
    } else if (resource === Resources.HEAT) {
      if (shouldApplyBentenmaruEffect) {
        const bentenmaruPlayer = (options!.from as Player);
        const heatProdGained = Math.abs(delta);

        bentenmaruPlayer.addProduction(Resources.HEAT, heatProdGained);
        if (heatProdGained > 0) bentenmaruPlayer.heatProductionStepsIncreasedThisGeneration += amount; // Hotsprings hook
      } else {
        this.heatProduction += delta;
        if (amount > 0) this.heatProductionStepsIncreasedThisGeneration += amount; // Hotsprings hook
      }
    } else {
      throw new Error(`tried to add unsupported production ${resource}`);
    }

    if (options?.log === true) {
      this.logUnitDelta(resource, amount, 'production', options.from);
    }

    if (options?.from instanceof Player) {
      LawSuit.resourceHook(this, resource, delta, options.from);
    }

    // Mons Insurance hook
    if (options?.from !== undefined && delta < 0 && (options.from instanceof Player && options.from.id !== this.id)) {
      MonsInsurance.resolveMonsInsurance(this);
    }

    // Manutech hook
    if (this.isCorporation(CardName.MANUTECH)) {
      Manutech.onProductionGain(this, resource, amount);
    }
  };

  /**
   * `from` steals up to `qty` units of `resource` from this player. Or, at least as
   * much as possible.
   */
  public stealResource(resource: Resources, qty: number, thief: Player) {
    const qtyToSteal = Math.min(this.getResource(resource), qty);
    if (qtyToSteal > 0) {
      this.deductResource(resource, qtyToSteal, {log: true, from: thief, stealing: true});
      thief.addResource(resource, qtyToSteal);
    }
  }

  // Returns true when the player has the supplied units in its inventory.
  public hasUnits(units: Units): boolean {
    return this.megaCredits - units.megacredits >= 0 &&
      this.steel - units.steel >= 0 &&
      this.titanium - units.titanium >= 0 &&
      this.plants - units.plants >= 0 &&
      this.energy - units.energy >= 0 &&
      this.heat - units.heat >= 0;
  }

  public addUnits(units: Partial<Units>, options? : {
    log?: boolean,
    from? : Player | GlobalEventName,
  }) {
    this.addResource(Resources.MEGACREDITS, units.megacredits || 0, options);
    this.addResource(Resources.STEEL, units.steel || 0, options);
    this.addResource(Resources.TITANIUM, units.titanium || 0, options);
    this.addResource(Resources.PLANTS, units.plants || 0, options);
    this.addResource(Resources.ENERGY, units.energy || 0, options);
    this.addResource(Resources.HEAT, units.heat || 0, options);
  }

  public deductUnits(units: Units) {
    this.megaCredits -= units.megacredits;
    this.steel -= units.steel;
    this.titanium -= units.titanium;
    this.plants -= units.plants;
    this.energy -= units.energy;
    this.heat -= units.heat;
  }

  public canAdjustProduction(units: Units): boolean {
    return this.getProduction(Resources.MEGACREDITS) + units.megacredits >= -5 &&
      this.getProduction(Resources.STEEL) + units.steel >= 0 &&
      this.getProduction(Resources.TITANIUM) + units.titanium >= 0 &&
      this.getProduction(Resources.PLANTS) + units.plants >= 0 &&
      this.getProduction(Resources.ENERGY) + units.energy >= 0 &&
      this.getProduction(Resources.HEAT) + units.heat >= 0;
  }

  public adjustProduction(units: Units, options?: {log: boolean, from?: Player}) {
    if (units.megacredits !== undefined) {
      this.addProduction(Resources.MEGACREDITS, units.megacredits, options);
    }

    if (units.steel !== undefined) {
      this.addProduction(Resources.STEEL, units.steel, options);
    }

    if (units.titanium !== undefined) {
      this.addProduction(Resources.TITANIUM, units.titanium, options);
    }

    if (units.plants !== undefined) {
      this.addProduction(Resources.PLANTS, units.plants, options);
    }

    if (units.energy !== undefined) {
      this.addProduction(Resources.ENERGY, units.energy, options);
    }

    if (units.heat !== undefined) {
      this.addProduction(Resources.HEAT, units.heat, options);
    }
  }

  public getActionsThisGeneration(): Set<CardName> {
    return this.actionsThisGeneration;
  }

  public setActionsThisGeneration(cardName: CardName): void {
    this.actionsThisGeneration.add(cardName);
    return;
  }

  public getVictoryPoints(): VictoryPointsBreakdown {
    const victoryPointsBreakdown = new VictoryPointsBreakdown();

    // Victory points from corporations
    this.corporationCards.forEach((corp) => {
      if (corp.getVictoryPoints !== undefined) {
        victoryPointsBreakdown.setVictoryPoints('victoryPoints', corp.getVictoryPoints(this), corp.name);
      }
    });

    // Victory points from cards
    for (const playedCard of this.playedCards) {
      if (playedCard.getVictoryPoints !== undefined) {
        victoryPointsBreakdown.setVictoryPoints('victoryPoints', playedCard.getVictoryPoints(this), playedCard.name);
      }
    }

    // Victory points from TR
    victoryPointsBreakdown.setVictoryPoints('terraformRating', this.terraformRating);

    // Victory points from awards
    Awards.giveAwards(this, victoryPointsBreakdown);

    // Victory points from milestones
    for (const milestone of this.game.claimedMilestones) {
      if (milestone.player !== undefined && milestone.player.id === this.id) {
        victoryPointsBreakdown.setVictoryPoints('milestones', constants.MILESTONE_VP, 'Claimed '+milestone.milestone.name+' milestone');
      }
    }

    // Victory points from board
    this.game.board.spaces.forEach((space) => {
      // Victory points for greenery tiles
      if (space.tile && space.tile.tileType === TileType.GREENERY && space.player !== undefined && space.player.id === this.id) {
        victoryPointsBreakdown.setVictoryPoints('greenery', 1);
      }

      // Victory points for greenery tiles adjacent to cities
      if (Board.isCitySpace(space) && space.player !== undefined && space.player.id === this.id) {
        const adjacent = this.game.board.getAdjacentSpaces(space);
        for (const adj of adjacent) {
          if (adj.tile && adj.tile.tileType === TileType.GREENERY) {
            victoryPointsBreakdown.setVictoryPoints('city', 1);
          }
        }
      }
    });

    // Turmoil Victory Points
    const includeTurmoilVP : boolean = this.game.gameIsOver() || this.game.phase === Phase.END;

    Turmoil.ifTurmoil(this.game, (turmoil) => {
      if (includeTurmoilVP) {
        victoryPointsBreakdown.setVictoryPoints('victoryPoints', turmoil.getPlayerVictoryPoints(this), 'Turmoil Points');
      }
    });

    // Titania Colony VP
    if (this.colonyVictoryPoints > 0) {
      victoryPointsBreakdown.setVictoryPoints('victoryPoints', this.colonyVictoryPoints, 'Colony VP');
    }

    MoonExpansion.calculateVictoryPoints(this, victoryPointsBreakdown);

    // Escape velocity VP penalty
    if (this.game.gameOptions.escapeVelocityMode) {
      const threshold = this.game.gameOptions.escapeVelocityThreshold;
      const period = this.game.gameOptions.escapeVelocityPeriod;
      const penaltyPerMin = this.game.gameOptions.escapeVelocityPenalty ?? 1;
      const elapsedTimeInMinutes = this.timer.getElapsedTimeInMinutes();
      if (threshold !== undefined && period !== undefined && elapsedTimeInMinutes > threshold) {
        const overTimeInMinutes = Math.max(elapsedTimeInMinutes - threshold, 0);

        // Don't lose more VP that what is available
        victoryPointsBreakdown.updateTotal();
        const totalBeforeEscapeVelocity = victoryPointsBreakdown.total;
        const penaltyTotal = Math.min(penaltyPerMin * Math.floor(overTimeInMinutes / period), totalBeforeEscapeVelocity);
        victoryPointsBreakdown.setVictoryPoints('escapeVelocity penalty', -penaltyTotal, 'Escape Velocity Penalty');
      }
    }

    victoryPointsBreakdown.updateTotal();
    return victoryPointsBreakdown;
  }

  public cardIsInEffect(cardName: CardName): boolean {
    return this.playedCards.find(
      (playedCard) => playedCard.name === cardName) !== undefined;
  }

  public hasProtectedHabitats(): boolean {
    return this.cardIsInEffect(CardName.PROTECTED_HABITATS);
  }

  public plantsAreProtected(): boolean {
    return this.hasProtectedHabitats() || this.cardIsInEffect(CardName.ASTEROID_DEFLECTION_SYSTEM);
  }

  public alloysAreProtected(): boolean {
    return this.cardIsInEffect(CardName.LUNAR_SECURITY_STATIONS);
  }

  public getCitiesCount() {
    const board = this.game.board;
    return board.getSpaceCount(TileType.CITY, this) +
        board.getSpaceCount(TileType.CAPITAL, this) +
        board.getSpaceCount(TileType.OCEAN_CITY, this);
  }

  // Return the number of played cards without tags.
  // Wild tags are ignored in this computation as they can also be counted as having no tag
  public getNoTagsCount() {
    let noTagsCount: number = 0;

    // Count all corps with no tags, except flipped Pharmacy Union which is considered to be a played event
    this.corporationCards.filter((c) => c.name !== CardName.PHARMACY_UNION).forEach((corp) => {
      if (corp.tags.filter((tag) => tag !== Tags.WILDCARD).length === 0) {
        noTagsCount++;
      }
    });

    noTagsCount += this.playedCards.filter((card) => card.cardType !== CardType.EVENT && card.tags.filter((tag) => tag !== Tags.WILDCARD).length === 0).length;

    return noTagsCount;
  }

  public getColoniesCount() {
    if (!this.game.gameOptions.coloniesExtension) return 0;

    let coloniesCount: number = 0;

    this.game.colonies.forEach((colony) => {
      coloniesCount += colony.colonies.filter((owner) => owner === this.id).length;
    });

    return coloniesCount;
  }

  public getPlayedEventsCount(): number {
    let count = this.playedCards.filter((card) => card.cardType === CardType.EVENT).length;

    if (this.isCorporation(CardName.PHARMACY_UNION)) {
      const pharmacyUnion = this.corporationCards.find((corp) => corp.name === CardName.PHARMACY_UNION);
      if (pharmacyUnion?.isDisabled) count++;
    }

    return count;
  }

  public getResourcesOnCard(card: ICard): number | undefined {
    if (card.resourceCount !== undefined) {
      return card.resourceCount;
    } else return undefined;
  }

  public getRequirementsBonus(parameter: GlobalParameter): number {
    let requirementsBonus: number = this.requirementsBonus;

    this.corporationCards.forEach((corp) => {
      if (corp.getRequirementBonus !== undefined) {
        requirementsBonus += corp.getRequirementBonus(this, parameter);
      }
    });

    for (const playedCard of this.playedCards) {
      if (playedCard.getRequirementBonus !== undefined &&
          playedCard.getRequirementBonus(this, parameter)) {
        requirementsBonus += playedCard.getRequirementBonus(this, parameter);
      }
    }

    // Playwrights + Special Design replay
    const lastRemovedFromPlayCard = this.removedFromPlayCards[this.removedFromPlayCards.length - 1];
    if (lastRemovedFromPlayCard !== undefined && lastRemovedFromPlayCard.name === CardName.SPECIAL_DESIGN) {
      requirementsBonus += 2;
    }

    // PoliticalAgendas Scientists P2 hook
    if (PartyHooks.shouldApplyPolicy(this, PartyName.SCIENTISTS, TurmoilPolicy.SCIENTISTS_POLICY_2)) {
      requirementsBonus += 2;
    }

    // PoliticalAgendas Transhumans P3 hook
    if (PartyHooks.shouldApplyPolicy(this, PartyName.TRANSHUMANS, TurmoilPolicy.TRANSHUMANS_POLICY_3) && this.turmoilPolicyActionUsed === true) {
      requirementsBonus += 50;
    }

    requirementsBonus = MarsCoalition.getRequirementsBonus(this, requirementsBonus);

    return requirementsBonus;
  }

  public removeResourceFrom(card: ICard, count: number = 1, game? : Game, removingPlayer? : Player, shouldLogAction: boolean = true): void {
    if (card.resourceCount) {
      card.resourceCount = Math.max(card.resourceCount - count, 0);
      // Mons Insurance hook
      if (game !== undefined && removingPlayer !== undefined) {
        if (removingPlayer !== this) MonsInsurance.resolveMonsInsurance(this);

        if (shouldLogAction) {
          game.log('${0} removed ${1} resource(s) from ${2}\'s ${3}', (b) =>
            b.player(removingPlayer)
              .number(count)
              .player(this)
              .card(card));
        }
      }
      // Lawsuit hook
      if (removingPlayer !== undefined && removingPlayer !== this && this.removingPlayers.includes(removingPlayer.id) === false) {
        this.removingPlayers.push(removingPlayer.id);
      }
    }
  }

  public addResourceTo(card: IResourceCard & ICard, options: number | {qty?: number, log?: boolean} = 1): void {
    const count = typeof(options) === 'number' ? options : (options.qty ?? 1);
    if (card.resourceCount !== undefined) card.resourceCount += count;

    TopsoilContract.onResourceAdded(this, card, count);
    MeatIndustry.onResourceAdded(this, card, count);

    if (typeof(options) !== 'number' && options.log === true && count > 0) {
      LogHelper.logAddResource(this, card, count);
    }
  }

  public getCardsWithResources(resource?: ResourceType): Array<ICard & IResourceCard> {
    let result: Array<ICard & IResourceCard> = this.playedCards.filter((card) => card.resourceType !== undefined && card.resourceCount && card.resourceCount > 0);

    this.corporationCards.forEach((corp) => {
      if (corp.resourceType !== undefined && corp.resourceCount !== undefined && corp.resourceCount > 0) {
        result.push(corp);
      }
    });

    if (resource !== undefined) {
      result = result.filter((card) => card.resourceType === resource);
    }

    return result;
  }

  public getResourceCards(resource: ResourceType | undefined = undefined): Array<ICard> {
    let result: Array<ICard> = this.playedCards.filter((card) => card.resourceType !== undefined);

    this.corporationCards.forEach((corp) => {
      if (corp.resourceType !== undefined) result.push(corp);
    });

    if (resource !== undefined) {
      result = result.filter((card) => card.resourceType === resource);
    }

    return result;
  }

  public getResourceCount(resource: ResourceType): number {
    let count: number = 0;
    this.getCardsWithResources(resource).forEach((card) => {
      count += this.getResourcesOnCard(card)!;
    });
    return count;
  }

  public getCardsByCardType(cardType: CardType) {
    return this.playedCards.filter((card) => card.cardType === cardType);
  }

  public getAllTags(): Array<ITagCount> {
    return [
      {tag: Tags.BUILDING, count: this.getTagCount(Tags.BUILDING, 'raw')},
      {tag: Tags.CITY, count: this.getTagCount(Tags.CITY, 'raw')},
      {tag: Tags.EARTH, count: this.getTagCount(Tags.EARTH, 'raw')},
      {tag: Tags.ENERGY, count: this.getTagCount(Tags.ENERGY, 'raw')},
      {tag: Tags.JOVIAN, count: this.getTagCount(Tags.JOVIAN, 'raw')},
      {tag: Tags.MICROBE, count: this.getTagCount(Tags.MICROBE, 'raw')},
      {tag: Tags.MOON, count: this.getTagCount(Tags.MOON, 'raw')},
      {tag: Tags.PLANT, count: this.getTagCount(Tags.PLANT, 'raw')},
      {tag: Tags.SCIENCE, count: this.getTagCount(Tags.SCIENCE, 'raw')},
      {tag: Tags.SPACE, count: this.getTagCount(Tags.SPACE, 'raw')},
      {tag: Tags.VENUS, count: this.getTagCount(Tags.VENUS, 'raw')},
      {tag: Tags.WILDCARD, count: this.getTagCount(Tags.WILDCARD, 'raw')},
      {tag: Tags.ANIMAL, count: this.getTagCount(Tags.ANIMAL, 'raw')},
      {tag: Tags.EVENT, count: this.getPlayedEventsCount()},
    ].filter((tag) => tag.count > 0);
  }

  /*
   * Get the number of tags a player has, depending on certain conditions.
   *
   * 'raw': count face-up tags literally, including Leavitt Station.
   * 'default': Same as raw, but include the wild tags.
   * 'milestone': Same as raw
   * 'award': Same as raw
   */
  public getTagCount(tag: Tags, mode: 'default' | 'raw' | 'milestone' | 'award' = 'default') {
    const includeTagSubstitutions = (mode === 'default' || mode === 'milestone');
    let tagCount = this.getRawTagCount(tag, false);

    // Leavitt Station hook
    if (tag === Tags.SCIENCE && this.scienceTagCount > 0) {
      tagCount += this.scienceTagCount;
    }

    // PoliticalAgendas Transhumans P1 hook
    if ((tag === Tags.WILDCARD || includeTagSubstitutions) && PartyHooks.shouldApplyPolicy(this, PartyName.TRANSHUMANS, TurmoilPolicy.TRANSHUMANS_DEFAULT_POLICY)) {
      tagCount += 1;
    }

    if (tag === Tags.WILDCARD || includeTagSubstitutions) {
      tagCount += LeadersExpansion.getBonusWildTags(this);
    }

    tagCount = MarsCoalition.checkBonusWildTag(this, tag, tagCount);

    if (includeTagSubstitutions) {
      // Earth Embassy hook
      if (tag === Tags.EARTH && this.cardIsInEffect(CardName.EARTH_EMBASSY)) {
        tagCount += this.getRawTagCount(Tags.MOON, false);
      }

      if (tag !== Tags.WILDCARD) {
        tagCount += this.getRawTagCount(Tags.WILDCARD, false);
      }
    }

    return tagCount;
  }

  // Counts the tags in the player's play area only.
  public getRawTagCount(tag: Tags, includeEventsTags: boolean) {
    let tagCount = 0;

    this.playedCards.forEach((card: IProjectCard) => {
      if (!includeEventsTags && card.cardType === CardType.EVENT) return;
      tagCount += card.tags.filter((cardTag) => cardTag === tag).length;
    });

    this.corporationCards.forEach((corp) => {
      if (corp.tags.length > 0 && !corp.isDisabled) {
        tagCount += corp.tags.filter((cardTag) => cardTag === tag).length;
      }
    });

    return tagCount;
  }

  // Return the total number of tags assocaited with these types.
  // Tag substitutions are included
  public getMultipleTagCount(tags: Array<Tags>, _mode: 'default' | 'milestones' = 'default'): number {
    let tagCount = 0;
    tags.forEach((tag) => {
      tagCount += this.getRawTagCount(tag, false);
    });

    // This is repeated behavior from getTagCount, sigh, OK.
    if (tags.includes(Tags.EARTH) && !tags.includes(Tags.MOON) && this.cardIsInEffect(CardName.EARTH_EMBASSY)) {
      tagCount += this.getRawTagCount(Tags.MOON, false);
    }

    tagCount += this.getRawTagCount(Tags.WILDCARD, false);
    tagCount += LeadersExpansion.getBonusWildTags(this);

    return tagCount;
  }

  // Counts the number of distinct tags
  public getDistinctTagCount(mode: 'default' | 'milestone' | 'globalEvent', extraTag?: Tags): number {
    let wildTagCount: number = LeadersExpansion.getBonusWildTags(this);
    const uniqueTags = new Set<Tags>();
    const addTag = (tag: Tags) => {
      if (tag === Tags.WILDCARD) {
        wildTagCount++;
      } else {
        uniqueTags.add(tag);
      }
    };

    if (extraTag !== undefined) uniqueTags.add(extraTag);

    for (const corp of this.corporationCards) {
      if (!corp.isDisabled) {
        corp.tags.forEach(addTag);
      }
    }

    for (const card of this.playedCards) {
      if (card.cardType !== CardType.EVENT) {
        card.tags.forEach(addTag);
      }
    }
    if (this.scienceTagCount > 0) uniqueTags.add(Tags.SCIENCE);

    if (mode === 'globalEvent') return uniqueTags.size;

    let maxTagCount = 10;
    if (this.game.gameOptions.venusNextExtension) maxTagCount++;
    if (this.game.gameOptions.moonExpansion) maxTagCount++;

    const total = uniqueTags.size + wildTagCount;
    return Math.min(total, maxTagCount);
  }

  // Return true if this player has all the tags in `tags` showing.
  public checkMultipleTagPresence(tags: Array<Tags>): boolean {
    let distinctCount = 0;
    tags.forEach((tag) => {
      if (this.getTagCount(tag, 'raw') > 0) {
        distinctCount++;
      } else if (tag === Tags.SCIENCE && this.hasTurmoilScienceTagBonus) {
        distinctCount++;
      }
    });
    if (distinctCount + this.getTagCount(Tags.WILDCARD) >= tags.length) {
      return true;
    }
    return false;
  }
  private runInputCb(result: PlayerInput | undefined): void {
    if (result !== undefined) {
      this.defer(result, Priority.DEFAULT);
    }
  }

  private checkInputLength(input: ReadonlyArray<ReadonlyArray<string>>, length: number, firstOptionLength?: number) {
    if (input.length !== length) {
      throw new Error('Incorrect options provided');
    }
    if (firstOptionLength !== undefined && input[0].length !== firstOptionLength) {
      throw new Error('Incorrect options provided (nested)');
    }
  }

  private parseHowToPayJSON(json: string): HowToPay {
    const defaults: HowToPay = {
      steel: 0,
      heat: 0,
      titanium: 0,
      megaCredits: 0,
      microbes: 0,
      floaters: 0,
      science: 0,
      graphene: 0,
      asteroids: 0,
      plants: 0,
    };
    try {
      const howToPay: HowToPay = JSON.parse(json);
      if (Object.keys(howToPay).every((key) => key in defaults) === false) {
        throw new Error('Input contains unauthorized keys');
      }
      return howToPay;
    } catch (err) {
      throw new Error('Unable to parse HowToPay input ' + err);
    }
  }

  protected runInput(input: ReadonlyArray<ReadonlyArray<string>>, pi: PlayerInput): void {
    if (pi instanceof AndOptions) {
      this.checkInputLength(input, pi.options.length);
      for (let i = 0; i < input.length; i++) {
        this.runInput([input[i]], pi.options[i]);
      }
      this.runInputCb(pi.cb());
    } else if (pi instanceof SelectAmount) {
      this.checkInputLength(input, 1, 1);
      const amount: number = parseInt(input[0][0]);
      if (isNaN(amount)) {
        throw new Error('Number not provided for amount');
      }
      if (amount > pi.max) {
        throw new Error('Amount provided too high (max ' + String(pi.max) + ')');
      }
      if (amount < pi.min) {
        throw new Error('Amount provided too low (min ' + String(pi.min) + ')');
      }
      this.runInputCb(pi.cb(amount));
    } else if (pi instanceof SelectOption) {
      this.runInputCb(pi.cb());
    } else if (pi instanceof SelectColony) {
      this.checkInputLength(input, 1, 1);
      const colony: ColonyName = (input[0][0]) as ColonyName;
      if (colony === undefined) {
        throw new Error('No colony selected');
      }
      this.runInputCb(pi.cb(colony));
    } else if (pi instanceof OrOptions) {
      // input length is variable, can't test it with checkInputLength
      if (input.length === 0 || input[0].length !== 1) {
        throw new Error('Incorrect options provided');
      }
      const optionIndex = parseInt(input[0][0]);
      const selectedOptionInput = input.slice(1);
      this.runInput(selectedOptionInput, pi.options[optionIndex]);
      this.runInputCb(pi.cb());
    } else if (pi instanceof SelectHowToPayForProjectCard) {
      this.checkInputLength(input, 1, 2);
      const cardName = input[0][0];
      const _data = PlayerInput.getCard(pi.cards, cardName);
      const foundCard: IProjectCard = _data.card;
      const howToPay: HowToPay = this.parseHowToPayJSON(input[0][1]);
      const reserveUnits = pi.reserveUnits[_data.idx];
      if (reserveUnits.megacredits + howToPay.megaCredits > this.megaCredits) {
        throw new Error(`${reserveUnits.megacredits} M€ must be reserved for ${cardName}`);
      }
      if (reserveUnits.steel + howToPay.steel > this.steel) {
        throw new Error(`${reserveUnits.steel} units of steel must be reserved for ${cardName}`);
      }
      if (reserveUnits.titanium + howToPay.titanium > this.titanium) {
        throw new Error(`${reserveUnits.titanium} units of titanium must be reserved for ${cardName}`);
      }
      this.runInputCb(pi.cb(foundCard, howToPay));
    } else if (pi instanceof SelectCard) {
      this.checkInputLength(input, 1);
      if (input[0].length < pi.config.min) throw new Error('Not enough cards selected');
      if (input[0].length > pi.config.max) throw new Error('Too many cards selected');

      const mappedCards: Array<ICard> = [];
      for (const cardName of input[0]) {
        const cardIndex = PlayerInput.getCard(pi.cards, cardName);
        mappedCards.push(cardIndex.card);
        if (pi.config.enabled?.[cardIndex.idx] === false) {
          throw new Error('Selected unavailable card');
        }
      }
      this.runInputCb(pi.cb(mappedCards));
    } else if (pi instanceof SelectAmount) {
      this.checkInputLength(input, 1, 1);
      const amount = parseInt(input[0][0]);
      if (isNaN(amount)) throw new Error('Amount is not a number');

      this.runInputCb(pi.cb(amount));
    } else if (pi instanceof SelectSpace) {
      this.checkInputLength(input, 1, 1);
      const foundSpace = pi.availableSpaces.find(
        (space) => space.id === input[0][0],
      );
      if (foundSpace === undefined) {
        throw new Error('Space not available');
      }
      // If there's more spaces down that branch, set them up as the next ones
      if (this.howToAffordReds !== undefined && this.howToAffordReds.spaces !== undefined) {
        this.howToAffordReds.spaces = this.howToAffordReds.spaces.get(foundSpace);
      }
      this.runInputCb(pi.cb(foundSpace));
    } else if (pi instanceof SelectPlayer) {
      this.checkInputLength(input, 1, 1);
      const foundPlayer = pi.players.find(
        (player) => player.color === input[0][0] || player.id === input[0][0],
      );
      if (foundPlayer === undefined) {
        throw new Error('Player not available');
      }
      this.runInputCb(pi.cb(foundPlayer));
    } else if (pi instanceof SelectDelegate) {
      this.checkInputLength(input, 1, 1);
      const foundPlayer = pi.players.find((player) =>
        player === input[0][0] ||
        (player instanceof Player && (player.id === input[0][0] || player.color === input[0][0])),
      );
      if (foundPlayer === undefined) {
        throw new Error('Player not available');
      }
      this.runInputCb(pi.cb(foundPlayer));
    } else if (pi instanceof SelectHowToPay) {
      this.checkInputLength(input, 1, 1);
      const howToPay: HowToPay = this.parseHowToPayJSON(input[0][0]);
      this.runInputCb(pi.cb(howToPay));
    } else if (pi instanceof SelectProductionToLose) {
      // TODO(kberg): I'm sure there's some input validation required.
      const units: Units = JSON.parse(input[0][0]);
      pi.cb(units);
    } else if (pi instanceof ShiftAresGlobalParameters) {
      // TODO(kberg): I'm sure there's some input validation required.
      const response: IAresGlobalParametersResponse = JSON.parse(input[0][0]);
      pi.cb(response);
    } else if (pi instanceof SelectPartyToSendDelegate) {
      this.checkInputLength(input, 1, 1);
      const party: PartyName = (input[0][0]) as PartyName;
      if (party === undefined) {
        throw new Error('No party selected');
      }
      this.runInputCb(pi.cb(party));
    } else {
      throw new Error('Unsupported waitingFor');
    }
  }

  public getAvailableBlueActionCount(): number {
    let count = this.getPlayableActionCards().length;
    if (this.game.gameOptions.fastModeOption) count += this.remainingStallActionsCount;

    return count;
  }

  public getPlayableActionCards(): Array<ICard> {
    const result: Array<ICard> = [];

    this.corporationCards.forEach((corp) => {
      if (!this.actionsThisGeneration.has(corp.name) &&
        corp.action !== undefined &&
        corp.canAct !== undefined &&
        corp.canAct(this)) {
        result.push(corp);
      }
    });

    const playedCards = this.playedCards.filter((card) => card.cardType === CardType.ACTIVE || card.cardType === CardType.PRELUDE);
    for (const playedCard of playedCards) {
      if (
        playedCard.action !== undefined &&
              playedCard.canAct !== undefined &&
              !this.actionsThisGeneration.has(playedCard.name) &&
              playedCard.canAct(this)) {
        result.push(playedCard);
      }
    }

    return result;
  }

  public getPlayableLeaderCards(): Array<ICard> {
    const leaders = this.playedCards.filter((card) => card.cardType === CardType.LEADER) as IProjectCard[];
    return leaders.filter((leader) => leader.canAct !== undefined && leader.canAct(this) && (leader as LeaderCard).isDisabled === false);
  }

  public runProductionPhase(): void {
    this.actionsThisGeneration.clear();
    this.removingPlayers = [];

    this.turmoilPolicyActionUsed = false;
    this.politicalAgendasActionUsedCount = 0;
    this.dominantPartyActionUsedCount = 0;

    if (this.cardIsInEffect(CardName.SUPERCAPACITORS)) {
      Supercapacitors.onProduction(this);
    } else {
      this.heat += this.energy;
      this.energy = 0;
      this.finishProductionPhase();
    }
  }

  public finishProductionPhase() {
    this.megaCredits += this.megaCreditProduction + this.terraformRating;
    this.steel += this.steelProduction;
    this.titanium += this.titaniumProduction;
    this.energy += this.energyProduction;
    this.plants += this.plantProduction;
    this.heat += this.heatProduction;

    this.corporationCards.forEach((corp) => {
      if (corp.onProductionPhase !== undefined) {
        corp.onProductionPhase(this);
      }
    });

    // OPG actions reset hook for all CEOs except Darwin, which is reset in Turmoil.endGeneration
    this.playedCards
      .filter((card) => card.cardType === CardType.LEADER && card.name !== CardName.DARWIN)
      .forEach((card) => (card as LeaderCard).opgActionIsActive = false);
  }

  public returnTradeFleets(): void {
    // Syndicate Pirate Raids hook. If it is in effect, then only the syndicate pirate raider will
    // retrieve their fleets.
    // See Colony.ts for the other half of this effect, and Game.ts which disables it.
    if (this.game.syndicatePirateRaider === undefined) {
      this.tradesThisGeneration = 0;
      this.hasTradedThisTurn = false;
    } else if (this.game.syndicatePirateRaider === this.id) {
      // CEO effect: Disable all other players from trading next gen,
      // but free up all colonies (don't leave their trade fleets stuck there)
      if (this.cardIsInEffect(CardName.HUAN)) {
        this.game.getPlayers().forEach((player) => {
          // Magic number high enough to disable other players' trading
          player.tradesThisGeneration = 50;
        })
      }

      this.tradesThisGeneration = 0;
      this.hasTradedThisTurn = false;
    }
  }

  private doneWorldGovernmentTerraforming(): void {
    this.game.deferredActions.runAll(() => this.game.doneWorldGovernmentTerraforming());
  }

  public worldGovernmentTerraforming(): void {
    const game = this.game;

    // Conceded players skip WGT
    if (this.hasConceded) {
      this.doneWorldGovernmentTerraforming();
      game.log('WGT phase was skipped for ${0}', (b) => b.player(this));
      return undefined;
    }

    const action: OrOptions = new OrOptions();
    action.title = 'Select action for World Government Terraforming';
    action.buttonLabel = 'Confirm';

    if (game.gameOptions.silverCubeVariant === true) {
      SilverCubeHandler.addSilverCubeWGTOptions(this, game, action);
    } else {
      if (game.getTemperature() < constants.MAX_TEMPERATURE) {
        action.options.push(
          new SelectOption('Increase temperature', 'Increase', () => {
            game.increaseTemperature(this, 1);
            game.log('${0} acted as World Government and increased temperature', (b) => b.player(this));
            return undefined;
          }),
        );
      }
      if (game.getOxygenLevel() < constants.MAX_OXYGEN_LEVEL) {
        action.options.push(
          new SelectOption('Increase oxygen', 'Increase', () => {
            game.increaseOxygenLevel(this, 1);
            game.log('${0} acted as World Government and increased oxygen level', (b) => b.player(this));
            return undefined;
          }),
        );
      }
      if (game.canAddOcean()) {
        action.options.push(
          new SelectSpace(
            'Add an ocean',
            game.board.getAvailableSpacesForOcean(this), (space) => {
              game.addOceanTile(this, space.id, SpaceType.OCEAN);
              game.log('${0} acted as World Government and placed an ocean', (b) => b.player(this));
              return undefined;
            },
          ),
        );
      }
      if (game.getVenusScaleLevel() < constants.MAX_VENUS_SCALE && game.gameOptions.venusNextExtension) {
        action.options.push(
          new SelectOption('Increase Venus scale', 'Increase', () => {
            game.increaseVenusScaleLevel(this, 1);
            game.log('${0} acted as World Government and increased Venus scale', (b) => b.player(this));
            return undefined;
          }),
        );
      }
    }

    if (game.gameOptions.aresExtension && game.gameOptions.aresExtremeVariant && game.isSoloMode()) {
      const unprotectedHazardSpaces = Eris.getAllUnprotectedHazardSpaces(game);

      if (unprotectedHazardSpaces.length > 0) {
        action.options.push(
          new SelectSpace(
            'Remove an unprotected hazard',
            Eris.getAllUnprotectedHazardSpaces(game),
            (space: ISpace) => {
              space.tile = undefined;
              game.log('${0} acted as World Government and removed a hazard tile', (b) => b.player(this));
              return undefined;
            },
          ),
        );
      }
    }

    MoonExpansion.ifMoon(game, (moonData) => {
      if (moonData.colonyRate < constants.MAXIMUM_COLONY_RATE) {
        action.options.push(
          new SelectOption('Increase the Moon colony rate', 'Increase', () => {
            MoonExpansion.raiseColonyRate(this, 1);
            return undefined;
          }),
        );
      }

      if (moonData.miningRate < constants.MAXIMUM_MINING_RATE) {
        action.options.push(
          new SelectOption('Increase the Moon mining rate', 'Increase', () => {
            MoonExpansion.raiseMiningRate(this, 1);
            return undefined;
          }),
        );
      }

      if (moonData.logisticRate < constants.MAXIMUM_LOGISTICS_RATE) {
        action.options.push(
          new SelectOption('Increase the Moon logistics rate', 'Increase', () => {
            MoonExpansion.raiseLogisticRate(this, 1);
            return undefined;
          }),
        );
      }
    });

    this.setWaitingFor(action, () => {
      this.doneWorldGovernmentTerraforming();
    });
  }

  public dealCards(quantity: number, cards: Array<IProjectCard>): void {
    for (let i = 0; i < quantity; i++) {
      cards.push(this.game.dealer.dealCard(this.game, true));
    }
  }

  /*
   * @param initialDraft when true, this is part of the first generation draft.
   * @param playerName  The player _this_ player passes remaining cards to.
   * @param passedCards The cards received from the draw, or from the prior player. If empty, it's the first
   *   step in the draft, and cards have to be dealt.
   */
  public runDraftPhase(initialDraft: boolean, playerName: string, passedCards?: Array<IProjectCard>): void {
    let cardsToKeep = 1;

    let cards: Array<IProjectCard> = [];
    if (passedCards === undefined) {
      if (!initialDraft) {
        let cardsToDraw = 4;
        if (LunaProjectOffice.isActive(this)) {
          cardsToDraw = 5;
          cardsToKeep = 2;
        }

        this.dealCards(cardsToDraw, cards);
      } else {
        this.dealCards(5, cards);
      }
    } else {
      cards = passedCards;
    }

    const message = cardsToKeep === 1 ?
      'Select a card to keep and pass the rest to ${0}' :
      'Select two cards to keep and pass the rest to ${0}';

    const selectCard = new SelectCard({
      message: message,
      data: [{type: LogMessageDataType.RAW_STRING, value: playerName}],
    },
    'Keep',
    cards,
    (foundCards: Array<IProjectCard>) => {
      foundCards.forEach((card) => {
        this.draftedCards.push(card);
        cards = cards.filter((c) => c !== card);
      });
      LogHelper.logDraftedCards(this, foundCards, cards, playerName);
      this.game.playerIsFinishedWithDraftingPhase(initialDraft, this, cards);
      return undefined;
    }, {min: cardsToKeep, max: cardsToKeep, played: false});

    // If player has conceded, autopick the first card for them
    if (this.hasConceded) {
      selectCard.cb([selectCard.cards[0]]);
      return;
    }

    this.setWaitingFor(selectCard);
  }

  /**
   * @return {number} the number of available megacredits. Which is just a shorthand for megacredits,
   * plus any units of heat available thanks to Helion (and Stormcraft, by proxy).
   */
  public spendableMegacredits(): number {
    const spendableMegacredits = this.megaCredits;

    // This should never happen, but let's add a failsafe for debugging purposes and allow the game to continue
    // if (spendableMegacredits < 0) {
    //   console.warn(`player.spendableMegacredits (${spendableMegacredits}) is less than 0`);
    //   spendableMegacredits = 0;
    // }

    return spendableMegacredits + (this.canUseHeatAsMegaCredits ? this.availableHeat : 0);
  }

  public runResearchPhase(draftVariant: boolean): void {
    let dealtCards: Array<IProjectCard> = [];
    if (!draftVariant) {
      this.dealCards(LunaProjectOffice.isActive(this) ? 5 : 4, dealtCards);
    } else {
      dealtCards = this.draftedCards;
      this.draftedCards = [];
    }

    const action = DrawCards.choose(this, dealtCards, {paying: true});

    // Players who have conceded will automatically buy 0 cards
    if (this.hasConceded) {
      action.cb([]);
      return;
    }

    this.setWaitingFor(action, () => this.game.playerIsFinishedWithResearchPhase(this));
  }

  public getCardCost(card: IProjectCard): number {
    // PoliticalAgendas Populists P1 hook
    if (PartyHooks.shouldApplyPolicy(this, PartyName.POPULISTS, TurmoilPolicy.POPULISTS_DEFAULT_POLICY)) {
      return card.cost;
    }

    let cost: number = card.cost;
    cost -= this.cardDiscount;

    this.playedCards.forEach((playedCard) => {
      if (playedCard.getCardDiscount !== undefined) {
        cost -= playedCard.getCardDiscount(this, card);
      }
    });

    // Check corporations too
    this.corporationCards.forEach((corp) => {
      if (corp.getCardDiscount !== undefined) {
        cost -= corp.getCardDiscount(this, card);
      }
    });

    // Playwrights hook
    this.removedFromPlayCards.forEach((removedFromPlayCard) => {
      if (removedFromPlayCard.getCardDiscount !== undefined) {
        cost -= removedFromPlayCard.getCardDiscount(this, card);
      }
    });

    // PoliticalAgendas Unity P4 hook
    if (card.tags.includes(Tags.SPACE) && PartyHooks.shouldApplyPolicy(this, PartyName.UNITY, TurmoilPolicy.UNITY_POLICY_4)) {
      cost -= 2;
    }

    // PoliticalAgendas Empower P4 hook
    if (card.tags.includes(Tags.ENERGY) && PartyHooks.shouldApplyPolicy(this, PartyName.EMPOWER, TurmoilPolicy.EMPOWER_POLICY_4)) {
      cost -= 3;
    }

    // PoliticalAgendas Bureaucrats P4 hook
    if (card.tags.includes(Tags.EARTH) && PartyHooks.shouldApplyPolicy(this, PartyName.BUREAUCRATS, TurmoilPolicy.BUREAUCRATS_POLICY_4)) {
      const earthTagCount = card.tags.filter((tag) => tag === Tags.EARTH).length;
      cost -= earthTagCount * 3;
    }

    // PoliticalAgendas Centrists P4 hook
    if (card.cardType === CardType.EVENT && PartyHooks.shouldApplyPolicy(this, PartyName.CENTRISTS, TurmoilPolicy.CENTRISTS_POLICY_4)) {
      cost -= 2;
    }

    cost = MarsCoalition.applyDominantPartyCardDiscounts(this, card, cost);

    return Math.max(cost, 0);
  }

  private canUseSteel(card: ICard): boolean {
    return card.tags.includes(Tags.BUILDING);
  }

  private canUseTitanium(card: ICard): boolean {
    return card.tags.includes(Tags.SPACE);
  }

  private canUseGraphene(card: ICard): boolean {
    if (this.cardIsInEffect(CardName.CARBON_NANOSYSTEMS) === false) return false;
    return card.tags.includes(Tags.SPACE) || card.tags.includes(Tags.CITY);
  }

  private canUseMicrobes(card: ICard): boolean {
    return card.tags.includes(Tags.PLANT);
  }

  private canUseFloaters(card: ICard): boolean {
    return card.tags.includes(Tags.VENUS);
  }

  private canUseAsteroids(card: ICard): boolean {
    if (!this.isCorporation(CardName.KUIPER_COOPERATIVE)) return false;

    const kuiperCooperative = this.corporationCards.find((corp) => corp.name === CardName.KUIPER_COOPERATIVE)!;
    if (kuiperCooperative.resourceCount === 0) return false;

    return card.name === CardName.ASTEROID_STANDARD_PROJECT || card.name === CardName.AQUIFER_STANDARD_PROJECT;
  }

  private canUsePlants(card: ICard): boolean {
    if (this.cardIsInEffect(CardName.MARTIAN_LUMBER_CORP) === false) return false;
    return card.tags.includes(Tags.BUILDING);
  }

  private getMcTradeCost(): number {
    let cost = MC_TRADE_COST - this.colonyTradeDiscount;
    if (this.hasBureaucratsColonyTradePenalty) cost += 1;
    return cost;
  }

  private getEnergyTradeCost(): number {
    let cost = ENERGY_TRADE_COST - this.colonyTradeDiscount;
    if (this.hasBureaucratsColonyTradePenalty) cost += 1;
    return cost;
  }

  private getTitaniumTradeCost(): number {
    let cost = TITANIUM_TRADE_COST - this.colonyTradeDiscount;
    if (this.hasBureaucratsColonyTradePenalty) cost += 1;
    return cost;
  }

  private playPreludeCard(): PlayerInput | undefined {
    return new SelectCard(
      'Select prelude card to play',
      'Play',
      this.preludeCardsInHand,
      (foundCards: Array<IProjectCard>) => {
        if (foundCards[0].canPlay === undefined || foundCards[0].canPlay(this)) {
          return this.playCard(foundCards[0]);
        } else {
          // Source: https://boardgamegeek.com/thread/2993276/article/41533232#41533232
          this.preludeCardsInHand.splice(this.preludeCardsInHand.indexOf(foundCards[0]), 1);
          this.game.log('${0} was discarded for 15 M€ as ${1} could not afford to play it', (b) => b.card(foundCards[0]).player(this));
          this.addResource(Resources.MEGACREDITS, 15, {log: true});

          foundCards[0].warning = undefined;
          return undefined;
        }
      },
    );
  }

  public payMegacreditsDeferred(cost: number, title: string, afterPay?: () => void) {
    this.game.defer(new SelectHowToPayDeferred(this, cost, {title, afterPay}));
  }

  public checkHowToPayAndPlayCard(selectedCard: IProjectCard, howToPay: HowToPay) {
    const cardCost: number = this.getCardCost(selectedCard);
    let totalToPay: number = 0;

    const canUseSteel: boolean = this.canUseSteel(selectedCard);
    const canUseTitanium: boolean = this.canUseTitanium(selectedCard);
    const canUseGraphene: boolean = this.canUseGraphene(selectedCard);
    const canUseAsteroids: boolean = this.canUseAsteroids(selectedCard);
    const canUsePlants: boolean = this.canUsePlants(selectedCard);

    if (canUsePlants && howToPay.plants > 0) {
      if (howToPay.plants > this.plants) {
        throw new Error('Do not have enough plants');
      }
      totalToPay += howToPay.plants * DEFAULT_PLANT_VALUE;
    }

    if (canUseSteel && howToPay.steel > 0) {
      if (howToPay.steel > this.steel) {
        throw new Error('Do not have enough steel');
      }
      totalToPay += howToPay.steel * this.getSteelValue();
    }

    if (canUseTitanium && howToPay.titanium > 0) {
      if (howToPay.titanium > this.titanium) {
        throw new Error('Do not have enough titanium');
      }
      totalToPay += howToPay.titanium * this.getTitaniumValue();
    }

    if (canUseGraphene && howToPay.graphene > 0) {
      totalToPay += howToPay.graphene * DEFAULT_GRAPHENE_VALUE;
    }

    if (canUseAsteroids && howToPay.asteroids > 0) {
      totalToPay += howToPay.asteroids;
    }

    if (this.canUseHeatAsMegaCredits && howToPay.heat !== undefined) {
      totalToPay += howToPay.heat;
    }

    if (howToPay.microbes !== undefined) {
      totalToPay += howToPay.microbes * DEFAULT_MICROBES_VALUE;
    }

    if (howToPay.floaters !== undefined && howToPay.floaters > 0) {
      if (selectedCard.name === CardName.STRATOSPHERIC_BIRDS && howToPay.floaters === this.getFloatersCanSpend()) {
        const cardsWithFloater = this.getCardsWithResources(ResourceType.FLOATER);
        if (cardsWithFloater.length === 1) {
          throw new Error('Cannot spend all floaters to play Stratospheric Birds');
        }
      }
      totalToPay += howToPay.floaters * DEFAULT_FLOATERS_VALUE;
    }

    if (howToPay.science !== undefined) totalToPay += howToPay.science;
    if (howToPay.megaCredits > this.megaCredits) throw new Error('Do not have enough M€');

    totalToPay += howToPay.megaCredits;
    if (totalToPay < cardCost) throw new Error('Did not spend enough to pay for card');

    this.totalSpend += cardCost;
    return this.playCard(selectedCard, howToPay);
  }

  public playProjectCard(): PlayerInput {
    return new SelectHowToPayForProjectCard(
      this,
      this.getPlayableCards(),
      (selectedCard, howToPay) => this.checkHowToPayAndPlayCard(selectedCard, howToPay),
    );
  }

  public getMicrobesCanSpend(): number {
    const psychrophiles = this.playedCards.find((card) => card.name === CardName.PSYCHROPHILES);
    if (psychrophiles !== undefined) return this.getResourcesOnCard(psychrophiles)!;

    return 0;
  }

  public getFloatersCanSpend(): number {
    const dirigibles = this.playedCards.find((card) => card.name === CardName.DIRIGIBLES);
    if (dirigibles !== undefined) return this.getResourcesOnCard(dirigibles)!;

    return 0;
  }

  public getSpendableScienceResources(): number {
    const lunaArchives = this.playedCards.find((card) => card.name === CardName.LUNA_ARCHIVES);
    if (lunaArchives !== undefined) return this.getResourcesOnCard(lunaArchives)!;

    return 0;
  }

  public getSpendableGrapheneResources(): number {
    const carbonNanosystems = this.playedCards.find((card) => card.name === CardName.CARBON_NANOSYSTEMS);
    if (carbonNanosystems !== undefined) return this.getResourcesOnCard(carbonNanosystems)!;

    return 0;
  }

  public getSpendableAsteroidResources(): number {
    const kuiperCooperative = this.corporationCards.find((card) => card.name === CardName.KUIPER_COOPERATIVE);
    if (kuiperCooperative !== undefined) {
      return this.getResourcesOnCard(kuiperCooperative)!;
    }

    return 0;
  }

  public playCard(selectedCard: IProjectCard, howToPay?: HowToPay, addToPlayedCards: boolean = true): undefined {
    // Pay for card
    if (howToPay !== undefined) {
      this.steel -= howToPay.steel;
      this.titanium -= howToPay.titanium;
      this.megaCredits -= howToPay.megaCredits;
      this.plants -= howToPay.plants;

      if (howToPay.heat > 0) {
        this.game.defer(new DeferredAction(this, () => this.spendHeat(howToPay.heat)));
      }

      for (const playedCard of this.playedCards) {
        if (playedCard.name === CardName.PSYCHROPHILES) {
          this.removeResourceFrom(playedCard, howToPay.microbes);
        }

        if (playedCard.name === CardName.DIRIGIBLES) {
          this.removeResourceFrom(playedCard, howToPay.floaters);
        }

        if (playedCard.name === CardName.LUNA_ARCHIVES) {
          this.removeResourceFrom(playedCard, howToPay.science);
        }

        if (playedCard.name === CardName.CARBON_NANOSYSTEMS) {
          this.removeResourceFrom(playedCard, howToPay.graphene);
        }
      }

      for (const corp of this.corporationCards) {
        if (corp.name === CardName.KUIPER_COOPERATIVE) {
          this.removeResourceFrom(corp, howToPay.asteroids);
        }
      }
    }

    if (selectedCard.howToAffordReds !== undefined) {
      this.howToAffordReds = selectedCard.howToAffordReds;
    }

    // Activate some colonies
    if (this.game.gameOptions.coloniesExtension && selectedCard.resourceType !== undefined) {
      this.game.colonies.forEach((colony) => {
        if (colony.resourceType !== undefined && colony.resourceType === selectedCard.resourceType) {
          colony.isActive = true;
        }
      });

      // Check for Venus colony
      this.game.activateVenusColony(selectedCard);
    }

    if (selectedCard.cardType !== CardType.PROXY) {
      this.lastCardPlayed = selectedCard;
      this.game.log('${0} played ${1}', (b) => b.player(this).card(selectedCard));
    }

    // Edge case: Valuable Gases needs to be added to playedCards first
    // So that its tags count for Jovian Lanterns as a possible target
    if (addToPlayedCards && selectedCard.name === CardName.VALUABLE_GASES) {
      this.game.defer(new DeferredAction(this, () => {
        this.playedCards.push(selectedCard);
        return undefined;
      }), Priority.SUPERPOWER);
    }

    // Play the card
    const action = selectedCard.play(this);
    this.defer(action, Priority.DEFAULT);

    // Remove card from hand
    const projectCardIndex = this.cardsInHand.findIndex((card) => card.name === selectedCard.name);
    const preludeCardIndex = this.preludeCardsInHand.findIndex((card) => card.name === selectedCard.name);
    const leaderCardIndex = this.leaderCardsInHand.findIndex((card) => card.name === selectedCard.name);

    if (projectCardIndex !== -1) {
      this.cardsInHand.splice(projectCardIndex, 1);
    } else if (preludeCardIndex !== -1) {
      this.preludeCardsInHand.splice(preludeCardIndex, 1);
    } else if (leaderCardIndex !== -1) {
      this.leaderCardsInHand.splice(leaderCardIndex, 1);
    }

    // Remove card from Self Replicating Robots
    const card = this.playedCards.find((card) => card.name === CardName.SELF_REPLICATING_ROBOTS);
    if (card instanceof SelfReplicatingRobots) {
      for (const targetCard of card.targetCards) {
        if (targetCard.card.name === selectedCard.name) {
          const index = card.targetCards.indexOf(targetCard);
          card.targetCards.splice(index, 1);
        }
      }
    }

    // See above edge case for why Valuable Gases is excluded here
    if (addToPlayedCards && [CardName.LAW_SUIT, CardName.VALUABLE_GASES].includes(selectedCard.name) === false) {
      this.playedCards.push(selectedCard);
    }

    // Playwrights + Special Design: Replay should only grant requirements bonus once
    const lastRemovedFromPlayCard = this.removedFromPlayCards[this.removedFromPlayCards.length - 1];
    if (lastRemovedFromPlayCard !== undefined && lastRemovedFromPlayCard.name === CardName.SPECIAL_DESIGN) {
      this.removedFromPlayCards.pop();
    }

    for (const playedCard of this.playedCards) {
      if (playedCard.onCardPlayed !== undefined) {
        const actionFromPlayedCard: OrOptions | void = playedCard.onCardPlayed(this, selectedCard);
        if (actionFromPlayedCard !== undefined) {
          this.game.defer(new DeferredAction(
            this,
            () => actionFromPlayedCard,
          ));
        }
      }
    }

    TurmoilHandler.applyOnCardPlayedEffect(this, selectedCard);

    for (const somePlayer of this.game.getPlayers()) {
      somePlayer.corporationCards.forEach((corp) => {
        if (corp.onCardPlayed !== undefined) {
          // For Colosseum variant, only trigger the effect once for each player (e.g. Vitor receives only 3 M€)
          if (this.game.gameOptions.colosseumVariant && somePlayer.color !== this.color) {
          } else {
            const actionFromPlayedCard: OrOptions | void = corp.onCardPlayed(this, selectedCard);
            if (actionFromPlayedCard !== undefined) {
              this.game.defer(new DeferredAction(
                this,
                () => actionFromPlayedCard,
              ));
            }
          };          
        }
      });
    }

    return undefined;
  }

  private playActionCard(): PlayerInput {
    return new SelectCard(
      'Perform an action from a played card',
      'Take action',
      this.getPlayableActionCards(),
      (foundCards: Array<ICard>) => {
        const foundCard = foundCards[0];
        this.game.log('${0} used ${1} action', (b) => b.player(this).card(foundCard));
        const action = foundCard.action!(this);
        if (action !== undefined) {
          this.game.defer(new DeferredAction(
            this,
            () => action,
          ));
        }
        this.actionsThisGeneration.add(foundCard.name);
        return undefined;
      }, {selectBlueCardAction: true},
    );
  }

  private useLeaderAction(): PlayerInput {
    return new SelectCard(
      'Use CEO once per game action',
      'Take action',
      this.getPlayableLeaderCards(),
      (foundCards: Array<ICard>) => {
        const foundCard = foundCards[0];
        this.game.log('${0} used ${1} action', (b) => b.player(this).card(foundCard));
        const action = foundCard.action!(this);
        if (action !== undefined) {
          this.game.defer(new DeferredAction(
            this,
            () => action,
          ));
        }
        this.actionsThisGeneration.add(foundCard.name);
        return undefined;
      },
    );
  }

  public drawCard(count?: number, options?: DrawCards.DrawOptions): undefined {
    return DrawCards.keepAll(this, count, options).execute();
  }

  public drawCardKeepSome(count: number, options: DrawCards.AllOptions): SelectCard<IProjectCard> {
    return DrawCards.keepSome(this, count, options).execute();
  }

  public get availableHeat(): number {
    if (!this.isCorporation(CardName.STORMCRAFT_INCORPORATED)) return this.heat;

    const stormcraft = this.corporationCards.find((card) => card.name === CardName.STORMCRAFT_INCORPORATED)!;
    return this.heat + (stormcraft.resourceCount! * 2);
  }

  public spendHeat(amount: number, cb: () => (undefined | PlayerInput) = () => undefined) : PlayerInput | undefined {
    if (this.corporationCards.some((corp) => corp.name === CardName.STORMCRAFT_INCORPORATED)) {
      const stormcraft = this.corporationCards.find((corp) => corp.name === CardName.STORMCRAFT_INCORPORATED)!;

      if (stormcraft !== undefined && stormcraft.resourceCount !== undefined && amount > 0) {
        return (<StormCraftIncorporated> stormcraft).spendHeat(this, amount, cb);
      }
    }

    this.deductResource(Resources.HEAT, amount);
    return cb();
  }

  public spendGraphene(amount: number) : undefined {
    if (this.cardIsInEffect(CardName.CARBON_NANOSYSTEMS)) {
      const carbonNanosystems = this.playedCards.find((card) => card.name === CardName.CARBON_NANOSYSTEMS)!;
      this.removeResourceFrom(carbonNanosystems, amount);
    }

    return undefined;
  }

  public spendAsteroids(amount: number) : undefined {
    if (this.isCorporation(CardName.KUIPER_COOPERATIVE)) {
      const kuiperCooperative = this.corporationCards.find((card) => card.name === CardName.KUIPER_COOPERATIVE)!;
      this.removeResourceFrom(kuiperCooperative, amount);
    }

    return undefined;
  }

  private tradeWithColony(openColonies: Array<Colony>): PlayerInput {
    const opts: Array<OrOptions | SelectColony> = [];
    let payWith: Resources | ResourceType | undefined = undefined;

    const coloniesModel: Array<ColonyModel> = this.game.getColoniesModel(openColonies);
    const titanFloatingLaunchPad = this.playedCards.find((card) => card.name === CardName.TITAN_FLOATING_LAUNCHPAD);
    const darksideSmugglersUnion = this.playedCards.find((card) => card.name === CardName.DARKSIDE_SMUGGLERS_UNION);

    const mcTradeAmount: number = this.getMcTradeCost();
    const energyTradeAmount: number = this.getEnergyTradeCost();
    const titaniumTradeAmount: number = this.getTitaniumTradeCost();

    const selectColony = new SelectColony('Select colony tile for trade', 'trade', coloniesModel, (colonyName: ColonyName) => {
      openColonies.forEach((colony) => {
        if (colony.name === colonyName) {
          if (payWith === Resources.MEGACREDITS) {
            this.game.defer(new SelectHowToPayDeferred(
              this,
              mcTradeAmount,
              {
                title: 'Select how to pay ' + mcTradeAmount + ' for colony trade',
                afterPay: () => {
                  this.game.log('${0} spent ${1} M€ to trade with ${2}', (b) => b.player(this).number(mcTradeAmount).colony(colony));
                  colony.trade(this);
                },
              },
            ));
          } else if (payWith === Resources.ENERGY) {
            this.energy -= energyTradeAmount;
            this.game.log('${0} spent ${1} energy to trade with ${2}', (b) => b.player(this).number(energyTradeAmount).colony(colony));
            colony.trade(this);
          } else if (payWith === Resources.TITANIUM) {
            this.titanium -= titaniumTradeAmount;
            this.game.log('${0} spent ${1} titanium to trade with ${2}', (b) => b.player(this).number(titaniumTradeAmount).colony(colony));
            colony.trade(this);
          } else if (payWith === ResourceType.FLOATER && titanFloatingLaunchPad !== undefined && titanFloatingLaunchPad.resourceCount) {
            titanFloatingLaunchPad.resourceCount--;
            this.actionsThisGeneration.add(titanFloatingLaunchPad.name);
            this.game.log('${0} spent 1 floater to trade with ${1}', (b) => b.player(this).colony(colony));
            colony.trade(this);
          } else if (payWith === undefined && darksideSmugglersUnion !== undefined && darksideSmugglersUnion.canAct!(this)) {
            this.actionsThisGeneration.add(darksideSmugglersUnion.name);
            this.game.log('${0} traded with ${1} using ${2} action', (b) => b.player(this).colony(colony).card(darksideSmugglersUnion));
            colony.trade(this);
          }

          return undefined;
        }
        return undefined;
      });
      return undefined;
    });

    const howToPayForTrade = new OrOptions();
    howToPayForTrade.title = 'Pay trade fee';
    howToPayForTrade.buttonLabel = 'Pay';

    const payWithMC = new SelectOption('Pay ' + mcTradeAmount +' M€', '', () => {
      payWith = Resources.MEGACREDITS;
      return undefined;
    });
    const payWithEnergy = new SelectOption('Pay ' + energyTradeAmount +' Energy', '', () => {
      payWith = Resources.ENERGY;
      return undefined;
    });
    const payWithTitanium = new SelectOption('Pay ' + titaniumTradeAmount +' Titanium', '', () => {
      payWith = Resources.TITANIUM;
      return undefined;
    });

    if (darksideSmugglersUnion !== undefined &&
      darksideSmugglersUnion.canAct!(this) &&
      !this.actionsThisGeneration.has(darksideSmugglersUnion.name)) {
      howToPayForTrade.options.push(new SelectOption('Use Darkside Smugglers\' Union action', '', () => {
        payWith = undefined;
        return undefined;
      }));
    }

    if (titanFloatingLaunchPad !== undefined &&
      titanFloatingLaunchPad.resourceCount !== undefined &&
      titanFloatingLaunchPad.resourceCount > 0 &&
      !this.actionsThisGeneration.has(titanFloatingLaunchPad.name)) {
      howToPayForTrade.options.push(new SelectOption('Pay 1 Floater (use Titan Floating Launch-pad action)', '', () => {
        payWith = ResourceType.FLOATER;
        return undefined;
      }));
    }

    if (this.energy >= energyTradeAmount) howToPayForTrade.options.push(payWithEnergy);
    if (this.titanium >= titaniumTradeAmount) howToPayForTrade.options.push(payWithTitanium);
    if (this.canAfford(mcTradeAmount)) howToPayForTrade.options.push(payWithMC);

    opts.push(howToPayForTrade);
    opts.push(selectColony);

    const trade = new AndOptions(
      () => {
        return undefined;
      },
      ...opts,
    );

    trade.title = 'Trade with a colony tile';
    trade.buttonLabel = 'Trade';

    return trade;
  }

  private getMilestoneCost(): number {
    if (this.cardIsInEffect(CardName.VAN_ALLEN)) return 0;
    if (this.isCorporation(CardName.NIRGAL_ENTERPRISES)) return 0;
    if (this.game.gameOptions.automaSoloVariant) return 0;

    return MILESTONE_COST;
  }

  public claimMilestone(milestone: IMilestone): SelectOption {
    return new SelectOption(milestone.name, 'Claim - ' + '('+ milestone.name + ')', () => {
      this.game.claimedMilestones.push({player: this, milestone: milestone});

      const cost = this.getMilestoneCost();
      this.game.defer(new SelectHowToPayDeferred(this, cost, {title: 'Select how to pay for milestone'}));

      if (milestone.name === 'Monument') Monument.discardCards(this);
      VanAllen.onMilestoneClaimed(this.game);
      this.game.log('${0} claimed ${1} milestone', (b) => b.player(this).milestone(milestone));
      return undefined;
    });
  }

  private fundAward(award: IAward): PlayerInput {
    return new SelectOption(award.name, 'Fund - ' + '(' + award.name + ')', () => {
      this.game.defer(new SelectHowToPayDeferred(this, this.game.getAwardFundingCost(this), {title: 'Select how to pay for award'}));
      this.game.fundAward(this, award);
      return undefined;
    });
  }

  private endTurnOption(): PlayerInput {
    return new SelectOption('End Turn', 'End', () => {
      this.actionsTakenThisRound = 1;
      this.game.log('${0} ended turn', (b) => b.player(this));
      return undefined;
    });
  }

  private stallOption(): PlayerInput {
    return new SelectOption('End Turn (' + this.remainingStallActionsCount + '/2 remaining)', 'End', () => {
      this.actionsTakenThisRound = 1;
      this.remainingStallActionsCount -= 1;
      this.game.log('${0} ended turn', (b) => b.player(this));
      return undefined;
    });
  }

  // Exposed for tests
  public pass(): void {
    this.game.playerHasPassed(this);
    this.lastCardPlayed = undefined;

    if (this.isCorporation(CardName.BENTENMARU)) {
      this.megaCredits = 0;
    }
  }

  private passOption(): PlayerInput {
    return new SelectOption('Pass for this generation', 'Pass', () => {
      this.pass();
      this.game.log('${0} passed', (b) => b.player(this));
      return undefined;
    });
  }

  private concedeOption(): PlayerInput {
    return new SelectOption('Concede this game', 'Concede', () => {
      const orOptions = new OrOptions();
      orOptions.title = 'Are you sure you want to concede?';

      orOptions.options.push(new SelectOption('Concede this game', 'Concede', () => {
        this.hasConceded = true;
        this.pass();
        this.game.log('${0} conceded the game', (b) => b.player(this));
        return undefined;
      }));

      orOptions.options.push(new SelectOption('Continue playing', 'Confirm', () => {
        this.actionsTakenThisRound--;
        this.actionsTakenThisGame--;
        return undefined;
      }));

      return orOptions;
    });
  }

  public takeActionForFinalGreenery(): void {
    // Resolve any deferredAction before placing the next greenery
    // Otherwise if two tiles are placed next to Philares, only the last benefit is triggered
    // if Philares does not accept the first bonus before the second tile is down
    if (this.game.deferredActions.length > 0) {
      this.resolveFinalGreeneryDeferredActions();
      return;
    }

    if (this.game.canPlaceGreenery(this)) {
      const action: OrOptions = new OrOptions();
      action.title = 'Place any final greenery from plants';
      action.buttonLabel = 'Confirm';
      action.options.push(
        new SelectSpace(
          'Select space for greenery',
          this.game.board.getAvailableSpacesForGreenery(this), (space) => {
            // Do not raise oxygen or award TR for final greenery placements
            // Unless it is a 63 TR solo game that was already won before final placement
            const shouldRaiseOxygen = this.game.isSoloMode() ? this.game.isSoloModeWin() : false;
            this.game.addGreenery(this, space.id, SpaceType.LAND, shouldRaiseOxygen);
            this.deductResource(Resources.PLANTS, this.plantsNeededForGreenery);
            this.takeActionForFinalGreenery();

            // Resolve Philares deferred actions
            if (this.game.deferredActions.length > 0) this.resolveFinalGreeneryDeferredActions();

            return undefined;
          },
        ),
      );
      action.options.push(
        new SelectOption('Don\'t place a greenery', 'Confirm', () => {
          this.game.playerIsDoneWithGame(this);
          return undefined;
        }),
      );
      this.setWaitingForSafely(action);
      return;
    }

    if (this.game.deferredActions.length > 0) {
      this.resolveFinalGreeneryDeferredActions();
    } else {
      this.game.playerIsDoneWithGame(this);
    }
  }

  private resolveFinalGreeneryDeferredActions() {
    this.game.deferredActions.runAll(() => this.takeActionForFinalGreenery());
  }

  public getPlayableCards(): Array<IProjectCard> {
    const candidateCards: Array<IProjectCard> = [...this.cardsInHand];
    // Self Replicating robots check
    const card = this.playedCards.find((card) => card.name === CardName.SELF_REPLICATING_ROBOTS);
    if (card instanceof SelfReplicatingRobots) {
      for (const targetCard of card.targetCards) {
        candidateCards.push(targetCard.card);
      }
    }

    return candidateCards.filter((card) => this.canPlay(card));
  }

  public canPlay(card: IProjectCard): boolean {
    const baseCost = this.getCardCost(card) - MoonExpansion.spendableLunaArchiveResources(this, card);
    let redsCost = this.computeTerraformRatingBump(card) * REDS_RULING_POLICY_COST;

    if (card.getActionDetails !== undefined) {
      const actionDetails = card.getActionDetails(this, card);
      if (RedsPolicy.canAffordRedsPolicy(this, this.game, actionDetails)) {
        redsCost = 0;
      }
    }

    if (card.reserveUnits !== undefined || card.reserveUnits === Units.EMPTY) {
      card.reserveUnits = Units.of({
        megacredits: redsCost,
        steel: card.reserveUnits.steel,
        titanium: card.reserveUnits.titanium,
        heat: card.reserveUnits.heat,
        plants: card.reserveUnits.plants,
        energy: card.reserveUnits.energy,
      });
    } else {
      card.reserveUnits = Units.of({megacredits: redsCost});
    }

    const canAfford = this.canAfford(
      baseCost,
      {
        steel: this.canUseSteel(card),
        titanium: this.canUseTitanium(card),
        floaters: this.canUseFloaters(card),
        microbes: this.canUseMicrobes(card),
        graphene: this.canUseGraphene(card),
        asteroids: this.canUseAsteroids(card),
        plants: this.canUsePlants(card),
        reserveUnits: MoonExpansion.adjustedReserveCosts(this, card),
      });

    return canAfford && (card.canPlay === undefined || card.canPlay(this));
  }

  // Checks if the player can afford to pay `cost` mc (possibly replaceable with steel, titanium etc.)
  // and additionally pay the reserveUnits (no replaces here)
  public canAfford(cost: number, options?: {
    steel?: boolean,
    titanium?: boolean,
    floaters?: boolean,
    microbes?: boolean,
    graphene?: boolean,
    asteroids?: boolean,
    plants? :boolean,
    reserveUnits?: Units,
  }) {
    const reserveUnits = options?.reserveUnits ?? Units.EMPTY;

    if (reserveUnits.heat > 0) {
      // Special-case heat
      const unitsWithoutHeat = {...reserveUnits, heat: 0};
      if (!this.hasUnits(unitsWithoutHeat)) {
        return false;
      }
      if (this.availableHeat < reserveUnits.heat) {
        return false;
      }
    } else {
      if (!this.hasUnits(reserveUnits)) {
        return false;
      }
    }

    const canUseSteel: boolean = options?.steel ?? false;
    const canUseTitanium: boolean = options?.titanium ?? false;
    const canUseFloaters: boolean = options?.floaters ?? false;
    const canUseMicrobes: boolean = options?.microbes ?? false;
    const canUseGraphene: boolean = options?.graphene ?? false;
    const canUseAsteroids: boolean = options?.asteroids ?? false;
    const canUsePlants: boolean = options?.plants ?? (canUseSteel && this.cardIsInEffect(CardName.MARTIAN_LUMBER_CORP));

    const availableMegacredits = this.megaCredits - reserveUnits.megacredits;
    if (availableMegacredits < 0) return false;

    return cost <=
      availableMegacredits +
      (this.canUseHeatAsMegaCredits ? this.availableHeat - reserveUnits.heat : 0) +
      (canUseSteel ? (this.steel - reserveUnits.steel) * this.getSteelValue() : 0) +
      (canUseTitanium ? (this.titanium - reserveUnits.titanium) * this.getTitaniumValue() : 0) +
      (canUseFloaters ? this.getFloatersCanSpend() * DEFAULT_FLOATERS_VALUE : 0) +
      (canUseMicrobes ? this.getMicrobesCanSpend() * DEFAULT_MICROBES_VALUE : 0) +
      (canUseGraphene ? this.getSpendableGrapheneResources() * DEFAULT_GRAPHENE_VALUE : 0) +
      (canUseAsteroids ? this.getSpendableAsteroidResources() : 0) +
      (canUsePlants ? this.plants * DEFAULT_PLANT_VALUE : 0);
  }

  public computeTerraformRatingBump(card: IProjectCard): number {
    if (!PartyHooks.shouldApplyPolicy(this, PartyName.REDS)) return 0;

    let tr = card.tr;
    if (tr === undefined) return 0;

    tr = {...tr}; // Local copy
    let total = 0;

    if (tr.oxygen !== undefined) {
      const availableSteps = constants.MAX_OXYGEN_LEVEL - this.game.getOxygenLevel();
      const steps = Math.min(availableSteps, tr.oxygen);
      total = total + steps;
      // TODO(kberg): Add constants for these constraints.
      if (this.game.getOxygenLevel() < 8 && this.game.getOxygenLevel() + steps >= 8) {
        tr.temperature = (tr.temperature ?? 0) + 1;
      }
    }

    if (tr.temperature !== undefined) {
      const availableSteps = Math.floor((constants.MAX_TEMPERATURE - this.game.getTemperature()) / 2);
      const steps = Math.min(availableSteps, tr.temperature);
      total = total + steps;
      if (this.game.getTemperature() < 0 && this.game.getTemperature() + (steps * 2) >= 0) {
        tr.oceans = (tr.oceans ?? 0) + 1;
      }
    }

    if (tr.oceans !== undefined) {
      const availableSteps = this.game.getMaxOceanTilesCount() - this.game.board.getOceansOnBoard();
      const steps = Math.min(availableSteps, tr.oceans);
      total = total + steps;
    }

    if (tr.venus !== undefined) {
      const availableSteps = Math.floor((constants.MAX_VENUS_SCALE - this.game.getVenusScaleLevel()) / 2);
      const steps = Math.min(availableSteps, tr.venus);
      total = total + steps;
      if (this.game.getVenusScaleLevel() < 16 && this.game.getVenusScaleLevel() + (steps * 2) >= 16) {
        tr.tr = (tr.tr ?? 0) + 1;
      }
    }

    MoonExpansion.ifMoon(this.game, (moonData) => {
      if (tr!.moonColony !== undefined) {
        const availableSteps = constants.MAXIMUM_COLONY_RATE - moonData.colonyRate;
        total = total + Math.min(availableSteps, tr!.moonColony);
      }

      if (tr!.moonMining !== undefined) {
        const availableSteps = constants.MAXIMUM_MINING_RATE - moonData.miningRate;
        total = total + Math.min(availableSteps, tr!.moonMining);
      }

      if (tr!.moonLogistics !== undefined) {
        const availableSteps = constants.MAXIMUM_LOGISTICS_RATE - moonData.logisticRate;
        total = total + Math.min(availableSteps, tr!.moonLogistics);
      }
    });

    total += tr.tr ?? 0;
    return total;
  }

  public getStandardProjects(): Array<StandardProjectCard> {
    return new CardLoader(this.game.gameOptions)
      .getStandardProjects()
      .filter((card) => {
        if (this.isCorporation(CardName.THORGATE) && card.name === CardName.POWER_PLANT_STANDARD_PROJECT) {
          return false;
        } else if (!this.isCorporation(CardName.THORGATE) && card.name === CardName.POWER_PLANT_STANDARD_PROJECT_THORGATE) {
          return false;
        }
        return true;
      })
      .filter((card) => {
        switch (card.name) {
        // sell patents is not displayed as a card
        case CardName.SELL_PATENTS_STANDARD_PROJECT:
          return false;
        // For buffer gas, show ONLY IF in solo AND 63TR mode
        case CardName.BUFFER_GAS_STANDARD_PROJECT:
          return this.game.isSoloMode() && this.game.gameOptions.soloTR;
        case CardName.AIR_SCRAPPING_STANDARD_PROJECT:
          return this.game.gameOptions.altVenusBoard === false;
        case CardName.AIR_SCRAPPING_STANDARD_PROJECT_VARIANT:
          return this.game.gameOptions.altVenusBoard === true;
        case CardName.MOON_COLONY_STANDARD_PROJECT_V2:
        case CardName.MOON_MINE_STANDARD_PROJECT_V2:
        case CardName.MOON_ROAD_STANDARD_PROJECT_V2:
          return this.game.gameOptions.moonStandardProjectVariant === true;
        default:
          return true;
        };
      })
      .sort((a, b) => a.cost - b.cost);
  }

  public getStandardProjectOption(): SelectCard<StandardProjectCard> {
    const standardProjects: Array<StandardProjectCard> = this.getStandardProjects();

    return new SelectCard(
      'Standard projects',
      'Confirm',
      standardProjects,
      (card) => card[0].action(this),
      {enabled: standardProjects.map((card) => card.canAct(this))},
    );
  }

  protected getStandardActionOption(): SelectCard<StandardActionCard> {
    const standardActions: Array<StandardActionCard> = this.getStandardActions();

    return new SelectCard(
      'Standard actions',
      'Confirm',
      standardActions,
      (card) => card[0].action(this),
      {enabled: standardActions.map((card) => card.canAct(this))},
    );
  }

  private getStandardActions(): Array<StandardActionCard> {
    const standardActions: Array<StandardActionCard> = [];

    // Convert Plants
    const convertPlants = this.isCorporation(CardName.ECOLINE) ? new ConvertPlantsEcoline() : new ConvertPlants();
    if (convertPlants.canAct(this)) {
      standardActions.push(convertPlants);
    }

    // Convert Heat
    const convertHeat = new ConvertHeat();
    if (convertHeat.canAct(this)) {
      standardActions.push(convertHeat);
    }

    return standardActions;
  }

  protected getTurmoilActionOption(): SelectCard<TurmoilActionCard> {
    const turmoilActions: Array<TurmoilActionCard> = this.getTurmoilActions();

    return new SelectCard(
      'Turmoil actions',
      'Confirm',
      turmoilActions,
      (card) => card[0].action(this),
      {enabled: turmoilActions.map((card) => card.canAct(this))},
    );
  }

  public getTurmoilActions(): Array<TurmoilActionCard> {
    const turmoilActions: Array<TurmoilActionCard> = [];

    // Turmoil Scientists action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.SCIENTISTS)) turmoilActions.push(new ScientistsDefaultAction());

    // Turmoil Kelvinists action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.KELVINISTS)) turmoilActions.push(new KelvinistsDefaultAction());

    // Agendas: Kelvinists P3 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.KELVINISTS, TurmoilPolicy.KELVINISTS_POLICY_3)) {
      turmoilActions.push(new KelvinistsPolicy3Action());
    }

    // Agendas: Greens P4 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.GREENS, TurmoilPolicy.GREENS_POLICY_4)) {
      turmoilActions.push(new GreensPolicy4Action());
    }

    // Agendas: Mars First P4 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.MARS, TurmoilPolicy.MARS_FIRST_POLICY_4)) {
      turmoilActions.push(new MarsFirstPolicy4Action());
    }

    // Agendas: Unity P2 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.UNITY, TurmoilPolicy.UNITY_POLICY_2)) {
      turmoilActions.push(new UnityPolicy2Action());
    }

    // Agendas: Unity P3 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.UNITY, TurmoilPolicy.UNITY_POLICY_3)) {
      turmoilActions.push(new UnityPolicy3Action());
    }

    // Agendas: Reds P3 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.REDS, TurmoilPolicy.REDS_POLICY_3)) {
      turmoilActions.push(new RedsPolicy3Action());
    }

    // Agendas: Spome P2 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.SPOME, TurmoilPolicy.SPOME_POLICY_2)) {
      turmoilActions.push(new SpomePolicy2Action());
    }

    // Agendas: Spome P4 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.SPOME, TurmoilPolicy.SPOME_POLICY_4)) {
      turmoilActions.push(new SpomePolicy4Action());
    }

    // Agendas: Empower default action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.EMPOWER, TurmoilPolicy.EMPOWER_DEFAULT_POLICY)) {
      turmoilActions.push(new EmpowerDefaultAction());
    }

    // Agendas: Bureaucrats default action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.BUREAUCRATS, TurmoilPolicy.BUREAUCRATS_DEFAULT_POLICY)) {
      turmoilActions.push(new BureaucratsDefaultAction());
    }

    // Agendas: Bureaucrats P3 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.BUREAUCRATS, TurmoilPolicy.BUREAUCRATS_POLICY_3)) {
      turmoilActions.push(new BureaucratsPolicy3Action());
    }

    // Agendas: Populists P3 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.POPULISTS, TurmoilPolicy.POPULISTS_POLICY_3)) {
      turmoilActions.push(new PopulistsPolicy3Action());
    }

    // Agendas: Transhumans P2 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.TRANSHUMANS, TurmoilPolicy.TRANSHUMANS_POLICY_2)) {
      turmoilActions.push(new TranshumansPolicy2Action());
    }

    // Agendas: Transhumans P3 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.TRANSHUMANS, TurmoilPolicy.TRANSHUMANS_POLICY_3)) {
      turmoilActions.push(new TranshumansPolicy3Action());
    }

    // Agendas: Centrists default action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.CENTRISTS, TurmoilPolicy.CENTRISTS_DEFAULT_POLICY)) {
      turmoilActions.push(new CentristsDefaultAction());
    }

    // Agendas: Centrists P3 action
    if (PartyHooks.shouldApplyPolicy(this, PartyName.CENTRISTS, TurmoilPolicy.CENTRISTS_POLICY_3)) {
      turmoilActions.push(new CentristsPolicy3Action());
    }

    // Mars Coalition
    MarsCoalition.addPlayerAction(this, turmoilActions);

    return turmoilActions;
  }

  public takeAction(): void {
    const game = this.game;

    if (game.deferredActions.length > 0) {
      game.deferredActions.runAll(() => this.takeAction());
      return;
    }

    this.howToAffordReds = undefined;
    const allOtherPlayersHavePassed = this.allOtherPlayersHavePassed();

    if (this.actionsTakenThisRound === 0 || game.gameOptions.undoOption) {
      game.save();
    }

    // Prelude cards have to be played first
    if (this.preludeCardsInHand.length > 0) {
      game.phase = Phase.PRELUDES;

      this.preludeCardsInHand.forEach((card) => {
        Card.setUnplayablePreludeWarningText(card, this);
      });

      const playPrelude = this.playPreludeCard();

      if (playPrelude !== undefined) {
        this.setWaitingFor(playPrelude, () => {
          if (this.preludeCardsInHand.length === 1) {
            this.takeAction();
          } else {
            game.playerIsFinishedTakingActions();
          }
        });
      } else {
        if (this.preludeCardsInHand.length === 1) {
          this.takeAction();
        } else {
          game.playerIsFinishedTakingActions();
        }
      }

      return;
    } else if (game.gameOptions.leadersExpansion === false) {
      game.phase = Phase.ACTION;
    }

    // Leader cards have to be played right after Preludes
    if (this.leaderCardsInHand.length > 0) {
      this.leaderCardsInHand.forEach((card) => {
        if (!this.playedCards.includes(card)) {
          this.playCard(card);
        }
      });
    } else {
      game.phase = Phase.ACTION;
    }

    // Terraforming Mars FAQ says:
    //   If for any reason you are not able to perform your mandatory first action (e.g. if
    //   all 3 Awards are claimed before starting your turn as Vitor), you can skip this and
    //   proceed with other actions instead.
    // This code just uses "must skip" instead of "can skip".
    if (this.isCorporation(CardName.VITOR) && !this.canFundAward() && this.game.gameOptions.automaSoloVariant === false) {
      this.pendingInitialActions = this.pendingInitialActions.filter((card) => card.name !== CardName.VITOR);
    }

    if (game.hasPassedThisActionPhase(this) || (allOtherPlayersHavePassed === false && this.actionsTakenThisRound >= 2)) {
      this.actionsTakenThisRound = 0;
      this.hasTradedThisTurn = false;
      game.playerIsFinishedTakingActions();
      return;
    }

    if (this.pendingInitialActions.length > 0) {
      const orOptions = new OrOptions();

      this.pendingInitialActions.forEach((corp) => {
        const option = new SelectOption(
          {
            message: 'Take first action of ${0} corporation',
            data: [{
              type: LogMessageDataType.RAW_STRING,
              value: corp.name,
            }],
          },
          corp.initialActionText, () => {
            game.defer(new DeferredAction(this, () => {
              if (corp.initialAction) {
                return corp.initialAction(this);
              } else {
                return undefined;
              }
            }));

            this.pendingInitialActions.splice(this.pendingInitialActions.indexOf(corp), 1);
            return undefined;
          });
        orOptions.options.push(option);
      });

      orOptions.options.push(this.passOption());
      this.performAction(orOptions);

      return;
    };

    this.performAction(this.getActions());
  }

  private performAction(options: OrOptions) {
    this.canUndoLastAction = true;

    this.setWaitingFor(options, () => {
      this.actionsTakenThisRound++;
      this.actionsTakenThisGame++;
      this.timer.rebateTime(constants.BONUS_SECONDS_PER_ACTION);
      this.takeAction();
    });
  }

  public canAffordMilestone(): boolean {
    if (this.canAfford(MILESTONE_COST)) return true;
    if (this.cardIsInEffect(CardName.VAN_ALLEN)) return true;
    if (this.game.gameOptions.automaSoloVariant) return true;
    if (this.isCorporation(CardName.NIRGAL_ENTERPRISES)) return true;

    return false;
  }

  public canClaimMilestone(): boolean {
    if (this.game.allMilestonesClaimed()) return false;
    return true;
  }

  public canFundAward(): boolean {
    if (this.game.allAwardsFunded()) return false;
    return true;
  }

  // Return possible mid-game actions like play a card and fund an award, but no play prelude card.
  public getActions() {
    const action: OrOptions = new OrOptions();
    action.title = this.actionsTakenThisRound === 0 ?
      'Take your first action' : 'Take your next action';
    action.buttonLabel = 'Take action';

    const canAffordMilestone = this.canAffordMilestone();

    if (canAffordMilestone && this.canClaimMilestone()) {
      const remainingMilestones = new OrOptions();
      remainingMilestones.title = 'Claim a milestone';
      remainingMilestones.options = this.game.milestones
        .filter(
          (milestone: IMilestone) =>
            !this.game.milestoneClaimed(milestone) &&
            milestone.canClaim(this))
        .map(
          (milestone: IMilestone) =>
            this.claimMilestone(milestone));
      if (remainingMilestones.options.length >= 1) action.options.push(remainingMilestones);
    }

    if (this.getStandardActions().length > 0) action.options.push(this.getStandardActionOption());

    if (this.getTurmoilActions().length > 0) action.options.push(this.getTurmoilActionOption());

    if (this.getPlayableActionCards().length > 0) action.options.push(this.playActionCard());

    if (this.getPlayableCards().length > 0) action.options.push(this.playProjectCard());

    if (this.game.gameOptions.coloniesExtension) {
      let openColonies = this.game.colonies.filter((colony) => colony.isActive && colony.visitor === undefined);
      const iapetus = openColonies.find((colony) => colony.name === ColonyName.IAPETUS);

      if (PartyHooks.shouldApplyPolicy(this, PartyName.REDS) && iapetus !== undefined) {
        const tradePosition = iapetus.trackPosition + this.colonyTradeOffset;
        const trGainedFromTrade = iapetus.tradeQuantity[tradePosition];

        if (!this.canAfford(trGainedFromTrade * REDS_RULING_POLICY_COST)) {
          openColonies = openColonies.filter((colony) => colony.name !== ColonyName.IAPETUS);
        }
      }

      const canTrade = this.canTrade();

      if (openColonies.length > 0 && this.fleetSize > this.tradesThisGeneration && canTrade) {
        action.options.push(
          this.tradeWithColony(openColonies),
        );
      }
    }

    // If you can pay to add a delegate to a party.
    Turmoil.ifTurmoil(this.game, (turmoil) => {
      let sendDelegate;
      const shouldApplyCentristsTax = PartyHooks.shouldApplyPolicy(this, PartyName.CENTRISTS, TurmoilPolicy.CENTRISTS_POLICY_2);

      let canAffordLobbyDelegate = true;
      if (shouldApplyCentristsTax && !this.canAfford(2)) canAffordLobbyDelegate = false;

      let lobbyingCost: number = 5;
      let inciteLobbyingCost: number = 3;

      if (shouldApplyCentristsTax) {
        lobbyingCost += 2;
        inciteLobbyingCost += 2;
      }

      if (turmoil.lobby.has(this.id) && canAffordLobbyDelegate) {
        sendDelegate = new SendDelegateToArea(this, 'Send a delegate in an area (from lobby)');

        if (shouldApplyCentristsTax) {
          sendDelegate = new SendDelegateToArea(this, 'Send a delegate in an area from lobby (2 M€)', {cost: 2});
        }
      } else if (this.isCorporation(CardName.INCITE) && this.canAfford(inciteLobbyingCost) && turmoil.getDelegatesInReserve(this.id) > 0) {
        sendDelegate = new SendDelegateToArea(this, 'Send a delegate in an area (' + inciteLobbyingCost + ' M€)', {cost: inciteLobbyingCost});
      } else if (this.canAfford(lobbyingCost) && turmoil.getDelegatesInReserve(this.id) > 0) {
        sendDelegate = new SendDelegateToArea(this, 'Send a delegate in an area (' + lobbyingCost + ' M€)', {cost: lobbyingCost});
      }

      if (sendDelegate) {
        const input = sendDelegate.execute();
        if (input !== undefined) {
          action.options.push(input);
        }
      }
    });

    if (LeadersExpansion.leaderActionIsUsable(this)) {
      action.options.push(this.useLeaderAction());
    }

    if (!this.game.isSoloMode() && this.actionsTakenThisRound > 0 && this.allOtherPlayersHavePassed() === false) {
      if (!this.game.gameOptions.fastModeOption) {
        action.options.push(this.endTurnOption());
      } else if (this.game.gameOptions.fastModeOption && this.remainingStallActionsCount > 0) {
        action.options.push(this.stallOption());
      }
    }

    if (this.canAfford(this.game.getAwardFundingCost(this)) && this.canFundAward()) {
      const remainingAwards = new OrOptions();
      remainingAwards.title = 'Fund an award';
      remainingAwards.buttonLabel = 'Confirm';
      remainingAwards.options = this.game.awards
        .filter((award: IAward) => this.game.hasBeenFunded(award) === false)
        .map((award: IAward) => this.fundAward(award));

      if (remainingAwards.options.length >= 1) action.options.push(remainingAwards);
    }

    action.options.push(this.getStandardProjectOption());

    action.options.push(this.passOption());

    // Sell patents
    const sellPatents = new SellPatentsStandardProject();
    if (sellPatents.canAct(this)) {
      action.options.push(sellPatents.action(this));
    }

    // Propose undo action only if you have done one action this turn
    if (this.actionsTakenThisRound > 0 && this.game.gameOptions.undoOption && this.canUndoLastAction) {
      action.options.push(new UndoActionOption());
    }

    // Conceding a game is only available from gen 5 onwards
    if (!this.game.isSoloMode() && this.game.generation > 4 && this.game.getPlayersStillInGame().length > 1) {
      action.options.push(this.concedeOption());
    }

    return action;
  }

  public canTrade(): boolean {
    if (this.game.gameOptions.singleTradeVariant && this.hasTradedThisTurn && !this.allOtherPlayersHavePassed()) return false;

    if (this.canAfford(this.getMcTradeCost())) return true;
    if (this.energy >= this.getEnergyTradeCost()) return true;
    if (this.titanium >= this.getTitaniumTradeCost()) return true;

    const titanFloatingLaunchPad = this.playedCards.find((card) => card.name === CardName.TITAN_FLOATING_LAUNCHPAD);
    if (titanFloatingLaunchPad !== undefined && titanFloatingLaunchPad.resourceCount! > 0) {
      return true;
    }

    const darksideSmugglersUnion = this.playedCards.find((card) => card.name === CardName.DARKSIDE_SMUGGLERS_UNION);
    if (darksideSmugglersUnion !== undefined && darksideSmugglersUnion.canAct!(this) && !this.actionsThisGeneration.has(darksideSmugglersUnion.name)) {
      return true;
    }

    return false;
  }

  private allOtherPlayersHavePassed(): boolean {
    const game = this.game;
    if (game.isSoloMode()) return true;
    const players = game.getPlayers();
    const passedPlayers = game.getPassedPlayers();
    return passedPlayers.length === players.length - 1 && passedPlayers.includes(this.color) === false;
  }

  public process(input: Array<Array<string>>): void {
    if (this.waitingFor === undefined || this.waitingForCb === undefined) {
      throw new Error('Not waiting for anything');
    }
    const waitingFor = this.waitingFor;
    const waitingForCb = this.waitingForCb;
    this.waitingFor = undefined;
    this.waitingForCb = undefined;
    try {
      this.timer.stop();
      this.runInput(input, waitingFor);
      waitingForCb();
    } catch (err) {
      this.setWaitingFor(waitingFor, waitingForCb);
      throw err;
    }
  }

  public getWaitingFor(): PlayerInput | undefined {
    return this.waitingFor;
  }
  public setWaitingFor(input: PlayerInput, cb: () => void = () => {}): void {
    if (this.waitingFor !== undefined) {
      // Add a metric.
      console.error('Overwriting a waitingFor: ' + this.waitingFor);
    }

    // If available spaces are restricted to be able to afford Reds policy
    if (input instanceof SelectSpace && this.howToAffordReds !== undefined && this.howToAffordReds.spaces !== undefined) {
      let availableSpaces = Array.from(this.howToAffordReds.spaces.keys());
      const spendableMegacredits = this.spendableMegacredits();

      // If spendableMegacredits < 0, do not filter the precomputed available placement spaces
      if (spendableMegacredits >= 0) {
        /*
        * If we are placing an ocean, and we have enough M€ to pay off all Reds taxes, we can place the ocean anywhere
        * This can happen if we played a card that could use steel or titanium, and we spent all available metals so we have excess M€
        * This situation arises because we do not know in advance how much of their available metals a player will choose to spend
        */
        if (spendableMegacredits >= this.howToAffordReds.redTaxes && availableSpaces.every((space) => space.spaceType === SpaceType.OCEAN)) {
          availableSpaces = this.game.board.getAvailableSpacesForOcean(this);
        } else if (spendableMegacredits < this.howToAffordReds.redTaxes) {
          /*
          * Here we are unable to afford Reds taxes when placing our ocean or land tile
          * This means we have no choice but to place it next to adjacent oceans to make up the shortfall
          * This computation is re-run after each new placement, so it takes the player's last placed tile into account
          */
          const oceanTileTypes = [TileType.OCEAN, TileType.OCEAN_CITY, TileType.OCEAN_FARM, TileType.OCEAN_SANCTUARY];

          availableSpaces = availableSpaces.filter((space) => {
            const adjacentOceans = this.game.board.getAdjacentSpaces(space).filter((s) => s.tile !== undefined && oceanTileTypes.includes(s.tile.tileType));
            let finalPlacementBonus = adjacentOceans.length * this.oceanBonus;

            if (this.isCorporation(CardName.ARCADIAN_COMMUNITIES) && space.player === this) {
              finalPlacementBonus += 3;
            }

            // TODO: This probably needs to consider Ares adjacency bonuses and other card effects too

            return finalPlacementBonus + spendableMegacredits >= this.howToAffordReds!.redTaxes;
          });
        }
      }

      // Check that it's a subset of defaults spaces
      /*
       * TODO: This should ideally use .every() instead of .some() plus the filter below
       * Currently it's being hacked as availableSpaces sometimes returns occupied spaces
       * Specifically, this happens when multiple ocean tiles need to be placed
       * And input.availableSpaces returns a list of valid ocean placement spots
       * However availableSpaces may include spots where an ocean was placed in the previous DeferredAction
       */
      // if (availableSpaces.every(space => input.availableSpaces.includes(space))) {
      if (availableSpaces.some(space => input.availableSpaces.includes(space))) {
        input.title += " (Adjusted for Reds policy)";
        // input.availableSpaces = availableSpaces;
        input.availableSpaces = availableSpaces.filter((s) => input.availableSpaces.includes(s));
      } else {
        // This is not supposed to happen let's simply reset it to prevent game breaking errors
        this.howToAffordReds = undefined;
      }
    }

    this.timer.start();
    this.waitingFor = input;
    this.waitingForCb = cb;
  }

  // This was only built for the Philares/Final Greenery case. Might not work elsewhere.
  public setWaitingForSafely(input: PlayerInput, cb: () => void = () => {}): void {
    if (this.waitingFor === undefined) {
      this.setWaitingFor(input, cb);
    } else {
      const oldcb = this.waitingForCb;
      this.waitingForCb =
        oldcb === undefined ?
          cb :
          () => {
            oldcb();
            this.setWaitingForSafely(input, cb);
          };
    }
  }

  private serializePlayedCards(): Array<SerializedCard> {
    return this.playedCards.map((c) => {
      const result: SerializedCard = {
        name: c.name,
      };
      if (c.bonusResource !== undefined) {
        result.bonusResource = c.bonusResource;
      }
      if (c.resourceCount !== undefined) {
        result.resourceCount = c.resourceCount;
      }
      if ((c as LeaderCard).isDisabled !== undefined) {
        result.isDisabled = (c as LeaderCard).isDisabled;
      }
      if ((c as LeaderCard).opgActionIsActive !== undefined) {
        result.opgActionIsActive = (c as LeaderCard).opgActionIsActive;
      }
      if ((c as LeaderCard).effectTriggerCount !== undefined) {
        result.effectTriggerCount = (c as LeaderCard).effectTriggerCount;
      }
      if ((c as LeaderCard).generationUsed !== undefined) {
        result.generationUsed = (c as LeaderCard).generationUsed;
      }
      if (c instanceof SelfReplicatingRobots) {
        result.targetCards = c.targetCards.map((t) => {
          return {
            card: {name: t.card.name},
            resourceCount: t.resourceCount,
          };
        });
      }
      return result;
    });
  }

  public serialize(): SerializedPlayer {
    const result: SerializedPlayer = {
      id: this.id,
      password: this.password,
      corporationCards: this.corporationCards.map((c) => {
        const data = {
          name: c.name,
          resourceCount: c.resourceCount,
          allTags: c instanceof Aridor ? Array.from(c.allTags) : [],
          isDisabled: c instanceof PharmacyUnion && c.isDisabled,
        };

        return data;
      }),
      // Used only during set-up
      pickedCorporationCard: this.pickedCorporationCard?.name,
      // Terraforming Rating
      terraformRating: this.terraformRating,
      hasIncreasedTerraformRatingThisGeneration: this.hasIncreasedTerraformRatingThisGeneration,
      terraformRatingAtGenerationStart: this.terraformRatingAtGenerationStart,
      // Resources
      megaCredits: this.megaCredits,
      megaCreditProduction: this.megaCreditProduction,
      steel: this.steel,
      steelProduction: this.steelProduction,
      titanium: this.titanium,
      titaniumProduction: this.titaniumProduction,
      plants: this.plants,
      plantProduction: this.plantProduction,
      energy: this.energy,
      energyProduction: this.energyProduction,
      heat: this.heat,
      heatProduction: this.heatProduction,
      // Resource values
      titaniumValue: this.titaniumValue,
      steelValue: this.steelValue,
      // Helion
      canUseHeatAsMegaCredits: this.canUseHeatAsMegaCredits,
      // This generation / this round
      actionsTakenThisRound: this.actionsTakenThisRound,
      actionsThisGeneration: Array.from(this.actionsThisGeneration),
      pendingInitialActions: this.pendingInitialActions.map((c) => c.name),
      remainingStallActionsCount: this.remainingStallActionsCount,
      // Cards
      dealtCorporationCards: this.dealtCorporationCards.map((c) => c.name),
      dealtProjectCards: this.dealtProjectCards.map((c) => c.name),
      dealtPreludeCards: this.dealtPreludeCards.map((c) => c.name),
      dealtLeaderCards: this.dealtLeaderCards.map((c) => c.name),
      cardsInHand: this.cardsInHand.map((c) => c.name),
      preludeCardsInHand: this.preludeCardsInHand.map((c) => c.name),
      leaderCardsInHand: this.leaderCardsInHand.map((c) => c.name),
      playedCards: this.serializePlayedCards(),
      draftedCards: this.draftedCards.map((c) => c.name),
      cardCost: this.cardCost,
      needsToDraft: this.needsToDraft,
      cardDiscount: this.cardDiscount,
      canUndoLastAction: this.canUndoLastAction,
      // Colonies
      fleetSize: this.fleetSize,
      tradesThisGeneration: this.tradesThisGeneration,
      hasTradedThisTurn: this.hasTradedThisTurn,
      colonyTradeOffset: this.colonyTradeOffset,
      colonyTradeDiscount: this.colonyTradeDiscount,
      colonyVictoryPoints: this.colonyVictoryPoints,
      hasBureaucratsColonyTradePenalty: this.hasBureaucratsColonyTradePenalty,
      hasTranshumansColonyTradeOffset: this.hasTranshumansColonyTradeOffset,
      // Turmoil
      turmoilPolicyActionUsed: this.turmoilPolicyActionUsed,
      politicalAgendasActionUsedCount: this.politicalAgendasActionUsedCount,
      dominantPartyActionUsedCount: this.dominantPartyActionUsedCount,
      hasTurmoilScienceTagBonus: this.hasTurmoilScienceTagBonus,
      oceanBonus: this.oceanBonus,
      // Custom cards
      // Leavitt Station.
      scienceTagCount: this.scienceTagCount,
      // Ecoline
      plantsNeededForGreenery: this.plantsNeededForGreenery,
      // Lawsuit
      removingPlayers: this.removingPlayers,
      // Playwrights
      removedFromPlayCards: this.removedFromPlayCards.map((c) => c.name),
      // Hotsprings
      heatProductionStepsIncreasedThisGeneration: this.heatProductionStepsIncreasedThisGeneration,
      // Double Down
      requirementsBonus: this.requirementsBonus,
      // Head Start
      hasUsedHeadStart: this.hasUsedHeadStart,
      // Passer
      consecutiveFirstPassCount: this.consecutiveFirstPassCount,
      // Purifier
      hazardsRemoved: this.hazardsRemoved,
      name: this.name,
      color: this.color,
      beginner: this.beginner,
      handicap: this.handicap,
      timer: this.timer.serialize(),
      hasConceded: this.hasConceded,
      // Stats
      totalSpend: this.totalSpend,
      endGenerationScores: this.endGenerationScores,
      actionsTakenThisGame: this.actionsTakenThisGame,
      totalDelegatesPlaced: this.totalDelegatesPlaced,
      totalChairmanshipsWon: this.totalChairmanshipsWon,
    };
    if (this.lastCardPlayed !== undefined) {
      result.lastCardPlayed = this.lastCardPlayed.name;
    }
    return result;
  }

  public static deserialize(d: SerializedPlayer): Player {
    const player = new Player(d.name, d.color, d.beginner, Number(d.handicap), d.id);
    const cardFinder = new CardFinder();

    player.actionsTakenThisGame = d.actionsTakenThisGame;
    player.actionsTakenThisRound = d.actionsTakenThisRound;
    player.canUndoLastAction = d.canUndoLastAction;
    player.canUseHeatAsMegaCredits = d.canUseHeatAsMegaCredits;
    player.cardCost = d.cardCost;
    player.cardDiscount = d.cardDiscount;
    player.colonyTradeDiscount = d.colonyTradeDiscount;
    player.colonyTradeOffset = d.colonyTradeOffset;
    player.colonyVictoryPoints = d.colonyVictoryPoints;
    player.consecutiveFirstPassCount = d.consecutiveFirstPassCount;
    player.pendingInitialActions = cardFinder.corporationCardsFromJSON(d.pendingInitialActions);
    player.endGenerationScores = d.endGenerationScores;
    player.energy = d.energy;
    player.energyProduction = d.energyProduction;
    player.fleetSize = d.fleetSize;
    player.hasConceded = d.hasConceded;
    player.hasIncreasedTerraformRatingThisGeneration = d.hasIncreasedTerraformRatingThisGeneration;
    player.hasTurmoilScienceTagBonus = d.hasTurmoilScienceTagBonus;
    player.hasBureaucratsColonyTradePenalty = d.hasBureaucratsColonyTradePenalty;
    player.hasTranshumansColonyTradeOffset = d.hasTranshumansColonyTradeOffset;
    player.hasUsedHeadStart = d.hasUsedHeadStart;
    player.hazardsRemoved = d.hazardsRemoved;
    player.heat = d.heat;
    player.heatProduction = d.heatProduction;
    player.heatProductionStepsIncreasedThisGeneration = d.heatProductionStepsIncreasedThisGeneration;
    player.megaCreditProduction = d.megaCreditProduction;
    player.megaCredits = d.megaCredits;
    player.needsToDraft = d.needsToDraft;
    player.oceanBonus = d.oceanBonus;
    player.password = d.password;
    player.plantProduction = d.plantProduction;
    player.plants = d.plants;
    player.plantsNeededForGreenery = d.plantsNeededForGreenery;
    player.remainingStallActionsCount = d.remainingStallActionsCount;
    player.removingPlayers = d.removingPlayers;
    // TODO: Remove after 28 Feb 2023
    player.requirementsBonus = d.requirementsBonus || 0;
    player.scienceTagCount = d.scienceTagCount;
    player.steel = d.steel;
    player.steelProduction = d.steelProduction;
    player.steelValue = d.steelValue;
    player.terraformRating = d.terraformRating;
    player.terraformRatingAtGenerationStart = d.terraformRatingAtGenerationStart;
    player.titanium = d.titanium;
    player.titaniumProduction = d.titaniumProduction;
    player.titaniumValue = d.titaniumValue;
    player.totalDelegatesPlaced = d.totalDelegatesPlaced;
    player.totalChairmanshipsWon = d.totalChairmanshipsWon;
    player.tradesThisGeneration = d.tradesThisGeneration;
    player.hasTradedThisTurn = d.hasTradedThisTurn;
    player.turmoilPolicyActionUsed = d.turmoilPolicyActionUsed;
    player.politicalAgendasActionUsedCount = d.politicalAgendasActionUsedCount;
    player.dominantPartyActionUsedCount = d.dominantPartyActionUsedCount;

    player.lastCardPlayed = d.lastCardPlayed !== undefined ?
      cardFinder.getProjectCardByName(d.lastCardPlayed) :
      undefined;

    // Rebuild removed from play cards (Playwrights)
    player.removedFromPlayCards = cardFinder.cardsFromJSON(d.removedFromPlayCards);

    player.actionsThisGeneration = new Set<CardName>(d.actionsThisGeneration);

    if (d.pickedCorporationCard !== undefined) {
      player.pickedCorporationCard = cardFinder.getCorporationCardByName(d.pickedCorporationCard);
    }

    // Rebuild corporation cards
    if (d.corporationCards.length > 0) {
      const playerCorps: Array<CorporationCard> = [];

      d.corporationCards.forEach((corp) => {
        const corpCard = cardFinder.getCorporationCardByName(corp.name);
        if (corpCard !== undefined) {
          if (corpCard.resourceCount !== undefined) {
            corpCard.resourceCount = corp.resourceCount;
          }
        }

        if (corpCard instanceof Aridor) {
          if (corp.allTags !== undefined) {
            corpCard.allTags = new Set(corp.allTags);
          } else {
            console.warn('did not find allTags for ARIDOR');
          }
        }

        if (corpCard instanceof PharmacyUnion) {
          corpCard.isDisabled = Boolean(corp.isDisabled);
        }

        playerCorps.push(corpCard!);
      });

      player.corporationCards = playerCorps;
    } else {
      player.corporationCards = [];
    }

    // Rebuild dealt corporation array
    player.dealtCorporationCards = cardFinder.corporationCardsFromJSON(d.dealtCorporationCards);

    // Rebuild dealt prelude array
    player.dealtPreludeCards = cardFinder.cardsFromJSON(d.dealtPreludeCards);

    // Rebuild dealt leaders array
    player.dealtLeaderCards = cardFinder.cardsFromJSON(d.dealtLeaderCards);

    // Rebuild dealt cards array
    player.dealtProjectCards = cardFinder.cardsFromJSON(d.dealtProjectCards);

    // Rebuild each cards in hand
    player.cardsInHand = cardFinder.cardsFromJSON(d.cardsInHand);

    // Rebuild each prelude in hand
    player.preludeCardsInHand = cardFinder.cardsFromJSON(d.preludeCardsInHand);

    // Rebuild each leader in hand
    player.leaderCardsInHand = cardFinder.cardsFromJSON(d.leaderCardsInHand);

    // Rebuild each played card
    player.playedCards = d.playedCards.map((element: SerializedCard) => {
      const card = cardFinder.getProjectCardByName(element.name)!;
      if (element.resourceCount !== undefined) {
        card.resourceCount = element.resourceCount;
      }
      // TODO: Leaders are part of played cards and not stored separately, for now
      if (element.isDisabled !== undefined) {
        (card as LeaderCard).isDisabled = Boolean(element.isDisabled);
      }
      if (element.opgActionIsActive !== undefined) {
        (card as LeaderCard).opgActionIsActive = Boolean(element.opgActionIsActive);
      }
      if (element.effectTriggerCount !== undefined) {
        (card as LeaderCard).effectTriggerCount = Number(element.effectTriggerCount);
      }
      if (element.generationUsed !== undefined) {
        (card as LeaderCard).generationUsed = Number(element.generationUsed);
      }
      if (card instanceof SelfReplicatingRobots && element.targetCards !== undefined) {
        card.targetCards = [];
        element.targetCards.forEach((targetCard) => {
          const foundTargetCard = cardFinder.getProjectCardByName(targetCard.card.name);
          if (foundTargetCard !== undefined) {
            card.targetCards.push({
              card: foundTargetCard,
              resourceCount: targetCard.resourceCount,
            });
          } else {
            console.warn('did not find card for SelfReplicatingRobots', targetCard);
          }
        });
      }
      if (card instanceof MiningCard && element.bonusResource !== undefined) {
        card.bonusResource = element.bonusResource;
      }
      return card;
    });

    // Rebuild each drafted cards
    player.draftedCards = cardFinder.cardsFromJSON(d.draftedCards);

    player.timer = Timer.deserialize(d.timer);

    return player;
  }

  public getFleetSize(): number {
    return this.fleetSize;
  }

  public increaseFleetSize(): void {
    if (this.fleetSize < MAX_FLEET_SIZE) this.fleetSize++;
  }

  public decreaseFleetSize(): void {
    if (this.fleetSize > 0) this.fleetSize--;
  }

  public hasAvailableColonyTileToBuildOn(): boolean {
    if (this.game.gameOptions.coloniesExtension === false) return false;

    const availableColonyTiles = this.game.colonies.filter((colony) => colony.isActive);
    let colonyTilesAlreadyBuiltOn: number = 0;

    availableColonyTiles.forEach((colony) => {
      if (colony.colonies.includes(this.id)) colonyTilesAlreadyBuiltOn++;
    });

    return colonyTilesAlreadyBuiltOn < availableColonyTiles.length;
  }

  public canUseSingleTurmoilAction(isDominantPartyAction: boolean): boolean {
    if (isDominantPartyAction) return this.dominantPartyActionUsedCount === 0;
    return this.turmoilPolicyActionUsed === false;
  }

  public canUseTripleTurmoilAction(isDominantPartyAction: boolean): boolean {
    if (isDominantPartyAction) return this.dominantPartyActionUsedCount < POLITICAL_AGENDAS_MAX_ACTION_USES;
    return this.politicalAgendasActionUsedCount < POLITICAL_AGENDAS_MAX_ACTION_USES;
  }

  /* Shorthand for deferring things */
  public defer(input: PlayerInput | undefined, priority: Priority): void {
    if (input === undefined) return;
    const action = new DeferredAction(this, () => input, priority);
    this.game.defer(action);
  }
}
