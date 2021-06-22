import {Player} from "../../Player";
import {IMilestone} from "../IMilestone";

export class Frontrunner implements IMilestone {
  public name: string = 'Frontrunner';
  public description: string = 'Have a net total of 6 VP on played cards';

  public getScore(player: Player): number {
    let score = 0;
    for (const playedCard of player.playedCards) {
      if (playedCard.getVictoryPoints !== undefined) {
        score += playedCard.getVictoryPoints(player);
      }
    }

    return score;
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 6;
  }
}
