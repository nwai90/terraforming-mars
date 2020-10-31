import { Game } from "../Game";
import { Player } from "../Player";
import { Bonus } from "./Bonus";

export class RedsBonus01 implements Bonus {
    grant(_player: Player, game: Game) {
        const players = game.getPlayers();

        if (game.isSoloMode() && players[0].getTerraformRating() <= 20) {
            players[0].increaseTerraformRating(game);
        } else {
            players.sort((p1, p2) => p1.getTerraformRating() - p2.getTerraformRating());
            const min = players[0].getTerraformRating();

            while (players.length > 0 && players[0].getTerraformRating() === min) {
                players[0].increaseTerraformRating(game);
                players.shift();
            }
        }
    }
}

export class RedsBonus02 implements Bonus {
    grant(_player: Player, game: Game) {
        const players = game.getPlayers();

        if (game.isSoloMode() && players[0].getTerraformRating() > 20) {
            players[0].decreaseTerraformRating();
        } else {
            players.sort((p1, p2) => p2.getTerraformRating() - p1.getTerraformRating());
            const max = players[0].getTerraformRating();

            while (players.length > 0 && players[0].getTerraformRating() === max) {
                players[0].decreaseTerraformRating();
                players.shift();
            }
        }
    }
}
