import { Tags } from "../cards/Tags";
import { Game } from "../Game";
import { Player } from "../Player";
import { Resources } from "../Resources";
import { TileType } from "../TileType";
import { Bonus } from "./Bonus";

export class GreensBonus01 implements Bonus {
    grant(player: Player) {
        const tags = [Tags.ANIMAL, Tags.PLANT, Tags.MICROBES];
        const tagCount = tags.map((tag) => player.getTagCount(tag, false, false)).reduce((acc, count) => acc + count, 0);

        player.setResource(Resources.MEGACREDITS, tagCount);
    }
}

export class GreensBonus02 implements Bonus {
    grant(player: Player, game: Game) {
        const count = game.board.spaces.filter((space) => {
            return space.tile && space.tile.tileType === TileType.GREENERY && space.player !== undefined && space.player.id === player.id;
        }).length;

        player.setResource(Resources.MEGACREDITS, count * 2);
    }
}
