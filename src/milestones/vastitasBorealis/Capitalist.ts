import {Player} from "../../Player";
import {IMilestone} from "../IMilestone";

export class Capitalist implements IMilestone {
  public name: string = 'Capitalist';
  public description: string = 'Have 64 M€';

  public getScore(player: Player): number {
    return player.megaCredits;
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 64;
  }
}
