import { Tags } from "../cards/Tags";
import { Game } from "../Game";
import { Player } from "../Player";
import { TileType } from "../TileType";
import { Bonus } from "./Bonus";

export class Green01 implements Bonus {
    grant(player: Player, _game: Game) {
        const count = player.playedCards
            .map((card) => {
                return card.tags.filter(
                    (tag) => tag === Tags.ANIMAL || tag === Tags.PLANT || tag === Tags.MICROBES
                ).length;
            })
            .reduce((accum, count) => accum + count, 0);

        player.megaCredits += count;
    }
}

export class Green02 implements Bonus {
    grant(player: Player, game: Game) {
        const count = game.board.spaces.filter((space) => {
            return space.tile && space.tile.tileType === TileType.GREENERY && space.player !== undefined && space.player.id === player.id;
        }).length;

        player.megaCredits += count * 2;
    }
}
