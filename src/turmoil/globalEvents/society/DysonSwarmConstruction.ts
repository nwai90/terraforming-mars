import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Tags} from '../../../cards/Tags';
import {Player} from '../../../Player';

export class DysonSwarmConstruction implements IGlobalEvent {
    public name = GlobalEventName.DYSON_SWARM_CONSTRUCTION;
    public description = 'Count Space tags and add influence. The player(s) with most (at least 1) loses 2 TR, and 2nd most (at least 1) loses 1 TR. SOLO: Lose 2 TR if the sum is 5 or more.';
    public revealedDelegate = PartyName.BUREAUCRATS;
    public currentDelegate = PartyName.POPULISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      if (game.isSoloMode()) {
        if (this.getScore(game.getPlayers()[0], turmoil) >= 5) {
          game.getPlayers()[0].decreaseTerraformRatingSteps(2);
        }
      } else {
        const players = [...game.getPlayers()].sort(
          (p1, p2) => this.getScore(p2, turmoil) - this.getScore(p1, turmoil),
        );

        // We have one rank 1 player
        if (this.getScore(players[0], turmoil) > this.getScore(players[1], turmoil)) {
          players[0].decreaseTerraformRatingSteps(2);
          players.shift();

          if (players.length === 1 && this.getScore(players[0], turmoil) > 0) {
            players[0].decreaseTerraformRating();
          } else if (players.length > 1) {
            // We have one rank 2 player
            if (this.getScore(players[0], turmoil) > this.getScore(players[1], turmoil)) {
              players[0].decreaseTerraformRating();
              // We have at least two rank 2 players
            } else {
              const score = this.getScore(players[0], turmoil);
              while (players.length > 0 && this.getScore(players[0], turmoil) === score) {
                if (this.getScore(players[0], turmoil) > 0) {
                  players[0].decreaseTerraformRating();
                }
                players.shift();
              }
            }
          }
          // We have at least two rank 1 players
        } else {
          const score = this.getScore(players[0], turmoil);
          while (players.length > 0 && this.getScore(players[0], turmoil) === score) {
            if (this.getScore(players[0], turmoil) > 0) {
              players[0].decreaseTerraformRatingSteps(2);
            }
            players.shift();
          }
        }
      }
    }
    public getScore(player: Player, turmoil: Turmoil) {
      return player.getTagCount(Tags.SPACE, false, false) + turmoil.getPlayerInfluence(player);
    }
}
