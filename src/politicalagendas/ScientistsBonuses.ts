import { Tags } from "../cards/Tags";
import { Game } from "../Game";
import { Player } from "../Player";
import { Resources } from "../Resources";
import { Bonus } from "./Bonus";

export class ScientistsBonus01 implements Bonus {
    grant(player: Player, _game: Game) {
        const tagCount = player.getTagCount(Tags.SCIENCE, false, false);
        player.setResource(Resources.MEGACREDITS, tagCount);
    }
}

export class ScientistsBonus02 implements Bonus {
    grant(player: Player) {
        const amount = Math.floor(player.cardsInHand.length / 2);
        player.setResource(Resources.MEGACREDITS, amount);
    }
}
