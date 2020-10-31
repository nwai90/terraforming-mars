import { Tags } from "../cards/Tags";
import { Player } from "../Player";
import { Resources } from "../Resources";
import { Bonus } from "./Bonus";

export class UnityBonus01 implements Bonus {
    grant(player: Player) {
        const tags = [Tags.VENUS, Tags.EARTH, Tags.JOVIAN];
        const tagCount = tags.map((tag) => player.getTagCount(tag, false, false)).reduce((acc, count) => acc + count, 0);

        player.setResource(Resources.MEGACREDITS, tagCount);
    }
}

export class UnityBonus02 implements Bonus {
    grant(player: Player) {
        const tagCount = player.getTagCount(Tags.SPACE, true, false);
        player.setResource(Resources.MEGACREDITS, tagCount);
    }
}
