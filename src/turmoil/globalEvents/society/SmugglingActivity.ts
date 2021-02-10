import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class SmugglingActivity implements IGlobalEvent {
    public name = GlobalEventName.SMUGGLING_ACTIVITY;
    public description = 'Gain 2 MC for each Jovian tag (max 5) and influence. Increase all colony tracks 1 step.';
    public revealedDelegate = PartyName.CENTRISTS;
    public currentDelegate = PartyName.BUREAUCRATS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {  
        const amount = Math.min(player.getTagCount(Tags.JOVIAN, false, false), 5) + turmoil.getPlayerInfluence(player);
        player.setResource(Resources.MEGACREDITS, amount * 2, game, undefined, true);
      });

      game.colonies.forEach((colony) => {
        colony.increaseTrack();
      });
    }
}
