import { IParty } from "./IParty";
import { Party } from "./Party";
import { PartyName } from "./PartyName";
import { Game } from "../../Game";
import { Tags } from "../../cards/Tags";
import { Resources } from "../../Resources";
import { Bonus } from "../Bonus";
import { SpaceType } from "../../SpaceType";

export class MarsFirst extends Party implements IParty {
    name = PartyName.MARS;
    description = "Focused on Martian development and independence.";
    bonuses = [ new MarsFirstBonus01(), new MarsFirstBonus02() ];
}

export class MarsFirstBonus01 implements Bonus {
    id = "mb01";
    description = "Gain receive 1 MC for each Building tag you have.";
    isDefault = true;

    grant(game: Game) {
        game.getPlayers().forEach(player => {
            const tagCount = player.getTagCount(Tags.STEEL, false, false);
            player.setResource(Resources.MEGACREDITS, tagCount);
        });
    }
}

export class MarsFirstBonus02 implements Bonus {
    id = "mb02";
    description = "Gain receive 1 MC for each tile you have on Mars.";

    grant(game: Game) {
        game.getPlayers().forEach(player => {
            const tileCount = game.board.spaces.filter((space) => {
                space.tile !== undefined && space.player === player && space.spaceType !== SpaceType.COLONY
            }).length;

            player.setResource(Resources.MEGACREDITS, tileCount);
        });
    }
}