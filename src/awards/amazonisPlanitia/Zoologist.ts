import {Player} from "../../Player";
import {ResourceType} from "../../ResourceType";
import {IAward} from "../IAward";

export class Zoologist implements IAward {
  public name: string = 'Zoologist';
  public description: string = 'Most animal and microbe resources';

  public getScore(player: Player): number {
    const resourceTypes = [ResourceType.ANIMAL, ResourceType.MICROBE];
    let score: number = 0;

    player.getCardsWithResources().filter((card) => resourceTypes.includes(card.resourceType!)).forEach((card) => {
      score += player.getResourcesOnCard(card)!;
    });

    return score;
  }
}
