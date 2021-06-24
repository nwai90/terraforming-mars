import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {VictoryPointsBreakdown} from "../../VictoryPointsBreakdown";

export class LeadersExpansion {
  public static calculateVictoryPoints(player: Player, vpb: VictoryPointsBreakdown): void {
    let score: number = 0;

    if (player.cardIsInEffect(CardName.DILLON)) score += 4;
    if (player.cardIsInEffect(CardName.HENRIETTA)) {
      const sets = Math.max(Math.floor(player.getTerraformRating() / 8), 0);
      if (sets > 0) score += sets;
    }

    if (score > 0) vpb.setVictoryPoints('victoryPoints', score, 'Leaders VP');
  }
}
