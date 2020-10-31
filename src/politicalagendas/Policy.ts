import { IProjectCard } from "../cards/IProjectCard";
import { Game } from "../Game";
import { ISpace } from "../ISpace";
import { Player } from "../Player";
import { PartyName } from "../turmoil/parties/PartyName";

export interface Policy {
    party: PartyName;
    id: string;
    onTilePlaced?: (player: Player, space: ISpace, game: Game) => void;
    onCardPlayed?: (player: Player, game: Game, card: IProjectCard) => void;
}