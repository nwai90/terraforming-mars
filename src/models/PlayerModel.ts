import {CardModel} from './CardModel';
import {GameOptionsModel} from './GameOptionsModel';
import {ColonyModel} from './ColonyModel';
import {Color} from '../Color';
import {VictoryPointsBreakdown} from '../VictoryPointsBreakdown';
import {ITagCount} from '../ITagCount';
import {TurmoilModel} from './TurmoilModel';
import {ClaimedMilestoneModel} from './ClaimedMilestoneModel';
import {FundedAwardModel} from './FundedAwardModel';
import {Phase} from '../Phase';
import {PlayerInputModel} from './PlayerInputModel';
import {SpaceModel} from './SpaceModel';
import {IAresData} from '../ares/IAresData';
import {SerializedTimer} from '../SerializedTimer';
import {MoonModel} from './MoonModel';

export interface PlayerModel {
    aresData: IAresData | undefined;
    awards: Array<FundedAwardModel>;
    corporationCard: CardModel | undefined;
    playedCards: Array<CardModel>;
    cardCost: number;
    cardsInHand: Array<CardModel>;
    cardsInHandNbr: number;
    citiesCount: number;
    coloniesCount: number;
    draftedCards: Array<CardModel>;
    noTagsCount: number;
    influence: number;
    colonies: Array<ColonyModel>;
    color: Color;
    energy: number;
    energyProduction: number;
    gameAge: number;
    gameOptions: GameOptionsModel;
    generation: number;
    heat: number;
    heatProduction: number;
    id: string; // PlayerId
    isActive: boolean;
    isSoloModeWin: boolean;
    megaCredits: number;
    megaCreditProduction: number;
    milestones: Array<ClaimedMilestoneModel>;
    moon: MoonModel | undefined;
    name: string;
    oceans: number;
    oxygenLevel: number;
    phase: Phase;
    plants: number;
    plantProduction: number;
    plantsAreProtected: boolean;
    players: Array<PlayerModel>;
    spaces: Array<SpaceModel>;
    steel: number;
    steelProduction: number;
    steelValue: number;
    temperature: number;
    terraformRating: number;
    titanium: number;
    titaniumProduction: number;
    titaniumValue: number;
    turmoil: TurmoilModel | undefined;
    venusScaleLevel: number;
    victoryPointsBreakdown: VictoryPointsBreakdown;
    tags: Array<ITagCount>;
    actionsThisGeneration: Array<string>;
    fleetSize: number;
    tradesThisTurn: number;
    selfReplicatingRobotsCards: Array<CardModel>;
    dealtCorporationCards: Array<CardModel>;
    dealtPreludeCards: Array<CardModel>;
    dealtProjectCards: Array<CardModel>;
    needsToDraft: boolean | undefined;
    passedPlayers: Array<Color>;
    draftedPlayers: Array<Color>;
    actionsTakenThisRound: number;
    deckSize: number;
    waitingFor: PlayerInputModel | undefined;
    timer: SerializedTimer;
    totalSpend: number;
}
