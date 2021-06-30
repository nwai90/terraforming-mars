import {Tags} from "../../cards/Tags";
import {Player} from "../../Player";
import {IAward} from "../IAward";

export class Curator implements IAward {
  public name: string = 'Curator';
  public description: string = 'Most played tags of any one type';

  public getScore(player: Player): number {
    const validTags = [Tags.ANIMAL, Tags.BUILDING, Tags.CITY, Tags.EARTH, Tags.ENERGY, Tags.JOVIAN, Tags.MICROBE, Tags.MOON, Tags.PLANT, Tags.SCIENCE, Tags.SPACE, Tags.VENUS];
    let score: number = 0;

    validTags.forEach((tag) => {
      const tagCount = player.getTagCount(tag, false, false);
      if (tagCount > score) score = tagCount;
    });

    return score;
  }
}
