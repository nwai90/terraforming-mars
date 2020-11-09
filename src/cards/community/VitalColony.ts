import { Player } from "../../Player";
import { PreludeCard } from "../prelude/PreludeCard";
import { IProjectCard } from "../IProjectCard";
import { CardName } from "../../CardName";
import { Game } from "../../Game";
import { BuildColony } from "../../deferredActions/BuildColony";
import { Resources } from "../../Resources";

export class VitalColony extends PreludeCard implements IProjectCard {
    public tags = [];
    public name = CardName.VITAL_COLONY;

    public play(player: Player, game: Game) {     
        game.defer(new BuildColony(player, game, false, "Select where to build colony"));
        player.setResource(Resources.MEGACREDITS, 5);
        return undefined;
    }
}

