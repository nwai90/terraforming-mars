import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {VictoryPointsBreakdown} from "../../VictoryPointsBreakdown";
import {LeaderCard} from "../LeaderCard";

export class LeadersExpansion {
  public static calculateVictoryPoints(player: Player, vpb: VictoryPointsBreakdown): void {
    let score: number = 0;
    if (player.cardIsInEffect(CardName.DUNCAN)) score += 6;
    if (score > 0) vpb.setVictoryPoints('victoryPoints', score, 'Leaders VP');
  }

  public static getBonusWildTags(player: Player, tagCount: number) {
    const xavier = player.playedCards.find((card) => card.name === CardName.XAVIER);
    if (xavier !== undefined && (xavier as LeaderCard).opgActionIsActive === true) {
      tagCount += 2;
    }

    return tagCount;
  }
}
