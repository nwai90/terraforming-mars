import {SpaceBonus} from '../SpaceBonus';
import {Board} from './Board';
import {BoardBuilder} from './BoardBuilder';
import {SpaceName} from '../SpaceName';
import {Player} from '../Player';
import {SerializedBoard} from './SerializedBoard';
import {Random} from '../Random';
import {ISpace} from './ISpace';

export class TerraCimmeriaBoard extends Board {
  public static newInstance(shuffle: boolean, rng: Random, includeVenus: boolean, erodedSpaces: Array<string> = []): TerraCimmeriaBoard {
    const builder = new BoardBuilder(includeVenus);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;
    const POWER = SpaceBonus.POWER;

    // y=0
    builder.ocean().land(PLANT).land(STEEL).land(PLANT, PLANT).ocean(PLANT, PLANT);
    // y=1
    builder.ocean(TITANIUM, TITANIUM).land().land().land(PLANT).land(PLANT, STEEL).ocean(PLANT);
    // y=2
    builder.land().land(PLANT).land(POWER, POWER, POWER).land().land(PLANT).land(PLANT).land(PLANT);
    // y=3
    builder.land(STEEL, STEEL).land(PLANT, PLANT).land().land(POWER, POWER).land().land().land(DRAW_CARD).land();
    // y=4
    builder.land().land(PLANT, POWER).land(POWER, POWER).land(STEEL).land(STEEL)
      .land(DRAW_CARD).land().land(STEEL).ocean(DRAW_CARD);
    // y=5
    builder.land(DRAW_CARD, DRAW_CARD).land().land(TITANIUM).land().land().land(STEEL, STEEL).land().land(STEEL, STEEL);
    // y=6
    builder.land().land(TITANIUM).land(PLANT).land(PLANT, STEEL, STEEL).land(PLANT, PLANT).land(PLANT).ocean(PLANT, PLANT);
    // y=7
    builder.ocean(STEEL, STEEL).land(PLANT).land(TITANIUM).land(DRAW_CARD).land(PLANT).ocean(PLANT);
    // y=8
    builder.ocean(PLANT, PLANT).ocean(PLANT, PLANT).ocean(PLANT, PLANT).land(PLANT).ocean(PLANT, PLANT);

    if (shuffle) {
      builder.shuffle(rng);
    }
    
    const spaces = builder.build(erodedSpaces);
    return new TerraCimmeriaBoard(spaces);
  }

  public static deserialize(board: SerializedBoard, players: Array<Player>): TerraCimmeriaBoard {
    return new TerraCimmeriaBoard(Board.deserializeSpaces(board.spaces, players));
  }

  public getNonReservedLandSpaces(): Array<ISpace> {
    return super.getNonReservedLandSpaces();
  }

  public getVolcanicSpaceIds(): Array<string> {
    return [
      SpaceName.ALBOR_THOLUS_TERRACIMMERIA,
      SpaceName.APOLLINARIS_MONS,
      SpaceName.HADRIACUS_MONS,
      SpaceName.TYRRHENUS_MONS,
    ];
  }

  public getNoctisCitySpaceIds(): Array<string> {
    return [];
  }
}
