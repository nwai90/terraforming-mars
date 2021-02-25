import {GlobalEventName} from './GlobalEventName';
import {IGlobalEvent} from './IGlobalEvent';
import {GlobalDustStorm} from './GlobalDustStorm';
import {SponsoredProjects} from './SponsoredProjects';
import {AsteroidMining} from './AsteroidMining';
import {GenerousFunding} from './GenerousFunding';
import {SuccessfulOrganisms} from './SuccessfulOrganisms';
import {Productivity} from './Productivity';
import {EcoSabotage} from './EcoSabotage';
import {HomeworldSupport} from './HomeworldSupport';
import {MinersOnStrike} from './MinersOnStrike';
import {MudSlides} from './MudSlides';
import {Revolution} from './Revolution';
import {Riots} from './Riots';
import {Sabotage} from './Sabotage';
import {SnowCover} from './SnowCover';
import {VolcanicEruptions} from './VolcanicEruptions';
import {InterplanetaryTrade} from './InterplanetaryTrade';
import {ImprovedEnergyTemplates} from './ImprovedEnergyTemplates';
import {WarOnEarth} from './WarOnEarth';
import {Pandemic} from './Pandemic';
import {Diversity} from './Diversity';
import {CelebrityLeaders} from './CelebrityLeaders';
import {SpinoffProducts} from './SpinoffProducts';
import {Election} from './Election';
import {AquiferReleasedByPublicCouncil} from './AquiferReleasedByPublicCouncil';
import {ParadigmBreakdown} from './ParadigmBreakdown';
import {CorrosiveRain} from './CorrosiveRain';
import {Game} from '../../Game';
import {JovianTaxRights} from './JovianTaxRights';
import {DryDeserts} from './DryDeserts';
import {ScientificCommunity} from './ScientificCommunity';
import {RedInfluence} from './RedInfluence';
import {SolarnetShutdown} from './SolarnetShutdown';
import {StrongSociety} from './StrongSociety';
import {SolarFlare} from './SolarFlare';
import {VenusInfrastructure} from './VenusInfrastructure';
import {CloudSocieties} from './CloudSocieties';
import {MicrogravityHealthProblems} from './MicrogravityHealthProblems';
import {SerializedGlobalEventDealer} from './SerializedGlobalEventDealer';
import {ISerializable} from '../../ISerializable';
import {FermiSolution} from './society/FermiSolution';
import {OperationDaedalus} from './society/OperationDaedalus';
import {ClimateImpact} from './society/ClimateImpact';
import {Gerontocracy} from './society/Gerontocracy';
import {MetaSpirituality} from './society/MetaSpirituality';
import {UniversalRoom} from './society/UniversalRoom';
import {ExhaltSpecies} from './society/ExhaltSpecies';
import {AdaptedPathogens} from './society/AdaptedPathogens';
import {ColonizationIncentives} from './society/ColonizationIncentives';
import {SolarCryptocurrency} from './society/SolarCryptocurrency';
import {SmugglingActivity} from './society/SmugglingActivity';
import {GenomeControl} from './society/GenomeControl';
import {VerdantEconomy} from './society/VerdantEconomy';
import {ControlledTectonics} from './society/ControlledTectonics';
import {RaidOnPrivateers} from './society/RaidOnPrivateers';
import {DutyFreeSpace} from './society/DutyFreeSpace';
import {Renationalisation} from './society/Renationalisation';
import {TechnologicalTelepathy} from './society/TechnologicalTelepathy';
import {VirtualDemocracy} from './society/VirtualDemocracy';
import {ClosedBiospheres} from './society/ClosedBiospheres';
import {ExtrasolarRace} from './society/ExtrasolarRace';
import {SocialNihilism} from './society/SocialNihilism';
import {DysonSwarmConstruction} from './society/DysonSwarmConstruction';
import {MagneticShield} from './society/MagneticShield';
import {PowerTrip} from './society/PowerTrip';
import {ConnectedCommunities} from './society/ConnectedCommunities';
import {PlanetFederation} from './society/PlanetFederation';
import {TransparentPolitics} from './society/TransparentPolitics';
import {PreferentialLoans} from './society/PreferentialLoans';
import {KesslersBlast} from './society/KesslersBlast';
import {PhaetonRescue} from './society/PhaetonRescue';
import {Bioplague} from './society/Bioplague';
import {AtmosphericCompression} from './society/AtmosphericCompression';
import {WoodlandInitiatives} from './society/WoodlandInitiatives';
import {ThermalFusion} from './society/ThermalFusion';
import {BloomingVale} from './society/BloomingVale';

