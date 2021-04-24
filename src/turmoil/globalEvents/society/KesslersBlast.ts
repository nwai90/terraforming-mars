import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class KesslersBlast implements IGlobalEvent {
    public name = GlobalEventName.KESSLERS_BLAST;
    public description = 'Lose 4 MC for each Earth tag (max 5, then reduced by influence). Gain 2 titanium.';
    public revealedDelegate = PartyName.BUREAUCRATS;
    public currentDelegate = PartyName.CENTRISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const tagCount = Math.min(player.getTagCount(Tags.EARTH), 5) - turmoil.getPlayerInfluence(player);
        if (tagCount > 0) player.addResource(Resources.MEGACREDITS, -tagCount * 4, {log: true});
        player.addResource(Resources.TITANIUM, 2, {log: true});
      });
    }
}
