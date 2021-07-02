import {MoonExpansion} from "../../moon/MoonExpansion";
import {Player} from "../../Player";
import {isAresTile, TileType} from "../../TileType";
import {IMilestone} from "../IMilestone";

export class Wanderer implements IMilestone {
  public name: string = 'Wanderer';
  public description: string = 'Have 3 tiles on areas with no direct placement bonus';

  public getScore(player: Player): number {
    const emptyMarsSpaces = player.game.board.spaces.filter((space) =>
      space.tile !== undefined &&
      isAresTile(space.tile.tileType) === false &&
      space.tile.tileType !== TileType.OCEAN &&
      space.player === player &&
      space.bonus.length === 0
    ).length;

    const emptyMoonSpaces: number = MoonExpansion.ifElseMoon(player.game, (moonData) => moonData.moon.spaces.filter(
      (space) => space.tile !== undefined && space.player === player && space.bonus.length === 0).length,
      () => 0);

    return emptyMarsSpaces + emptyMoonSpaces;
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 3;
  }
}
