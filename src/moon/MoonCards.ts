import {CardName} from '../CardName';

export class MoonCards {
  public static scienceCardsWithLessThan2VP: Set<CardName> = new Set([
    CardName.OLYMPUS_CONFERENCE,
    CardName.COPERNICUS_TOWER,
    CardName.LUNA_ARCHIVES,
    CardName.PRIDE_OF_THE_EARTH_ARKSHIP,
    CardName.NANOTECH_INDUSTRIES,
    CardName.SECRET_SANTA_SOCIETY,
    CardName.APPLIED_SCIENCE,
    CardName.SPIRE,
  ]);
  otherScienceCards: Set<CardName> = new Set([
    CardName.PHYSICS_COMPLEX,
    CardName.SEARCH_FOR_LIFE,
  ]);
}
