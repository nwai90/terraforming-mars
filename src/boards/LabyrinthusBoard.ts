import {SpaceBonus} from '../SpaceBonus';
import {Board} from './Board';
import {Player} from '../Player';
import {BoardBuilder} from './BoardBuilder';
import {SerializedBoard} from './SerializedBoard';
import {Random} from '../Random';
import {SpaceType} from '../SpaceType';
import {HELLAS_BONUS_OCEAN_COST, VASTITAS_BOREALIS_BONUS_TEMPERATURE_COST} from '../constants';
import {ISpace} from './ISpace';

export class LabyrinthusBoard extends Board {
  public static newInstance(_shuffle: boolean, rng: Random, includeVenus: boolean, includePromo: boolean, erodedSpaces: Array<string> = []): LabyrinthusBoard {
    const builder = new BoardBuilder(includeVenus, includePromo);
    const bonuses: Array<Array<SpaceBonus>> = LabyrinthusBoard.generateRandomSpacesWithBonuses();
    const getRandomBonus: Function = (bonuses: Array<Array<SpaceBonus>>): Array<SpaceBonus> => bonuses.splice(Math.floor(Math.random() * bonuses.length), 1)[0];

    // y=0
    builder.land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses));
    // y=1
    builder.ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses));
    // y=2
    builder.land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses));
    // y=3
    builder.land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses));
    // y=4
    builder.land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses));
    // y=5
    builder.land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses));
    // y=6
    builder.land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses));
    // y=7
    builder.ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses)).ocean(...getRandomBonus(bonuses));
    // y=8
    builder.land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses)).land(...getRandomBonus(bonuses));

    builder.shuffle(rng);

    const spaces = builder.build(erodedSpaces);
    return new LabyrinthusBoard(spaces);
  }

  public static deserialize(board: SerializedBoard, players: Array<Player>): LabyrinthusBoard {
    return new LabyrinthusBoard(Board.deserializeSpaces(board.spaces, players));
  }
 
  public static generateRandomSpacesWithBonuses(): Array<Array<SpaceBonus>> {
    // Total of 100 items, approximately weighted
    const allPossibleBonuses: Array<SpaceBonus> = [
      ...Array(44).fill(SpaceBonus.PLANT),
      ...Array(10).fill(SpaceBonus.HEAT),
      ...Array(16).fill(SpaceBonus.STEEL),
      ...Array(6).fill(SpaceBonus.TITANIUM),
      ...Array(8).fill(SpaceBonus.DRAW_CARD),
      ...Array(8).fill(SpaceBonus.POWER),
      ...Array(3).fill(SpaceBonus.ANIMAL),
      ...Array(3).fill(SpaceBonus.MICROBE),
      ...Array(1).fill(SpaceBonus.OCEAN),
      ...Array(1).fill(SpaceBonus.TEMPERATURE),
    ];

    // First set up 1 space with (up to) 3 space bonuses
    const spaces : Array<Array<SpaceBonus>> = [LabyrinthusBoard.generateRandomSpaceBonuses(allPossibleBonuses, 3)];

    // Followed by 10-15 spaces with 0 space bonuses
    const spacesWithNoBonusesCount : number = Math.floor(Math.random() * (15 - 10 + 1) + 10);
    spaces.push(...Array(spacesWithNoBonusesCount).fill([]));

    // The remaining 45-50 spaces will have either 1 or 2 space bonuses
    const remainingSpacesCount = 61 - spacesWithNoBonusesCount - 1;
    const spacesWithTwoBonusesCount = Math.ceil(remainingSpacesCount / 2) + Math.floor(Math.random() * 2);
    const spacesWithOneBonusCount = remainingSpacesCount - spacesWithTwoBonusesCount;

    for (let i = 0; i < spacesWithTwoBonusesCount; i++) {
      spaces.push(LabyrinthusBoard.generateRandomSpaceBonuses(allPossibleBonuses, 2));
    }

    for (let i = 0; i < spacesWithOneBonusCount; i++) {
      spaces.push(LabyrinthusBoard.generateRandomSpaceBonuses(allPossibleBonuses, 1));
    }

    return spaces;
  }

  public static generateRandomSpaceBonuses(remainingBonuses: Array<SpaceBonus>, bonusCount: number) : Array<SpaceBonus> {
    let bonuses : Array<SpaceBonus> = [];

    for (let i = 0; i < bonusCount; i++) {
      bonuses.push(LabyrinthusBoard.addRandomBonus(remainingBonuses));

      // Ocean and temperature bonuses cannot be combined with others
      if (bonuses.includes(SpaceBonus.OCEAN) || bonuses.includes(SpaceBonus.TEMPERATURE)) {
        bonuses = bonuses.filter((spaceBonus) => [SpaceBonus.OCEAN, SpaceBonus.TEMPERATURE].includes(spaceBonus));
        break;
      }
    }

    return bonuses;
  }

  public static addRandomBonus(remainingBonuses: Array<SpaceBonus>): SpaceBonus {
    return remainingBonuses.splice(Math.floor(Math.random() * remainingBonuses.length), 1)[0];
  }

  private filterBonusOceanSpots(player: Player, spaces: Array<ISpace>) {
    if (player.name === 'neutral') return spaces;

    // TODO: This should ideally take into account placement bonuses from adjacent oceans, but it's highly complex
    return player.canAfford(HELLAS_BONUS_OCEAN_COST) ? spaces : spaces.filter((space) => space.bonus.includes(SpaceBonus.OCEAN) === false);
  }

  private filterBonusTemperatureSpots(player: Player, spaces: Array<ISpace>) {
    if (player.name === 'neutral') return spaces;

    // TODO: This should ideally take into account placement bonuses from adjacent oceans, but it's highly complex
    return player.canAfford(VASTITAS_BOREALIS_BONUS_TEMPERATURE_COST) ? spaces : spaces.filter((space) => space.bonus.includes(SpaceBonus.TEMPERATURE) === false);
  }

  public getSpaces(spaceType: SpaceType, player: Player): Array<ISpace> {
    let spaces = this.filterBonusOceanSpots(player, super.getSpaces(spaceType, player));
    return this.filterBonusTemperatureSpots(player, spaces);
  }

  public getAvailableSpacesForCity(player: Player): Array<ISpace> {
    let spaces = this.filterBonusOceanSpots(player, super.getAvailableSpacesForCity(player));
    return this.filterBonusTemperatureSpots(player, spaces);
  }

  public getAvailableSpacesOnLand(player: Player): Array<ISpace> {
    let spaces = this.filterBonusOceanSpots(player, super.getAvailableSpacesOnLand(player));
    return this.filterBonusTemperatureSpots(player, spaces);
  }

  public getAvailableSpacesForGreenery(player: Player): Array<ISpace> {
    let spaces = this.filterBonusOceanSpots(player, super.getAvailableSpacesForGreenery(player));
    return this.filterBonusTemperatureSpots(player, spaces);
  }

  public getVolcanicSpaceIds(): Array<string> {
    return [];
  }

  public getNoctisCitySpaceIds(): Array<string> {
    return [];
  }
}
