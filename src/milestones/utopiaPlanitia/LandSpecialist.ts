import {Player} from "../../Player";
import {IMilestone} from "../IMilestone";

export class LandSpecialist implements IMilestone {
  public name: string = 'Land Specialist';
  public description: string = 'Have at least 3 special tiles';

  public getScore(player: Player): number {
    return player.game.board.getSpacesWithSpecialTiles().filter((s) => s.player === player).length;
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 3;
  }
}
