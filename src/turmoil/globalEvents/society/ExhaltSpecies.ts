import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';
import {AddResourcesToCard} from '../../../deferredActions/AddResourcesToCard';
import {ResourceType} from '../../../ResourceType';

export class ExhaltSpecies implements IGlobalEvent {
    public name = GlobalEventName.EXHALT_SPECIES;
    public description = 'Gain 2 MC for each animal tag (max 5). Add 1 animal to a card for each influence.';
    public revealedDelegate = PartyName.SPOME;
    public currentDelegate = PartyName.BUREAUCRATS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const animalTagCount = Math.min(player.getTagCount(Tags.ANIMAL, false, false), 5);
        if (animalTagCount > 0) {
          player.addResource(Resources.MEGACREDITS, animalTagCount * 2, {log: true});
        }

        const influence = turmoil.getPlayerInfluence(player);
        for (let i = 0; i < influence; i++) {
          game.defer(new AddResourcesToCard(player, ResourceType.ANIMAL));
        }
      });
    }
}
