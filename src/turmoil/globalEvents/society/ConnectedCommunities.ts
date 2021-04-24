import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {SpaceType} from '../../../SpaceType';

export class ConnectedCommunities implements IGlobalEvent {
    public name = GlobalEventName.CONNECTED_COMMUNITIES;
    public description = 'Gain 1 TR if you have at least 3 connected tiles. Increase MC production 1 step for each influence.';
    public revealedDelegate = PartyName.CENTRISTS;
    public currentDelegate = PartyName.POPULISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const hasThreeConnectedTiles = game.board.spaces.some((space) => {
          if (space.tile === undefined || space.player !== player || space.spaceType === SpaceType.COLONY) {
            return false;
          }
          return game.board.getAdjacentSpaces(space).filter((adj) => adj.tile !== undefined && adj.player === player).length >= 2;
        });

        if (hasThreeConnectedTiles) player.increaseTerraformRating();

        const influence = turmoil.getPlayerInfluence(player);
        if (influence > 0) player.addProduction(Resources.MEGACREDITS, influence, {log: true});
      });
    }
}
