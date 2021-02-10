import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class VerdantEconomy implements IGlobalEvent {
    public name = GlobalEventName.VERDANT_ECONOMY;
    public description = 'Gain 2 MC for each plant tag (max 5) and influence.';
    public revealedDelegate = PartyName.CENTRISTS;
    public currentDelegate = PartyName.TRANSHUMANS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const tagCount = Math.min(player.getTagCount(Tags.PLANT, false, false), 5) + turmoil.getPlayerInfluence(player);

        if (tagCount > 0) {
          player.setResource(Resources.MEGACREDITS, tagCount * 2, game, undefined, true);
        }
      });
    }
}
