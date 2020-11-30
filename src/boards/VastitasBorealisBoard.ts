import {SpaceBonus} from '../SpaceBonus';
import {SpaceName} from '../SpaceName';
import {Board} from './Board';
import {Player} from '../Player';
import {ISpace} from './ISpace';
import {VASTITAS_BOREALIS_BONUS_TEMPERATURE_COST} from '../constants';
import {SpaceType} from '../SpaceType';
import {BoardBuilder} from './BoardBuilder';
import {SerializedBoard} from './SerializedBoard';
import {Random} from '../Random';

export class VastitasBorealisBoard extends Board {
  private constructor(public spaces: Array<ISpace>) {
    super();
  }
    
  public static newInstance(shuffle: boolean, rng: Random, includeVenus: boolean, erodedSpaces: Array<string> = []): VastitasBorealisBoard {
    const builder = new BoardBuilder(includeVenus);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const HEAT = SpaceBonus.HEAT;
    const TITANIUM = SpaceBonus.TITANIUM;
    const TEMPERATURE = SpaceBonus.TEMPERATURE;
    const VOLCANIC = SpaceBonus.VOLCANIC;
    
    // y=0
    builder.land(STEEL, STEEL).land(PLANT).land().land().land(TITANIUM, TITANIUM, VOLCANIC);
    // y=1
    builder.land(STEEL, STEEL).land(STEEL).land().land().land(TITANIUM, VOLCANIC).land(PLANT);
    // y=2
    builder.land(TITANIUM).land().land().land().land(DRAW_CARD).ocean(PLANT, DRAW_CARD).ocean(PLANT);
    // y=3
    builder.land(STEEL, TITANIUM, VOLCANIC).land(STEEL, DRAW_CARD, VOLCANIC).land(STEEL).ocean(HEAT, HEAT).ocean(HEAT, HEAT).ocean().ocean(PLANT, PLANT).land(STEEL, PLANT);
    // y=4
    builder.land().land().land().ocean(HEAT, HEAT).land(TEMPERATURE).doNotShuffleLastSpace().land(STEEL).land().land(PLANT).ocean(TITANIUM);
    // y=5
    builder.land(PLANT).land().land(PLANT).ocean(HEAT, HEAT).land(HEAT, HEAT).land().land(PLANT).land(TITANIUM, PLANT);
    // y=6
    builder.land(PLANT, PLANT).land().ocean().land().land(STEEL, PLANT).land(PLANT).land(PLANT, PLANT);
    // y=7
    builder.ocean(PLANT).land().land(DRAW_CARD).land(STEEL).land().land(PLANT, PLANT);
    // y=8
    builder.ocean(PLANT, PLANT).land().land(PLANT).land(PLANT, PLANT).land(STEEL, PLANT);
    
    if (shuffle) {
      builder.shuffle(rng);
    }
    
    const spaces = builder.build(erodedSpaces);
    return new VastitasBorealisBoard(spaces);
  }
        
  public static deserialize(board: SerializedBoard, players: Array<Player>): VastitasBorealisBoard {
    return new VastitasBorealisBoard(Board.deserializeSpaces(board.spaces, players));
  }

  private filterVastitasBorealis(player: Player, spaces: Array<ISpace>) {
    return player.canAfford(VASTITAS_BOREALIS_BONUS_TEMPERATURE_COST) ? spaces : spaces.filter((space) => space.id !== SpaceName.VASTITAS_BOREALIS_NORTH_POLE);
  }

  public getSpaces(spaceType: SpaceType, player: Player): Array<ISpace> {
    return this.filterVastitasBorealis(player, super.getSpaces(spaceType, player));
  }

  public getAvailableSpacesForCity(player: Player): Array<ISpace> {
    return this.filterVastitasBorealis(player, super.getAvailableSpacesForCity(player));
  }

  public getAvailableSpacesOnLand(player: Player): Array<ISpace> {
    return this.filterVastitasBorealis(player, super.getAvailableSpacesOnLand(player));
  }

  public getAvailableSpacesForGreenery(player: Player): Array<ISpace> {
    return this.filterVastitasBorealis(player, super.getAvailableSpacesForGreenery(player));
  }
}
