import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';
import {DiscardCards} from '../../../deferredActions/DiscardCards';
import {DrawCards} from '../../../deferredActions/DrawCards';

export class UniversalRoom implements IGlobalEvent {
    public name = GlobalEventName.UNIVERSAL_ROOM;
    public description = 'Gain 2 MC for each City tag (max 5). Draw and discard 1 card for each influence.';
    public revealedDelegate = PartyName.TRANSHUMANS;
    public currentDelegate = PartyName.CENTRISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const cityTagCount = Math.min(player.getTagCount(Tags.CITY, false, false), 5);
        if (cityTagCount > 0) {
          player.addResource(Resources.MEGACREDITS, cityTagCount * 2, {log: true});
        }

        const influence = turmoil.getPlayerInfluence(player);
        for (let i = 0; i < influence; i++) {
          game.defer(DrawCards.keepAll(player));
          game.defer(new DiscardCards(player));
        }
      });
    }
}
