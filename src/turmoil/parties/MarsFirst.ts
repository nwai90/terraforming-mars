import { IParty } from "./IParty";
import { Party } from "./Party";
import { PartyName } from "./PartyName";
import { Game } from "../../Game";
import { Tags } from "../../cards/Tags";
import { Resources } from "../../Resources";
import { Bonus } from "../Bonus";
import { SpaceType } from "../../SpaceType";
import { ISpace } from "../../ISpace";
import { Player } from "../../Player";
import { Policy } from "../Policy";
import { Phase } from "../../Phase";
import { TileType } from "../../TileType";
import { SelectHowToPayDeferred } from "../../deferredActions/SelectHowToPayDeferred";

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

export class MarsFirstPolicy01 implements Policy {
    isDefault = true;
    id = "mfp01";
    description: string = "Whenever you place a tile ON MARS, gain 1 steel.";

    onTilePlaced(player: Player, space: ISpace, game: Game) {
        if (space.tile && space.spaceType !== SpaceType.COLONY && game.phase === Phase.ACTION) {
            player.setResource(Resources.STEEL);
        }
    }
}

export class MarsFirstPolicy02 implements Policy {
    id = "mfp02";
    description: string = "Whenever you place a special tile ON MARS, gain 3 MC.";

    onTilePlaced(player: Player, space: ISpace) {
        const normalTileTypes = [TileType.GREENERY, TileType.OCEAN, TileType.CITY];

        if (space.tile && !normalTileTypes.includes(space.tile.tileType)) {
            player.setResource(Resources.MEGACREDITS, 3);
        }
    }
}

export class MarsFirstPolicy03 implements Policy {
    id = "mfp03";
    description: string = "Your steel resources are worth 1 MC extra.";
}

export class MarsFirstPolicy04 implements Policy {
    id = "mfp04";
    description: string = "Spend 4 MC to draw a building card";

    canAct(player: Player) {
        return player.canAfford(4);
    }

    action(player: Player, game: Game) {
        game.defer(new SelectHowToPayDeferred(
            player,
            4,
            false,
            false,
            "Select how to pay for action",
            () => {
                player.cardsInHand.push(game.drawCardsByTag(Tags.STEEL, 1)[0]);
                const drawnCard = game.getCardsInHandByTag(player, Tags.STEEL).slice(-1)[0];
                game.log("${0} drew ${1}", b => b.player(player).card(drawnCard));
            }
        ));

        return undefined;
    }
}