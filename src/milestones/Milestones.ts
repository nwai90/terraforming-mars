import {Terraformer} from './Terraformer';
import {Mayor} from './Mayor';
import {Gardener} from './Gardener';
import {Builder} from './Builder';
import {Planner} from './Planner';
import {Hoverlord} from './Hoverlord';
import {IMilestone} from './IMilestone';
import {Generalist} from './Generalist';
import {Specialist} from './Specialist';
import {Ecologist} from './Ecologist';
import {Tycoon} from './Tycoon';
import {Legend} from './Legend';
import {Diversifier} from './Diversifier';
import {Tactician} from './Tactician';
import {PolarExplorer} from './PolarExplorer';
import {Energizer} from './Energizer';
import {RimSettler} from './RimSettler';
import {Networker} from './Networker';
import {OneGiantStep} from '../moon/OneGiantStep';
import {Lunarchitect} from '../moon/Lunarchitect';
import {Electrician} from './vastitasBorealis/Electrician';
import {Smith} from './vastitasBorealis/Smith';
import {Irrigator} from './vastitasBorealis/Irrigator';
import {Capitalist} from './vastitasBorealis/Capitalist';
import {Tradesman} from './vastitasBorealis/Tradesman';
import {Frontrunner} from './arabiaTerra/Frontrunner';
import {Herbalist} from './arabiaTerra/Herbalist';
import {Morningstar} from './arabiaTerra/Morningstar';
import {Protagonist} from './arabiaTerra/Protagonist';
import {Researcher} from './arabiaTerra/Researcher';
import {Collector} from './terraCimmeria/Collector';
import {Firestarter} from './terraCimmeria/Firestarter';
import {Gambler} from './terraCimmeria/Gambler';
import {Spacefarer} from './terraCimmeria/Spacefarer';
import {Pioneer} from './terraCimmeria/Pioneer';
import {Colonizer} from './amazonisPlanitia/Colonizer';
import {Farmer} from './amazonisPlanitia/Farmer';
import {Minimalist} from './amazonisPlanitia/Minimalist';
import {Terran} from './amazonisPlanitia/Terran';
import {Tropicalist} from './amazonisPlanitia/Tropicalist';
import {Monument} from './fanmade/Monument';
import {Wanderer} from './fanmade/Wanderer';

export const ORIGINAL_MILESTONES: Array<IMilestone> = [
  new Terraformer(),
  new Mayor(),
  new Gardener(),
  new Builder(),
  new Planner(),
];

export const VENUS_MILESTONES: Array<IMilestone> = [
  new Hoverlord(),
];

export const ELYSIUM_MILESTONES: Array<IMilestone> = [
  new Generalist(),
  new Specialist(),
  new Ecologist(),
  new Tycoon(),
  new Legend(),
];

export const HELLAS_MILESTONES: Array<IMilestone> = [
  new Diversifier(),
  new Tactician(),
  new PolarExplorer(),
  new Energizer(),
  new RimSettler(),
];

export const VASTITAS_BOREALIS_MILESTONES: Array<IMilestone> = [
  new Electrician(),
  new Smith(),
  new Tradesman(),
  new Irrigator(),
  new Capitalist(),
];

export const ARABIA_TERRA_MILESTONES: Array<IMilestone> = [
  new Frontrunner(),
  new Herbalist(),
  new Morningstar(),
  new Protagonist(),
  new Researcher(),
];

export const TERRA_CIMMERIA_MILESTONES: Array<IMilestone> = [
  new Collector(),
  new Firestarter(),
  new Pioneer(),
  new Spacefarer(),
  new Gambler(),
];

export const AMAZONIS_PLANITIA_MILESTONES: Array<IMilestone> = [
  new Colonizer(),
  new Farmer(),
  new Minimalist(),
  new Terran(),
  new Tropicalist(),
];

export const NEW_OPS_MILESTONES: Array<IMilestone> = [
  new Monument(),
  new Wanderer(),
];

export const ARES_MILESTONES: Array<IMilestone> = [
  new Networker(),
];

export const MOON_MILESTONES: Array<IMilestone> = [
  new OneGiantStep(),
  new Lunarchitect(),
];

export const ALL_MILESTONES: Array<IMilestone> = [
  ...ORIGINAL_MILESTONES,
  ...ELYSIUM_MILESTONES,
  ...HELLAS_MILESTONES,
  ...VASTITAS_BOREALIS_MILESTONES,
  ...ARABIA_TERRA_MILESTONES,
  ...TERRA_CIMMERIA_MILESTONES,
  ...AMAZONIS_PLANITIA_MILESTONES,
  ...NEW_OPS_MILESTONES,
  ...VENUS_MILESTONES,
  ...ARES_MILESTONES,
  ...MOON_MILESTONES,
];

export namespace Milestones {
  export const ALL = ALL_MILESTONES;

  export function getByName(name: string): IMilestone {
    const milestone = ALL_MILESTONES.find((m) => m.name === name);
    if (milestone) {
      return milestone;
    }
    throw new Error(`Milestone ${name} not found.`);
  }
}
