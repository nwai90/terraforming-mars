import {MoonExpansion} from "../../moon/MoonExpansion";
import {Player} from "../../Player";
import {isAresTile, TileType} from "../../TileType";
import {IMilestone} from "../IMilestone";

export class Pioneer implements IMilestone {
  public name: string = 'Pioneer';
  public description: string = 'Have 5 tiles on Mars'

  public getScore(player: Player): number {
    // Don't simplify this to "space.tile?.tileType !== TileType.OCEAN"
    // Because that will make Land Claim a valid space for Landlord
    const marsSpaces = player.game.board.spaces.filter(  
      (space) => space.tile !== undefined && isAresTile(space.tile.tileType) === false && space.tile.tileType !== TileType.OCEAN && space.player === player
      ).length;

    const moonSpaces: number = MoonExpansion.ifElseMoon(player.game, (moonData) => moonData.moon.spaces.filter(
      (space) => space.tile !== undefined && space.player === player).length,
      () => 0);

    return marsSpaces + moonSpaces;
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 5;
  }
}
