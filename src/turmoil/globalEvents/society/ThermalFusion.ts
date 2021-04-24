import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import { Resources } from '../../../Resources';

export class ThermalFusion implements IGlobalEvent {
    public name = GlobalEventName.THERMAL_FUSION;
    public description = 'Convert all energy into heat. Gain 2 heat for each energy production (max 5) and influence.';
    public revealedDelegate = PartyName.POPULISTS;
    public currentDelegate = PartyName.EMPOWER;

    public resolve(game: Game, turmoil: Turmoil) {
      game.increaseOxygenLevel(game.getPlayers()[0], 1);

      game.getPlayers().forEach((player) => {
        player.addResource(Resources.HEAT, player.energy);
        player.addResource(Resources.ENERGY, -player.energy);

        const amount = Math.min(player.getProduction(Resources.ENERGY), 5) + turmoil.getPlayerInfluence(player);
        if (amount > 0) player.addResource(Resources.HEAT, amount * 2, {log: true});
      });
    }
}
