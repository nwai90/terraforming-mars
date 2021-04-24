import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';

export class SocialNihilism implements IGlobalEvent {
    public name = GlobalEventName.SOCIAL_NIHILISM;
    public description = 'Lose 2 MC for each City tile and colony (no limit), then reduced by influence.';
    public revealedDelegate = PartyName.TRANSHUMANS;
    public currentDelegate = PartyName.SPOME;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const totalCount = player.getCitiesCount() + player.getColoniesCount() - turmoil.getPlayerInfluence(player);
        if (totalCount > 0) player.addResource(Resources.MEGACREDITS, -totalCount * 2, {log: true});
      });
    }
}
