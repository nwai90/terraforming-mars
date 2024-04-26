import {SpaceBonus} from '../SpaceBonus';
import {Board} from './Board';
import {BoardBuilder} from './BoardBuilder';
import {Player} from '../Player';
import {SerializedBoard} from './SerializedBoard';
import {Random} from '../Random';
import {ISpace} from './ISpace';

export class UtopiaPlanitiaBoard extends Board {
  public static newInstance(shuffle: boolean, rng: Random, includeVenus: boolean, includePromo: boolean, erodedSpaces: Array<string> = []): UtopiaPlanitiaBoard {
    const builder = new BoardBuilder(includeVenus, includePromo);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;
    const POWER = SpaceBonus.POWER;

    // y=0
    builder.land().land().land(POWER, POWER).land().land();
    // y=1
    builder.land().land(STEEL, STEEL).land(POWER, POWER).land(POWER, POWER, DRAW_CARD).land().land();
    // y=2
    builder.ocean(PLANT, PLANT, PLANT).land().land(STEEL).land().land().land(DRAW_CARD, DRAW_CARD, TITANIUM).land(TITANIUM, TITANIUM);
    // y=3
    builder.ocean(PLANT, DRAW_CARD).land(PLANT).land(PLANT).land(PLANT, PLANT).ocean(PLANT, PLANT).ocean(PLANT).ocean(PLANT).land(PLANT);
    // y=4
    builder.land().land().land().land(PLANT).land(PLANT).land(PLANT, PLANT).land().ocean().land(PLANT, TITANIUM);
    // y=5
    builder.land(STEEL).land(STEEL, STEEL).ocean(PLANT, PLANT).land(PLANT, PLANT).land().land().land(STEEL, STEEL).land();
    // y=6
    builder.land(STEEL).land().ocean().ocean(PLANT, PLANT).land().land().land();
    // y=7
    builder.land().land(DRAW_CARD, DRAW_CARD).ocean().ocean(PLANT, PLANT).land(STEEL, TITANIUM).land(PLANT, PLANT);
    // y=8
    builder.land().land().land(STEEL, STEEL).ocean(PLANT).land(PLANT);

    if (shuffle) {
      builder.shuffle(rng);
    }
    
    const spaces = builder.build(erodedSpaces);
    return new UtopiaPlanitiaBoard(spaces);
  }

  public static deserialize(board: SerializedBoard, players: Array<Player>): UtopiaPlanitiaBoard {
    return new UtopiaPlanitiaBoard(Board.deserializeSpaces(board.spaces, players));
  }

  public getNonReservedLandSpaces(): Array<ISpace> {
    return super.getNonReservedLandSpaces();
  }

  public getVolcanicSpaceIds(): Array<string> {
    return [];
  }

  public getNoctisCitySpaceIds(): Array<string> {
    return [];
  }
}
