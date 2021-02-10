import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {TileType} from '../../../TileType';
import {Resources} from '../../../Resources';

export class BloomingVale implements IGlobalEvent {
    public name = GlobalEventName.BLOOMING_VALE;
    public description = 'Gain 1 plant for each greenery tile (max 5) and influence.';
    public revealedDelegate = PartyName.BUREAUCRATS;
    public currentDelegate = PartyName.TRANSHUMANS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const greeneryCount = game.board.spaces.filter((space) => {
          return space.tile && space.tile.tileType === TileType.GREENERY && space.player !== undefined && space.player.id === player.id;
        }).length;

        const amount = Math.min(greeneryCount, 5) + turmoil.getPlayerInfluence(player);
        player.setResource(Resources.PLANTS, amount, game, undefined, true);
      });
    }
}
