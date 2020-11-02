import { IParty } from "./IParty";
import { Party } from "./Party";
import { PartyName } from "./PartyName";
import { Game } from "../../Game";
import { Tags } from "../../cards/Tags";
import { Resources } from "../../Resources";
import { Bonus } from "../Bonus";
import { TileType } from "../../TileType";

export class Greens extends Party implements IParty {
    name = PartyName.GREENS;
    description = "Want to see a new Earth as soon as possible.";
    bonuses = [new GreensBonus01(), new GreensBonus02()];
}

export class GreensBonus01 implements Bonus {
    isDefault = true;
    id = "gb01";
    public description: string = "Gain 1 MC for each Plant tag, Microbe tag, and Animal tag you have.";

    grant(game: Game) {
        game.getPlayers().forEach(player => {
            let tagCount = player.getTagCount(Tags.PLANT, false, false) + player.getTagCount(Tags.MICROBES, false, false) + player.getTagCount(Tags.ANIMAL, false, false);
            player.setResource(Resources.MEGACREDITS, tagCount);
        });
    }
}

export class GreensBonus02 implements Bonus {
    id = "gb02";
    public description: string = "Gain 2 MC for each greenery tile you control.";

    grant(game: Game) {
        game.getPlayers().forEach((player) => {
            const count = game.board.spaces.filter((space) => {
                return space.tile && space.tile.tileType === TileType.GREENERY && space.player !== undefined && space.player.id === player.id;
            }).length;
    
            player.setResource(Resources.MEGACREDITS, count * 2);
        });
    }
}
