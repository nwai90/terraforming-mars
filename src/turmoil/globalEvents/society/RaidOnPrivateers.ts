import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';

export class RaidOnPrivateers implements IGlobalEvent {
    public name = GlobalEventName.RAID_ON_PRIVATEERS;
    public description = 'Lose 5 MC if you have 4 or more planetary tags, reduced by influence.';
    public revealedDelegate = PartyName.POPULISTS;
    public currentDelegate = PartyName.CENTRISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const planetaryTagCount = player.getTagCount(Tags.VENUS, false, false) + player.getTagCount(Tags.EARTH, false, false) + player.getTagCount(Tags.JOVIAN, false, false);
        const amount = planetaryTagCount - turmoil.getPlayerInfluence(player);
        if (amount >= 4) player.setResource(Resources.MEGACREDITS, -5, game, undefined, true);
      });
    }
}
