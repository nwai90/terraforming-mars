import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';
import {AddResourcesToCard} from '../../../deferredActions/AddResourcesToCard';
import {ResourceType} from '../../../ResourceType';

export class AdaptedPathogens implements IGlobalEvent {
    public name = GlobalEventName.ADAPTED_PATHOGENS;
    public description = 'Gain 2 MC for each microbe tag (max 5). Add 1 microbe to a card for each influence.';
    public revealedDelegate = PartyName.POPULISTS;
    public currentDelegate = PartyName.SPOME;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const microbeTagCount = Math.min(player.getTagCount(Tags.MICROBE, false, false), 5);
        if (microbeTagCount > 0) {
          player.addResource(Resources.MEGACREDITS, microbeTagCount * 2, {log: true});
        }

        const influence = turmoil.getPlayerInfluence(player);
        for (let i = 0; i < influence; i++) {
          game.defer(new AddResourcesToCard(player, ResourceType.MICROBE));
        }
      });
    }
}
