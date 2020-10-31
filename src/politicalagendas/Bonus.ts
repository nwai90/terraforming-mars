import { Game } from "../Game";
import { Player } from "../Player";

export interface Bonus {
    grant: (player: Player, game: Game) => void;
}