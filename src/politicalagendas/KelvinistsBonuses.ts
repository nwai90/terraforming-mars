import { Player } from "../Player";
import { Resources } from "../Resources";
import { Bonus } from "./Bonus";

export class KelvinistsBonus01 implements Bonus {
    grant(player: Player) {
        const heatProduction = player.getProduction(Resources.HEAT);
        player.setResource(Resources.MEGACREDITS, heatProduction);
    }
}

export class KelvinistsBonus02 implements Bonus {
    grant(player: Player) {
        const heatProduction = player.getProduction(Resources.HEAT);
        player.setResource(Resources.HEAT, heatProduction);
    }
}
