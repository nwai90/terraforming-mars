import {IAresData} from '../ares/IAresData';
import {Color} from '../Color';
import {Phase} from '../Phase';
import {ClaimedMilestoneModel} from './ClaimedMilestoneModel';
import {ColonyModel} from './ColonyModel';
import {FundedAwardModel} from './FundedAwardModel';
import {GameOptionsModel} from './GameOptionsModel';
import {PlayerModel} from './PlayerModel';
import {SpaceModel} from './SpaceModel';
import {TurmoilModel} from './TurmoilModel';

export interface SpectatorModel {
  aresData: IAresData | undefined;
  awards: Array<FundedAwardModel>;
  colonies: Array<ColonyModel>;
  coloniesCount: number;
  color: Color;
  deckSize: number;
  draftedPlayers: Array<Color>;
  gameOptions: GameOptionsModel;
  generation: number;
  id: string; // SpectatorID
  lastSoloGeneration: number;
  milestones: Array<ClaimedMilestoneModel>;
  oceans: number;
  oxygenLevel: number;
  passedPlayers: Array<Color>;
  phase: Phase;
  players: Array<PlayerModel>;
  researchedPlayers: Array<Color>;
  spaces: Array<SpaceModel>;
  temperature: number;
  turmoil: TurmoilModel | undefined;
  venusScaleLevel: number;
  silverCubeVariant: boolean;
  temperatureSilverCubeBonusMC: number;
  oceansSilverCubeBonusMC: number;
  oxygenSilverCubeBonusMC: number;
  venusSilverCubeBonusMC: number;
}
