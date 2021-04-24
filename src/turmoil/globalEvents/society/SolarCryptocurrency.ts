import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';

export class SolarCryptocurrency implements IGlobalEvent {
    public name = GlobalEventName.SOLAR_CRYPTOCURRENCY;
    public description = 'Gain 2 MC for each energy production (max 5) and influence.';
    public revealedDelegate = PartyName.EMPOWER;
    public currentDelegate = PartyName.TRANSHUMANS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const energyProduction = Math.min(player.getProduction(Resources.ENERGY), 5);
        const amount = energyProduction + turmoil.getPlayerInfluence(player);
        if (amount > 0) {
          player.addResource(Resources.MEGACREDITS, amount * 2, {log: true});
        }
      });
    }
}
