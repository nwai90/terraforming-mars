import {Player, PlayerId} from '../../Player';
import {Game} from '../../Game';
import {NeutralPlayer} from '../Turmoil';
import {IParty} from './IParty';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {CardName} from '../../CardName';

export abstract class Party {
    public partyLeader: undefined | PlayerId | NeutralPlayer = undefined;
    public delegates: Array<PlayerId | NeutralPlayer> = [];

    // Send a delegate in the area
    public sendDelegate(playerId: PlayerId | NeutralPlayer, game: Game): void {
      this.delegates.push(playerId);
      this.checkPartyLeader(playerId, game);
    }

    // Remove a delegate from the area
    public removeDelegate(playerId: PlayerId | NeutralPlayer, game: Game): void {
      this.delegates.splice(this.delegates.indexOf(playerId), 1);
      this.checkPartyLeader(playerId, game);
    }

    // Check if you are the new party leader
    public checkPartyLeader(newPlayer: PlayerId | NeutralPlayer, game: Game): void {
      const currentPartyLeader = this.partyLeader;
      // If there is a party leader
      if (currentPartyLeader !== undefined) {
        if (game) {
          const sortedPlayers = [...this.getPresentPlayers()].sort(
            (p1, p2) => this.getDelegates(p2) - this.getDelegates(p1),
          );
          const max = this.getDelegates(sortedPlayers[0]);

          if (this.getDelegates(currentPartyLeader) !== max) {
            let currentIndex = 0;
            if (this.partyLeader === 'NEUTRAL') {
              currentIndex = game.getPlayers().indexOf(game.getPlayerById(game.activePlayer));
            } else {
              currentIndex = game.getPlayers().indexOf(game.getPlayerById(currentPartyLeader));
            }

            let playersToCheck: Array<Player | NeutralPlayer> = [];

            // Manage if it's the first player or the last
            if (game.getPlayers().length === 1 || currentIndex === 0) {
              playersToCheck = game.getPlayers();
            } else if (currentIndex === game.getPlayers().length - 1) {
              playersToCheck = game.getPlayers().slice(0, currentIndex);
              playersToCheck.unshift(game.getPlayers()[currentIndex]);
            } else {
              const left = game.getPlayers().slice(0, currentIndex);
              const right = game.getPlayers().slice(currentIndex);
              playersToCheck = right.concat(left);
            }

            // Add NEUTRAL in the list
            playersToCheck.push('NEUTRAL');

            playersToCheck.some((nextPlayer) => {
              let nextPlayerId = '';
              if (nextPlayer === 'NEUTRAL') {
                nextPlayerId = 'NEUTRAL';
              } else {
                nextPlayerId = nextPlayer.id;
              }
              if (this.getDelegates(nextPlayerId) === max) {
                this.partyLeader = nextPlayerId;

                if (nextPlayer !== 'NEUTRAL') {
                  game.defer(new DeferredAction(nextPlayer, () => {
                    game.log('${0} is the new ${1} party leader', (b) => b.player(nextPlayer).string((this as unknown as IParty).name));
                    return undefined;
                  }));
                }

                return true;
              }
              return false;
            });
          }
        }
      } else {
        this.partyLeader = newPlayer;
      }

      // Corridors of Power: If you become party leader, draw a card
      if (this.partyLeader === newPlayer && newPlayer !== "NEUTRAL") {
        const player = game.getPlayerById(newPlayer);
        if (player.cardIsInEffect(CardName.CORRIDORS_OF_POWER)) {
          player.drawCard(1);
        }
      }
    }

    // List players present in this party
    public getPresentPlayers(): Array<PlayerId | NeutralPlayer> {
      return Array.from(new Set(this.delegates));
    }

    // Return number of delegate
    public getDelegates(player: PlayerId | NeutralPlayer): number {
      const delegates = this.delegates.filter((p) => p === player).length;
      return delegates;
    }
}
