import { IProjectCard } from "../../cards/IProjectCard";
import { Tags } from "../../cards/Tags";
import { Game } from "../../Game";
import { ISpace } from "../../ISpace";
import { Player } from "../../Player";
import { TileType } from "../../TileType";
import { PartyName } from "../../turmoil/parties/PartyName";
import { Policy } from "./Policy";

export class ForestSubsidy implements Policy {
    party = PartyName.GREENS;
    id = "g01";
    onTilePlaced(player: Player, space: ISpace, _game: Game) {
        if (space.tile?.tileType === TileType.GREENERY) {
            player.megaCredits += 4;
        }
    };
}

export class FertilizingResearch implements Policy {
    id = "g02";
    party = PartyName.GREENS;
    onTilePlaced(player: Player, _space: ISpace, _game: Game) {
        player.plants++;
    };
}

export class BiologicalResearchGrant implements Policy {
    party = PartyName.GREENS;
    id = "g03";
    onCardPlayed(player: Player, _game: Game, card: IProjectCard) {
        const resourceCount = card.tags.filter(
            (tag) => tag === Tags.ANIMAL || tag === Tags.PLANT || tag === Tags.MICROBES
        ).length;
        if (resourceCount > 0) {
            player.megaCredits += 2;
        }
    }
}