export interface IGlobalEventFactory<T> {
    globalEventName: GlobalEventName;
    Factory: new () => T
}

export const COLONY_ONLY_POSITIVE_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.JOVIAN_TAX_RIGHTS, Factory: JovianTaxRights},
];

export const COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.MICROGRAVITY_HEALTH_PROBLEMS, Factory: MicrogravityHealthProblems},
];

export const VENUS_COLONY_POSITIVE_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.CLOUD_SOCIETIES, Factory: CloudSocieties},
];

export const VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.CORROSIVE_RAIN, Factory: CorrosiveRain},
];

export const VENUS_POSITIVE_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.VENUS_INFRASTRUCTURE, Factory: VenusInfrastructure},
];

// ALL POSITIVE GLOBAL EVENTS
export const POSITIVE_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.SPONSORED_PROJECTS, Factory: SponsoredProjects},
  {globalEventName: GlobalEventName.ASTEROID_MINING, Factory: AsteroidMining},
  {globalEventName: GlobalEventName.GENEROUS_FUNDING, Factory: GenerousFunding},
  {globalEventName: GlobalEventName.SUCCESSFUL_ORGANISMS, Factory: SuccessfulOrganisms},
  {globalEventName: GlobalEventName.PRODUCTIVITY, Factory: Productivity},
  {globalEventName: GlobalEventName.HOMEWORLD_SUPPORT, Factory: HomeworldSupport},
  {globalEventName: GlobalEventName.VOLCANIC_ERUPTIONS, Factory: VolcanicEruptions},
  {globalEventName: GlobalEventName.DIVERSITY, Factory: Diversity},
  {globalEventName: GlobalEventName.IMPROVED_ENERGY_TEMPLATES, Factory: ImprovedEnergyTemplates},
  {globalEventName: GlobalEventName.INTERPLANETARY_TRADE, Factory: InterplanetaryTrade},
  {globalEventName: GlobalEventName.CELEBRITY_LEADERS, Factory: CelebrityLeaders},
  {globalEventName: GlobalEventName.SPINOFF_PRODUCTS, Factory: SpinoffProducts},
  {globalEventName: GlobalEventName.ELECTION, Factory: Election},
  {globalEventName: GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL, Factory: AquiferReleasedByPublicCouncil},
  {globalEventName: GlobalEventName.SCIENTIFIC_COMMUNITY, Factory: ScientificCommunity},
  {globalEventName: GlobalEventName.STRONG_SOCIETY, Factory: StrongSociety},
];

// ALL NEGATIVE GLOBAL EVENTS
export const NEGATIVE_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.GLOBAL_DUST_STORM, Factory: GlobalDustStorm},
  {globalEventName: GlobalEventName.ECO_SABOTAGE, Factory: EcoSabotage},
  {globalEventName: GlobalEventName.MINERS_ON_STRIKE, Factory: MinersOnStrike},
  {globalEventName: GlobalEventName.MUD_SLIDES, Factory: MudSlides},
  {globalEventName: GlobalEventName.REVOLUTION, Factory: Revolution},
  {globalEventName: GlobalEventName.RIOTS, Factory: Riots},
  {globalEventName: GlobalEventName.SABOTAGE, Factory: Sabotage},
  {globalEventName: GlobalEventName.SNOW_COVER, Factory: SnowCover},
  {globalEventName: GlobalEventName.PANDEMIC, Factory: Pandemic},
  {globalEventName: GlobalEventName.WAR_ON_EARTH, Factory: WarOnEarth},
  {globalEventName: GlobalEventName.PARADIGM_BREAKDOWN, Factory: ParadigmBreakdown},
  {globalEventName: GlobalEventName.DRY_DESERTS, Factory: DryDeserts},
  {globalEventName: GlobalEventName.RED_INFLUENCE, Factory: RedInfluence},
  {globalEventName: GlobalEventName.SOLARNET_SHUTDOWN, Factory: SolarnetShutdown},
  {globalEventName: GlobalEventName.SOLAR_FLARE, Factory: SolarFlare},
];

