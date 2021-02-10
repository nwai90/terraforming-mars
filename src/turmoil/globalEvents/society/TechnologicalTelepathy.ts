import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Tags} from '../../../cards/Tags';

export class TechnologicalTelepathy implements IGlobalEvent {
    public name = GlobalEventName.TECHNOLOGICAL_TELEPATHY;
    public description = 'Draw 1 card for every 3 Science tags (max 5 sets). Influence counts as Science tags.';
    public revealedDelegate = PartyName.POPULISTS;
    public currentDelegate = PartyName.EMPOWER;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const setsCount = Math.floor(player.getTagCount(Tags.SCIENCE, false, false) + turmoil.getPlayerInfluence(player) / 3);
        const amount = Math.min(setsCount, 5);
        if (amount > 0) player.drawCard(amount);
      });
    }
}
