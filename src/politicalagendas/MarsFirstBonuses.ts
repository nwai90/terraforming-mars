import { Tags } from "../cards/Tags";
import { Game } from "../Game";
import { Player } from "../Player";
import { Resources } from "../Resources";
import { SpaceType } from "../SpaceType";
import { Bonus } from "./Bonus";

export class MarsFirstBonus01 implements Bonus {
    grant(player: Player, _game: Game) {
        const tagCount = player.getTagCount(Tags.STEEL, false, false);
        player.setResource(Resources.MEGACREDITS, tagCount);
    }
}

export class MarsFirstBonus02 implements Bonus {
    grant(player: Player, game: Game) {
        const tileCount = game.board.spaces.filter((space) => {
            space.tile !== undefined && space.player === player && space.spaceType !== SpaceType.COLONY
        }).length;

        player.setResource(Resources.MEGACREDITS, tileCount);
    }
}
