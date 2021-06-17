import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IMilestone} from "../IMilestone";

export class Morningstar implements IMilestone {
  public name: string = 'Morningstar';
  public description: string = 'Have 4 Venus tags'

  public getScore(player: Player): number {
    return player.getTagCount(Tags.VENUS);
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 4;
  }
}
