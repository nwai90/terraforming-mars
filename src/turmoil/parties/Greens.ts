import { IParty } from "./IParty";
import { Party } from "./Party";
import { PartyName } from "./PartyName";
import { Game } from "../../Game";
import { Tags } from "../../cards/Tags";
import { Resources } from "../../Resources";
import { Bonus } from "../Bonus";
import { TileType } from "../../TileType";

export class Greens extends Party implements IParty {
    public name = PartyName.GREENS;
    description = "Want to see a new Earth as soon as possible.";
    public bonuses = [new GreensBonus01(), new GreensBonus02()];
}

export class GreensBonus01 implements Bonus {
    isDefault = true;
    id = "gb01";
    public description: string = "All players receive 1 MC for each Plant tag, Microbe tag, and Animal tag they have.";
    grant(game: Game) {
        game.getPlayers().forEach(player => {
            const tags = [Tags.ANIMAL, Tags.PLANT, Tags.MICROBES];
            const tagCount = tags.map((tag) => player.getTagCount(tag, false, false)).reduce((acc, count) => acc + count, 0);

            player.setResource(Resources.MEGACREDITS, tagCount);
        });
    }
}

export class GreensBonus02 implements Bonus {
    public description: string = "All players receive 2 MC greenery space they control.";
    id = "gb02";
    grant(game: Game) {
        game.getPlayers().forEach(player => {
            const count = game.board.spaces.filter((space) => {
                return space.tile && space.tile.tileType === TileType.GREENERY && space.player !== undefined && space.player.id === player.id;
            }).length;

            player.setResource(Resources.MEGACREDITS, count * 2);
        });
    }
}
