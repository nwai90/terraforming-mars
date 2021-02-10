import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';

export class ClosedBiospheres implements IGlobalEvent {
    public name = GlobalEventName.CLOSED_BIOSPHERES;
    public description = 'Decrease plant and MC production 1 step. Gain 1 plant for each influence.';
    public revealedDelegate = PartyName.SPOME;
    public currentDelegate = PartyName.POPULISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        if (player.getProduction(Resources.PLANTS) > 0) {
          player.addProduction(Resources.PLANTS, -1, game, undefined, true);
        }

        if (player.getProduction(Resources.MEGACREDITS) > 0) {
          player.addProduction(Resources.MEGACREDITS, -1, game, undefined, true);
        }

        player.setResource(Resources.PLANTS, turmoil.getPlayerInfluence(player), game, undefined, true);
      });
    }
}
