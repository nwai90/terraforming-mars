import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';

export class ColonizationIncentives implements IGlobalEvent {
    public name = GlobalEventName.COLONIZATION_INCENTIVES;
    public description = 'Gain 2 M€ for each colony (max 5). Gain 3 energy for each influence.';
    public revealedDelegate = PartyName.EMPOWER;
    public currentDelegate = PartyName.POPULISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {  
        const coloniesCount = Math.min(player.getColoniesCount(), 5);
        if (coloniesCount > 0) player.addResource(Resources.MEGACREDITS, coloniesCount * 2, {log: true});

        const influence = turmoil.getPlayerInfluence(player);
        if (influence > 0) player.addResource(Resources.ENERGY, influence * 3, {log: true});
      });
    }
}
