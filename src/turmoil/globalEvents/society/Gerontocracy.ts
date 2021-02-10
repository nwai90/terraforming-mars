import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';

export class Gerontocracy implements IGlobalEvent {
    public name = GlobalEventName.GERONTOCRACY;
    public description = 'Gain 10 MC if you have at least 4 cities. Influence counts as cities.';
    public revealedDelegate = PartyName.CENTRISTS;
    public currentDelegate = PartyName.TRANSHUMANS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const amount = player.getCitiesCount() + turmoil.getPlayerInfluence(player);
        if (amount >= 4) {
          player.setResource(Resources.MEGACREDITS, 10, game, undefined, true);
        }
      });
    }
}
