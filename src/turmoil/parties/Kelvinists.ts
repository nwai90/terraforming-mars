import { IParty } from "./IParty";
import { Party } from "./Party";
import { PartyName } from "./PartyName";
import { Resources } from "../../Resources";
import { Bonus } from "../Bonus";
import { Game } from "../../Game";

export class Kelvinists extends Party implements IParty {
    name = PartyName.KELVINISTS;
    description = "Pushes for rapid terraforming, usually employing a heat-first strategy.";
    bonuses = [new KelvinistsBonus01(), new KelvinistsBonus02()];
}

export class KelvinistsBonus01 implements Bonus {
    id = "kb01";
    isDefault = true;
    description = "All players receive 1 MC for each Heat production they have.";
    grant(game: Game) {
        game.getPlayers().forEach(player => {
            const heatProduction = player.getProduction(Resources.HEAT);
            player.setResource(Resources.MEGACREDITS, heatProduction);
        });
    }
}

export class KelvinistsBonus02 implements Bonus {
    id = "kb02";
    description = "All palyeres receive one unit of Heat for each Heat production they have.";
    grant(game: Game) {
        game.getPlayers().forEach(player => {
            const heatProduction = player.getProduction(Resources.HEAT);
            player.setResource(Resources.HEAT, heatProduction);
        });
    }
}
