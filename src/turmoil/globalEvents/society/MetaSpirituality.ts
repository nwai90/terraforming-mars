import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {MetaSpiritualityDeferredAction} from '../../../deferredActions/MetaSpiritualityDeferredAction';

export class MetaSpirituality implements IGlobalEvent {
    public name = GlobalEventName.META_SPIRITUALITY;
    public description = 'Gain 1 standard resource for each card with no tags (no limit) and influence. Each resource must be different if possible.';
    public revealedDelegate = PartyName.SPOME;
    public currentDelegate = PartyName.TRANSHUMANS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const amount = player.getNoTagsCount() + turmoil.getPlayerInfluence(player);
        if (amount > 0) {
          game.defer(new MetaSpiritualityDeferredAction(player, amount));
        }
      });
    }
}
