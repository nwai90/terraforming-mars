import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {ResourceType} from '../../../ResourceType';

export class DutyFreeSpace implements IGlobalEvent {
    public name = GlobalEventName.DUTY_FREE_SPACE;
    public description = 'Gain 2 MC for each card with at least one floater on it (max 5) and influence.';
    public revealedDelegate = PartyName.SPOME;
    public currentDelegate = PartyName.BUREAUCRATS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const floaterCardsWithResourcesCount = player.playedCards.filter((card) =>
          card.resourceType === ResourceType.FLOATER
          && card.resourceCount !== undefined
          && card.resourceCount > 0).length;

        const amount = Math.min(floaterCardsWithResourcesCount, 5) + turmoil.getPlayerInfluence(player);
        player.setResource(Resources.MEGACREDITS, amount * 2, game, undefined, true);
      });
    }
}
