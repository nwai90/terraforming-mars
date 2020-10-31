import { Tags } from "../cards/Tags";
import { Game } from "../Game";
import { Player } from "../Player";
import { TileType } from "../TileType";
import { Bonus } from "./Bonus";

export class Scientists01 implements Bonus {
    grant(player: Player, _game: Game) {
        const count = player.playedCards
            .filter((card) => 
                card.tags.filter(
                    (tag) => tag === Tags.SCIENCE
                ).length > 0
            ).length;

        player.megaCredits += count;
    }
}

export class Scientists02 implements Bonus {
    grant(player: Player, game: Game) {
        player.megaCredits += player.cardsInHand.length * 2;
    }
}
