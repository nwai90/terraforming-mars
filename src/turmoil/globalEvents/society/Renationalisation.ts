import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {CardType} from '../../../cards/CardType';

export class Renationalisation implements IGlobalEvent {
    public name = GlobalEventName.RENATIONALISATION;
    public description = 'Lose 4 M€ for every set of 3 automated cards in play (max 5 sets), then reduced by influence.';
    public revealedDelegate = PartyName.CENTRISTS;
    public currentDelegate = PartyName.POPULISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const setsCount = Math.floor(player.playedCards.filter((card) => card.cardType === CardType.AUTOMATED).length / 3);

        const amount = Math.max(Math.min(setsCount, 5) - turmoil.getPlayerInfluence(player), 0);
        player.addResource(Resources.MEGACREDITS, amount * -4, {log: true});
      });
    }
}
