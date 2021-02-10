import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Tags} from '../../../cards/Tags';

export class AtmosphericCompression implements IGlobalEvent {
    public name = GlobalEventName.ATMOSPHERIC_COMPRESSION;
    public description = 'Decrease Venus 2 steps. Gain 1 TR if you have at least 3 Venus tags. Influence counts as Venus tags.'
    public revealedDelegate = PartyName.EMPOWER;
    public currentDelegate = PartyName.CENTRISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.increaseVenusScaleLevel(game.getPlayers()[0], -2);

      game.getPlayers().forEach((player) => {
        const venusTagCount = player.getTagCount(Tags.VENUS, false, false) + turmoil.getPlayerInfluence(player);
        if (venusTagCount >= 3) player.increaseTerraformRating();
      });
    }
}