// SOCIETY EXPANSION GLOBAL EVENTS
export const SOCIETY_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.ADAPTED_PATHOGENS, Factory: AdaptedPathogens},
  {globalEventName: GlobalEventName.BIOPLAGUE, Factory: Bioplague},
  {globalEventName: GlobalEventName.BLOOMING_VALE, Factory: BloomingVale},
  {globalEventName: GlobalEventName.CLIMATE_IMPACT, Factory: ClimateImpact},
  {globalEventName: GlobalEventName.CLOSED_BIOSPHERES, Factory: ClosedBiospheres},
  {globalEventName: GlobalEventName.CONNECTED_COMMUNITIES, Factory: ConnectedCommunities},
  {globalEventName: GlobalEventName.DYSON_SWARM_CONSTRUCTION, Factory: DysonSwarmConstruction},
  {globalEventName: GlobalEventName.EXHALT_SPECIES, Factory: ExhaltSpecies},
  {globalEventName: GlobalEventName.EXTRASOLAR_RACE, Factory: ExtrasolarRace},
  {globalEventName: GlobalEventName.GENOME_CONTROL, Factory: GenomeControl},
  {globalEventName: GlobalEventName.GERONTOCRACY, Factory: Gerontocracy},
  {globalEventName: GlobalEventName.KESSLERS_BLAST, Factory: KesslersBlast},
  {globalEventName: GlobalEventName.MAGNETIC_SHIELD, Factory: MagneticShield},
  {globalEventName: GlobalEventName.META_SPIRITUALITY, Factory: MetaSpirituality},
  {globalEventName: GlobalEventName.PLANET_FEDERATION, Factory: PlanetFederation},
  {globalEventName: GlobalEventName.POWER_TRIP, Factory: PowerTrip},
  {globalEventName: GlobalEventName.PREFERENTIAL_LOANS, Factory: PreferentialLoans},
  {globalEventName: GlobalEventName.RAID_ON_PRIVATEERS, Factory: RaidOnPrivateers},
  {globalEventName: GlobalEventName.RENATIONALISATION, Factory: Renationalisation},
  {globalEventName: GlobalEventName.SOCIAL_NIHILISM, Factory: SocialNihilism},
  {globalEventName: GlobalEventName.SOLAR_CRYPTOCURRENCY, Factory: SolarCryptocurrency},
  {globalEventName: GlobalEventName.TECHNOLOGICAL_TELEPATHY, Factory: TechnologicalTelepathy},
  {globalEventName: GlobalEventName.THERMAL_FUSION, Factory: ThermalFusion},
  {globalEventName: GlobalEventName.TRANSPARENT_POLITICS, Factory: TransparentPolitics},
  {globalEventName: GlobalEventName.UNIVERSAL_ROOM, Factory: UniversalRoom},
  {globalEventName: GlobalEventName.VERDANT_ECONOMY, Factory: VerdantEconomy},
  {globalEventName: GlobalEventName.VIRTUAL_DEMOCRACY, Factory: VirtualDemocracy},
  {globalEventName: GlobalEventName.WOODLAND_INITIATIVES, Factory: WoodlandInitiatives},
];

export const SOCIETY_VENUS_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.ATMOSPHERIC_COMPRESSION, Factory: AtmosphericCompression},
  {globalEventName: GlobalEventName.CONTROLLED_TECTONICS, Factory: ControlledTectonics},
  {globalEventName: GlobalEventName.DUTY_FREE_SPACE, Factory: DutyFreeSpace},
]

export const SOCIETY_COLONY_GLOBAL_EVENTS: Array<IGlobalEventFactory<IGlobalEvent>> = [
  {globalEventName: GlobalEventName.COLONIZATION_INCENTIVES, Factory: ColonizationIncentives},
  {globalEventName: GlobalEventName.FERMI_SOLUTION, Factory: FermiSolution},
  {globalEventName: GlobalEventName.OPERATION_DAEDALUS, Factory: OperationDaedalus},
  {globalEventName: GlobalEventName.PHAETON_RESCUE, Factory: PhaetonRescue},
  {globalEventName: GlobalEventName.SMUGGLING_ACTIVITY, Factory: SmugglingActivity},
]

