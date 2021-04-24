import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class PhaetonRescue implements IGlobalEvent {
    public name = GlobalEventName.PHAETON_RESCUE;
    public description = 'Gain 1 steel for every 2 building tags (max 5 sets) and influence. Decrease all colony tracks 1 step.';
    public revealedDelegate = PartyName.BUREAUCRATS;
    public currentDelegate = PartyName.SPOME;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const tagCount = Math.min(Math.floor(player.getTagCount(Tags.BUILDING) / 2), 5) + turmoil.getPlayerInfluence(player);
        if (tagCount > 0) player.addResource(Resources.STEEL, tagCount, {log: true});
      });

      game.colonies.forEach((colony) => {
        colony.decreaseTrack();
      });
    }
}
