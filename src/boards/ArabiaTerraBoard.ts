import {Player} from "../Player";
import {Random} from "../Random";
import {SpaceBonus} from "../SpaceBonus";
import {Board} from "./Board";
import {BoardBuilder} from "./BoardBuilder";
import {SerializedBoard} from "./SerializedBoard";

export class ArabiaTerraBoard extends Board {
  public static newInstance(shuffle: boolean, rng: Random, includeVenus: boolean, erodedSpaces: Array<string> = []): ArabiaTerraBoard {
    const builder = new BoardBuilder(includeVenus);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;
    const COVE = SpaceBonus.COVE;

    // y=0
    builder.ocean().ocean(PLANT).land().land().ocean(DRAW_CARD, DRAW_CARD);
    // y=1
    builder.ocean(PLANT, PLANT).ocean(PLANT).land(PLANT, PLANT).land().land(PLANT).land(PLANT);
    // y=2
    builder.land(PLANT, STEEL).ocean(PLANT).land(PLANT, DRAW_CARD).land(STEEL).land(STEEL).land(PLANT, STEEL).land(STEEL, TITANIUM, COVE);
    // y=3
    builder.land(PLANT, PLANT).land(PLANT).ocean(PLANT, PLANT).land().land().land().land(STEEL, STEEL).land();
    // y=4
    builder.land().land().ocean(STEEL).land(COVE).ocean(PLANT, PLANT).land(STEEL, DRAW_CARD).land().land().land();
    // y=5
    builder.land(PLANT).land(PLANT).ocean(STEEL, STEEL).land(PLANT).land(STEEL).land().land(TITANIUM, PLANT, COVE).land(PLANT);
    // y=6
    builder.land(TITANIUM, PLANT, COVE).ocean(PLANT, PLANT).land(PLANT, PLANT, COVE).land(PLANT).land(STEEL).land(TITANIUM, PLANT).land(TITANIUM, TITANIUM);
    // y=7
    builder.ocean(PLANT, PLANT).land(PLANT).land(DRAW_CARD, STEEL).land(STEEL, STEEL).land(STEEL).land(DRAW_CARD);
    // y=8
    builder.land().land().land().land().land(STEEL);

    if (shuffle) {
      builder.shuffle(rng);
    }

    const spaces = builder.build(erodedSpaces);
    return new ArabiaTerraBoard(spaces);
  }
    
  public static deserialize(board: SerializedBoard, players: Array<Player>): ArabiaTerraBoard {
    return new ArabiaTerraBoard(Board.deserializeSpaces(board.spaces, players));
  }

  public getVolcanicSpaceIds(): Array<string> {
    return [];
  }

  public getNoctisCitySpaceIds(): Array<string> {
    return [];
  }
}
