import {IGlobalEvent} from './../IGlobalEvent';
import {GlobalEventName} from './../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';

export class FermiSolution implements IGlobalEvent {
    public name = GlobalEventName.FERMI_SOLUTION;
    public description = 'Decrease MC production 1 step for each colony. Draw 1 card for each influence.';
    public revealedDelegate = PartyName.BUREAUCRATS;
    public currentDelegate = PartyName.SPOME;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const coloniesCount = player.getColoniesCount();
        player.addProduction(Resources.MEGACREDITS, -coloniesCount, {log: true});
        player.drawCard(turmoil.getPlayerInfluence(player));
      });
    }
}
