import {CardName} from "../../CardName";
import {Player} from "../../Player";
import {VictoryPointsBreakdown} from "../../VictoryPointsBreakdown";
import {LeaderCard} from "../LeaderCard";
import {Tags} from "../Tags";

export class LeadersExpansion {
  public static calculateVictoryPoints(player: Player, vpb: VictoryPointsBreakdown): void {
    let score: number = 0;

    if (player.cardIsInEffect(CardName.DUNCAN)) score += 4;

    if (player.cardIsInEffect(CardName.HAL9000)) {
      const sets = Math.max(Math.floor(player.getTerraformRating() / 8), 0);
      if (sets > 0) score += sets;
    }

    if (player.cardIsInEffect(CardName.TATE)) {
      score += player.getTagCount(Tags.CITY, false, false);
    }

    if (score > 0) vpb.setVictoryPoints('victoryPoints', score, 'Leaders VP');
  }

  public static getBonusWildTags(player: Player, tagCount: number) {
    if (player.cardIsInEffect(CardName.LOWELL)) tagCount += 1;

    const xavier = player.playedCards.find((card) => card.name === CardName.XAVIER);
    if (xavier !== undefined && player.actionsThisGeneration.has(xavier.name) && (xavier as LeaderCard).isDisabled === false) {
      tagCount += 2;
    }

    return tagCount;
  }
}
