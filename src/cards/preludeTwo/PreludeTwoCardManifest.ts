import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {AntiDesertificationTechniques} from './AntiDesertificationTechniques';
import {AppliedScience} from './AppliedScience';
import {AqueductSystems} from './AqueductSystems';
import {AstraMechanica} from './AstraMechanica';
import {AtmosphericEnhancers} from './AtmosphericEnhancers';
import {CarbonNanosystems} from './CarbonNanosystems';
import {CeresTechMarket} from './CeresTechMarket';
import {CloudTourism} from './CloudTourism';
import {ColonyTradeHub} from './ColonyTradeHub';
import {CyberiaSystems} from './CyberiaSystems';
import {Ecotec} from './Ecotec';
import {EstablishedMethods} from './EstablishedMethods';
import {FocusedOrganization} from './FocusedOrganization';
import {GiantSolarCollector} from './GiantSolarCollector';
import {HermeticOrderOfMars} from './HermeticOrderOfMars';
import {HomeostasisBureau} from './HomeostasisBureau';
import {IshtarExpedition} from './IshtarExpedition';
import {KaguyaTech} from './KaguyaTech';
import {KuiperCooperative} from './KuiperCooperative';
import {LiTradeTerminal} from './LiTradeTerminal';
import {MarsNomads} from './MarsNomads';
import {MartianLumberCorp} from './MartianLumberCorp';
import {NeptunianPowerConsultants} from './NeptunianPowerConsultants';
import {NirgalEnterprises} from './NirgalEnterprises';
import {NobelPrize} from './NobelPrize';
import {OldMiningColony} from './OldMiningColony';
import {RedAppeasement} from './RedAppeasement';
import {RedShips} from './RedShips';
import {PalladinShipping} from './PalladinShipping';
import {SagittaFrontierServices} from './SagittaFrontierServices';
import {SolarLogistics} from './SolarLogistics';
import {Spire} from './Spire';
import {StJosephOfCupertinoMission} from './StJosephOfCupertinoMission';
import {StrategicBasePlanning} from './StrategicBasePlanning';
import {SummitLogistics} from './SummitLogistics';
import {TerraformingDeal} from './TerraformingDeal';
import {Teslaract} from './Teslaract';
import {TychoMagnetics} from './TychoMagnetics';
import {VenusTradeHub} from './VenusTradeHub';
import {SponsoringNation} from './SponsoringNation';
import {ColonialEnvoys} from './ColonialEnvoys';
import {CorridorsOfPower} from './CorridorsOfPower';

export const PRELUDE_TWO_CARD_MANIFEST = new CardManifest({
  module: GameModule.PreludeTwo,
  projectCards: [
    {cardName: CardName.ASTRA_MECHANICA, Factory: AstraMechanica},
    {cardName: CardName.AQUEDUCT_SYSTEMS, Factory: AqueductSystems},
    {cardName: CardName.CARBON_NANOSYSTEMS, Factory: CarbonNanosystems},
    {cardName: CardName.CERES_TECH_MARKET, Factory: CeresTechMarket, compatibility: GameModule.Colonies},
    {cardName: CardName.CLOUD_TOURISM, Factory: CloudTourism, compatibility: GameModule.Venus},
    {cardName: CardName.COLONIAL_ENVOYS, Factory: ColonialEnvoys, compatibility: GameModule.Turmoil},
    {cardName: CardName.CYBERIA_SYSTEMS, Factory: CyberiaSystems},
    {cardName: CardName.HERMETIC_ORDER_OF_MARS, Factory: HermeticOrderOfMars},
    {cardName: CardName.HOMEOSTASIS_BUREAU, Factory: HomeostasisBureau},
    {cardName: CardName.ISHTAR_EXPEDITION, Factory: IshtarExpedition, compatibility: GameModule.Venus},
    {cardName: CardName.KAGUYA_TECH, Factory: KaguyaTech},
    {cardName: CardName.LI_TRADE_TERMINAL, Factory: LiTradeTerminal, compatibility: GameModule.Colonies},
    {cardName: CardName.MARS_NOMADS, Factory: MarsNomads},
    {cardName: CardName.MARTIAN_LUMBER_CORP, Factory: MartianLumberCorp},
    {cardName: CardName.NEPTUNIAN_POWER_CONSULTANTS, Factory: NeptunianPowerConsultants},
    {cardName: CardName.RED_APPEASEMENT, Factory: RedAppeasement, compatibility: GameModule.Turmoil},
    {cardName: CardName.RED_SHIPS, Factory: RedShips},
    {cardName: CardName.SOLAR_LOGISTICS, Factory: SolarLogistics},
    {cardName: CardName.SPONSORING_NATION, Factory: SponsoringNation, compatibility: GameModule.Turmoil},
    {cardName: CardName.ST_JOSEPH_OF_CUPERTINO_MISSION, Factory: StJosephOfCupertinoMission},
    {cardName: CardName.SUMMIT_LOGISTICS, Factory: SummitLogistics, compatibility: GameModule.Turmoil},
    {cardName: CardName.TESLARACT, Factory: Teslaract},
    {cardName: CardName.VENUS_TRADE_HUB, Factory: VenusTradeHub, compatibility: [GameModule.Venus, GameModule.Colonies]},
  ],
  corporationCards: [
    {cardName: CardName.ECOTEC, Factory: Ecotec},
    {cardName: CardName.KUIPER_COOPERATIVE, Factory: KuiperCooperative},
    {cardName: CardName.NIRGAL_ENTERPRISES, Factory: NirgalEnterprises},
    {cardName: CardName.PALLADIN_SHIPPING, Factory: PalladinShipping},
    {cardName: CardName.SAGITTA_FRONTIER_SERVICES, Factory: SagittaFrontierServices},
    {cardName: CardName.SPIRE, Factory: Spire},
    {cardName: CardName.TYCHO_MAGNETICS, Factory: TychoMagnetics},
  ],
  preludeCards: [
    {cardName: CardName.ANTI_DESERTIFICATION_TECHNIQUES, Factory: AntiDesertificationTechniques},
    {cardName: CardName.APPLIED_SCIENCE, Factory: AppliedScience},
    {cardName: CardName.ATMOSPHERIC_ENHANCERS, Factory: AtmosphericEnhancers, compatibility: GameModule.Venus},
    {cardName: CardName.COLONY_TRADE_HUB, Factory: ColonyTradeHub, compatibility: GameModule.Colonies},
    {cardName: CardName.CORRIDORS_OF_POWER, Factory: CorridorsOfPower, compatibility: GameModule.Turmoil},
    {cardName: CardName.ESTABLISHED_METHODS, Factory: EstablishedMethods},
    {cardName: CardName.FOCUSED_ORGANIZATION, Factory: FocusedOrganization},
    {cardName: CardName.GIANT_SOLAR_COLLECTOR, Factory: GiantSolarCollector, compatibility: GameModule.Venus},
    {cardName: CardName.NOBEL_PRIZE, Factory: NobelPrize},
    {cardName: CardName.OLD_MINING_COLONY, Factory: OldMiningColony, compatibility: GameModule.Colonies},
    {cardName: CardName.STRATEGIC_BASE_PLANNING, Factory: StrategicBasePlanning, compatibility: GameModule.Colonies},
    {cardName: CardName.TERRAFORMING_DEAL, Factory: TerraformingDeal},
  ],
});
