import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class MagneticShield implements IGlobalEvent {
    public name = GlobalEventName.MAGNETIC_SHIELD;
    public description = 'Lose 4 MC for each Power tag (max 5), then reduced by influence.';
    public revealedDelegate = PartyName.EMPOWER;
    public currentDelegate = PartyName.TRANSHUMANS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        let powerTagsCount = Math.min(player.getTagCount(Tags.ENERGY), 5);
        powerTagsCount = Math.max(powerTagsCount - turmoil.getPlayerInfluence(player), 0);
        if (powerTagsCount > 0) player.addResource(Resources.MEGACREDITS, -powerTagsCount * 4, {log: true});
      });
    }
}
