import {Landlord} from './Landlord';
import {Banker} from './Banker';
import {Scientist} from './Scientist';
import {Thermalist} from './Thermalist';
import {Miner} from './Miner';
import {Venuphile} from './Venuphile';
import {IAward} from './IAward';
import {Industrialist} from './Industrialist';
import {Celebrity} from './Celebrity';
import {DesertSettler} from './DesertSettler';
import {EstateDealer} from './EstateDealer';
import {Benefactor} from './Benefactor';
import {Cultivator} from './Cultivator';
import {Magnate} from './Magnate';
import {SpaceBaron} from './SpaceBaron';
import {Excentric} from './Excentric';
import {Contractor} from './Contractor';
import {Entrepreneur} from './Entrepreneur';
import {FullMoon} from '../moon/FullMoon';
import {LunarMagnate} from '../moon/LunarMagnate';
import {Adapter} from './vastitasBorealis/Adapter';
import {Edgedancer} from './vastitasBorealis/Edgedancer';
import {Hoarder} from './vastitasBorealis/Hoarder';
import {Naturalist} from './vastitasBorealis/Naturalist';
import {Voyager} from './vastitasBorealis/Voyager';
import {Generator} from './arabiaTerra/Generator';
import {Highlander} from './arabiaTerra/Highlander';
import {Producer} from './arabiaTerra/Producer';
import {Purist} from './arabiaTerra/Purist';
import {Worker} from './arabiaTerra/Worker';

export const ORIGINAL_AWARDS: Array<IAward> = [
  new Landlord(),
  new Scientist(),
  new Banker(),
  new Thermalist(),
  new Miner(),
];

export const VENUS_AWARDS: Array<IAward> = [
  new Venuphile(),
];

export const ELYSIUM_AWARDS: Array<IAward> = [
  new Celebrity(),
  new Industrialist(),
  new DesertSettler(),
  new EstateDealer(),
  new Benefactor(),
];

export const HELLAS_AWARDS: Array<IAward> = [
  new Cultivator(),
  new Magnate(),
  new SpaceBaron(),
  new Excentric(),
  new Contractor(),
];

export const VASTITAS_BOREALIS_AWARDS: Array<IAward> = [
  new Adapter(),
  new Edgedancer(),
  new Hoarder(),
  new Naturalist(),
  new Voyager(),
];

export const ARABIA_TERRA_AWARDS: Array<IAward> = [
  new Generator(),
  new Highlander(),
  new Producer(),
  new Purist(),
  new Worker(),
];

export const ARES_AWARDS: Array<IAward> = [
  new Entrepreneur(),
];

export const MOON_AWARDS: Array<IAward> = [
  new FullMoon(),
  new LunarMagnate(),
];

export const ALL_AWARDS: Array<IAward> = [
  ...ORIGINAL_AWARDS,
  ...ELYSIUM_AWARDS,
  ...HELLAS_AWARDS,
  ...VENUS_AWARDS,
  ...ARES_AWARDS,
  ...MOON_AWARDS,
  ...VASTITAS_BOREALIS_AWARDS,
  ...ARABIA_TERRA_AWARDS,
];

export namespace Awards {
  export const ALL = ALL_AWARDS;

  export function getByName(name: string): IAward {
    const award = ALL_AWARDS.find((a) => a.name === name);
    if (award) {
      return award;
    }
    throw new Error(`Award ${name} not found.`);
  }
}
