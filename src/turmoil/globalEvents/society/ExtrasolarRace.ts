import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class ExtrasolarRace implements IGlobalEvent {
    public name = GlobalEventName.EXTRASOLAR_RACE;
    public description = 'Increase your titanium production 1 step if you have at least 3 Power tags. Influence counts as Power tags.';
    public revealedDelegate = PartyName.TRANSHUMANS;
    public currentDelegate = PartyName.EMPOWER;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const powerTagsCount = player.getTagCount(Tags.ENERGY);

        if (powerTagsCount + turmoil.getPlayerInfluence(player) >= 3) {
          player.addProduction(Resources.TITANIUM, 1, game, undefined, true);
        }
      });
    }
}
