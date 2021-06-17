import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IMilestone} from "../IMilestone";

export class Researcher implements IMilestone {
  public name: string = 'Researcher';
  public description: string = 'Have 6 Science tags'

  public getScore(player: Player): number {
    return player.getTagCount(Tags.SCIENCE);
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 6;
  }
}
