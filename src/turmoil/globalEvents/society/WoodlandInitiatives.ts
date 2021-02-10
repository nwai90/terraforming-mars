import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';

export class WoodlandInitiatives implements IGlobalEvent {
    public name = GlobalEventName.WOODLAND_INITIATIVES;
    public description = 'Increase oxygen 1 step. Draw 1 card for each influence.';
    public revealedDelegate = PartyName.TRANSHUMANS;
    public currentDelegate = PartyName.POPULISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.increaseOxygenLevel(game.getPlayers()[0], 1);

      game.getPlayers().forEach((player) => {
        const influence = turmoil.getPlayerInfluence(player);
        if (influence > 0) player.drawCard(influence);
      });
    }
}
