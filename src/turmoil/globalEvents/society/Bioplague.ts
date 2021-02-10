import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {ResourceType} from '../../../ResourceType';
import {RemoveResourcesFromCard} from '../../../deferredActions/RemoveResourcesFromCard';

export class Bioplague implements IGlobalEvent {
    public name = GlobalEventName.BIOPLAGUE;
    public description = 'Lose 3 animals, then reduced by influence.';
    public revealedDelegate = PartyName.TRANSHUMANS;
    public currentDelegate = PartyName.SPOME;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const amountLost = 3 - turmoil.getPlayerInfluence(player);

        if (amountLost > 0) {
          for (let i = 0; i < amountLost; i++) {
            game.defer(new RemoveResourcesFromCard(player, ResourceType.ANIMAL, 1, true, true));
          }
        }
      });
    }
}
