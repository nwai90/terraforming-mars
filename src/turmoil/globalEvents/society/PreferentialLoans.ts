import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';

export class PreferentialLoans implements IGlobalEvent {
    public name = GlobalEventName.PREFERENTIAL_LOANS;
    public description = 'Decrease MC production 1 step for each set of 5 TR over 10 (max 5 sets), then reduced by influence. Gain 10 MC.';
    public revealedDelegate = PartyName.POPULISTS;
    public currentDelegate = PartyName.CENTRISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const amount = Math.min(Math.floor((player.getTerraformRating() - 10) / 5), 5) - turmoil.getPlayerInfluence(player);
        if (amount > 0) player.addProduction(Resources.MEGACREDITS, -amount, {log: true});
        player.addResource(Resources.MEGACREDITS, 10, {log: true});
      });
    }
}