const ALL_EVENTS = [
  ...POSITIVE_GLOBAL_EVENTS,
  ...NEGATIVE_GLOBAL_EVENTS,
  ...COLONY_ONLY_POSITIVE_GLOBAL_EVENTS,
  ...COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS,
  ...VENUS_COLONY_POSITIVE_GLOBAL_EVENTS,
  ...VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS,
  ...VENUS_POSITIVE_GLOBAL_EVENTS,
  ...SOCIETY_GLOBAL_EVENTS,
  ...SOCIETY_VENUS_GLOBAL_EVENTS,
  ...SOCIETY_COLONY_GLOBAL_EVENTS,
];

// Function to return a global event object by its name
export function getGlobalEventByName(globalEventName: string): IGlobalEvent | undefined {
  const globalEventFactory = ALL_EVENTS.find((globalEventFactory) => globalEventFactory.globalEventName === globalEventName);

  if (globalEventFactory !== undefined) return new globalEventFactory.Factory();
  return undefined;
}

export class GlobalEventDealer implements ISerializable<SerializedGlobalEventDealer> {
  constructor(
    public readonly globalEventsDeck: Array<IGlobalEvent>,
    public readonly discardedGlobalEvents: Array<IGlobalEvent>) {}

  public static newInstance(game: Game): GlobalEventDealer {
    let globalEventsDeck: IGlobalEvent[];
    let events: IGlobalEventFactory<IGlobalEvent>[] = [];
    const societyExpansionEnabled: boolean = game.gameOptions.societyExpansion;

    if (societyExpansionEnabled === true) {
      events.push(...SOCIETY_GLOBAL_EVENTS);
      if (game.gameOptions.venusNextExtension) events.push(...SOCIETY_VENUS_GLOBAL_EVENTS);
      if (game.gameOptions.coloniesExtension) events.push(...SOCIETY_COLONY_GLOBAL_EVENTS);
    } else {
      this.addOfficialGlobalEventsToDeck(game, events);
    }

    if (game.gameOptions.randomTurmoil) this.addOfficialGlobalEventsToDeck(game, events);
    globalEventsDeck = this.shuffle(events.map((cf) => new cf.Factory()));

    if (game.gameOptions.randomTurmoil) globalEventsDeck = globalEventsDeck.slice(0, 36);

    return new GlobalEventDealer(globalEventsDeck, []);
  };

  private static addOfficialGlobalEventsToDeck(game: Game, events: IGlobalEventFactory<IGlobalEvent>[]): void {
    events.push(...POSITIVE_GLOBAL_EVENTS);
    events.push(...NEGATIVE_GLOBAL_EVENTS);

    if (game.gameOptions.coloniesExtension) events.push(...COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS);
    if (game.gameOptions.coloniesExtension) events.push(...COLONY_ONLY_POSITIVE_GLOBAL_EVENTS);

    if (game.gameOptions.venusNextExtension) events.push(...VENUS_POSITIVE_GLOBAL_EVENTS);

    if (game.gameOptions.venusNextExtension && game.gameOptions.coloniesExtension) {
      events.push(...VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS);
      events.push(...VENUS_COLONY_POSITIVE_GLOBAL_EVENTS);
    }
  }

  private static shuffle(cards: Array<IGlobalEvent>): Array<IGlobalEvent> {
    const deck: Array<IGlobalEvent> = [];
    const copy = cards.slice();
    while (copy.length) {
      deck.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return deck;
  }

  public draw(): IGlobalEvent | undefined {
    const globalEvent = this.globalEventsDeck.pop();
    if (globalEvent) return globalEvent;
    return undefined;
  }

  public serialize(): SerializedGlobalEventDealer {
    return {
      deck: this.globalEventsDeck.map((card) => card.name),
      discarded: this.discardedGlobalEvents.map((card) => card.name),
    };
  }

  public static deserialize(d: SerializedGlobalEventDealer): GlobalEventDealer {
    const deck = d.deck.map((element: GlobalEventName) => {
      return getGlobalEventByName(element)!;
    });

    const discardPile = d.discarded.map((element: GlobalEventName) => {
      return getGlobalEventByName(element)!;
    });
    return new GlobalEventDealer(deck, discardPile);
  }
}
