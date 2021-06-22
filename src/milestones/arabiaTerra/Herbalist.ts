import {Player} from "../../Player";
import {IMilestone} from "../IMilestone";

export class Herbalist implements IMilestone {
  public name: string = 'Herbalist';
  public description: string = 'Have 12 plants';

  public getScore(player: Player): number {
    return player.plants;
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 12;
  }
}
