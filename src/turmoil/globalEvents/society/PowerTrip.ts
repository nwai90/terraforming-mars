import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class PowerTrip implements IGlobalEvent {
    public name = GlobalEventName.POWER_TRIP;
    public description = 'Lose all energy. Gain 2 MC for each power tag (max 5) and influence.';
    public revealedDelegate = PartyName.BUREAUCRATS;
    public currentDelegate = PartyName.EMPOWER;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        player.energy = 0;

        const powerTagsCount = Math.min(player.getTagCount(Tags.ENERGY), 5) + turmoil.getPlayerInfluence(player);
        if (powerTagsCount > 0) player.addResource(Resources.MEGACREDITS, powerTagsCount * 2, {log: true});
      });
    }
}
