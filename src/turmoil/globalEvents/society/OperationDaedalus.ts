import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';

export class OperationDaedalus implements IGlobalEvent {
    public name = GlobalEventName.OPERATION_DAEDALUS;
    public description = 'Gain 1 titanium for each colony (max 5) and influence. Lose 5 M€.';
    public revealedDelegate = PartyName.EMPOWER;
    public currentDelegate = PartyName.SPOME;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const coloniesCount = Math.min(player.getColoniesCount(), 5) + turmoil.getPlayerInfluence(player);
        if (coloniesCount > 0) player.addResource(Resources.TITANIUM, coloniesCount, {log: true});
        player.addResource(Resources.MEGACREDITS, -5, {log: true});
      });
    }
}
