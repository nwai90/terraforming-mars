import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class ControlledTectonics implements IGlobalEvent {
    public name = GlobalEventName.CONTROLLED_TECTONICS;
    public description = 'Raise Venus 2 steps. Gain 2 heat for each Venus tag (max 5) and influence.';
    public revealedDelegate = PartyName.SPOME;
    public currentDelegate = PartyName.EMPOWER;

    public resolve(game: Game, turmoil: Turmoil) {
      game.increaseVenusScaleLevel(game.getPlayers()[0], 2);

      game.getPlayers().forEach((player) => {
        const venusTagCount = player.getTagCount(Tags.VENUS, false, false);
        const amount = Math.min(venusTagCount, 5) + turmoil.getPlayerInfluence(player);
        player.setResource(Resources.HEAT, amount * 2, game, undefined, true);
      });
    }
}
