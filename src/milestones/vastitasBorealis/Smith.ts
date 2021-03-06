import {Player} from "../../Player";
import {Resources} from "../../Resources";
import {IMilestone} from "../IMilestone";

export class Smith implements IMilestone {
  public name: string = 'Smith';
  public description: string = 'Have a total of 7 steel and titanium production';

  public getScore(player: Player): number {
    return player.getProduction(Resources.STEEL) + player.getProduction(Resources.TITANIUM);
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 7;
  }
}
