
import { IProjectCard } from "../cards/IProjectCard";
import { Tags } from "../cards/Tags";
import { Game } from "../Game";
import { ISpace } from "../ISpace";
import { Player } from "../Player";
import { Resources } from "../Resources";
import { TileType } from "../TileType";
import { PartyName } from "../turmoil/parties/PartyName";
import { Policy } from "./Policy";

export class ForestRebate implements Policy {
    party = PartyName.GREENS;
    id = "g01";

    onTilePlaced(player: Player, space: ISpace, _game: Game) {
        if (space.tile?.tileType === TileType.GREENERY) {
            player.setResource(Resources.MEGACREDITS, 4);
        }
    };
}

export class FertilizingResearch implements Policy {
    id = "g02";
    party = PartyName.GREENS;

    onTilePlaced(player: Player, _space: ISpace, _game: Game) {
        player.setResource(Resources.PLANTS);
    };
}

export class BioSponsors implements Policy {
    party = PartyName.GREENS;
    id = "g03";

    onCardPlayed(player: Player, _game: Game, card: IProjectCard) {
        const tags = [Tags.ANIMAL, Tags.PLANT, Tags.MICROBES];
        const tagCount = card.tags.filter((tag) => tags.includes(tag)).length;

        player.setResource(Resources.MEGACREDITS, tagCount * 2);
    }
}
