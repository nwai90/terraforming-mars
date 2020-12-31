import {SpaceBonus} from "../SpaceBonus";
import {Board} from "./Board";
import {BoardBuilder} from "./BoardBuilder";
import {SpaceName} from "../SpaceName";
import {Player} from "../Player";
import {SerializedBoard} from "./SerializedBoard";
import {Random} from "../Random";

export class AmazonisBoard extends Board {
  public static newInstance(shuffle: boolean, rng: Random, includeVenus: boolean, erodedSpaces: Array<string> = []): AmazonisBoard {
    const builder = new BoardBuilder(includeVenus);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;
    const MICROBE = SpaceBonus.MICROBE;
    const ANIMAL = SpaceBonus.ANIMAL;
    const HEAT = SpaceBonus.HEAT;
    const RESTRICTED = SpaceBonus.RESTRICTED;

    // y=0
    builder.land().ocean(PLANT).land(PLANT, PLANT, PLANT).land(MICROBE).land(ANIMAL);
    // y=1
    builder.ocean(TITANIUM).land(MICROBE, MICROBE).land().land().ocean(DRAW_CARD, DRAW_CARD).ocean();
    // y=2
    builder.land(PLANT, PLANT).land(STEEL, PLANT).land().land(HEAT,PLANT).land(ANIMAL).land().land(MICROBE);
    // y=3
    builder.land().ocean(PLANT).land().land(PLANT).land(HEAT, PLANT).land(STEEL).land(PLANT).ocean(STEEL, PLANT);
    // y=4
    builder.land(PLANT).land(PLANT).land().land(HEAT, HEAT).land(RESTRICTED)
      .land(HEAT, HEAT).land(PLANT, PLANT).land().land(TITANIUM, TITANIUM);
    // y=5
    builder.ocean(PLANT, PLANT).land(PLANT).land(STEEL).land(HEAT, PLANT).land(PLANT).land(DRAW_CARD).land().ocean(PLANT);
    //y=6
    builder.ocean(PLANT).land().land(MICROBE).land(HEAT, PLANT).land().land(PLANT, PLANT).ocean(PLANT, PLANT);
    //y=7
    builder.land(TITANIUM).ocean(PLANT).land(STEEL).land().land(ANIMAL).land(PLANT);
    // y=8
    builder.land().land(DRAW_CARD).land(STEEL).ocean(PLANT).land(STEEL, STEEL);

    if (shuffle) {
      builder.shuffle(rng, SpaceName.MEDUSAE_FOSSAE, SpaceName.ALBOR_THOLUS, SpaceName.ANSERIS_MONS, SpaceName.PINDUS_MONS, SpaceName.ULYSSES_THOLUS);
    }

    const spaces = builder.build(erodedSpaces);
    return new AmazonisBoard(spaces);
  }
    
  public static deserialize(board: SerializedBoard, players: Array<Player>): AmazonisBoard {
    return new AmazonisBoard(Board.deserializeSpaces(board.spaces, players));
  }

  public getNonReservedLandSpaces(): Array<ISpace> {
    return super.getNonReservedLandSpaces().filter((space) => space.bonus.includes(SpaceBonus.RESTRICTED) === false);
  }

  public getVolcanicSpaceIds(): Array<string> {
    return [
      SpaceName.ALBOR_THOLUS,
      SpaceName.ANSERIS_MONS,
      SpaceName.PINDUS_MONS,
      SpaceName.ULYSSES_THOLUS,
    ];
  }

  public getNoctisCitySpaceIds(): Array<string> {
    return [];
  }
}
