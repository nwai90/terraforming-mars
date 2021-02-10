import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Player} from '../../../Player';
import {DiscardCards} from '../../../deferredActions/DiscardCards';

export class GenomeControl implements IGlobalEvent {
    public name = GlobalEventName.GENOME_CONTROL;
    public description = 'The player(s) with the most tags in play (reduced by influence) discards 2 cards. SOLO: Discard 2 cards if you have 10 or more cards.';
    public revealedDelegate = PartyName.SPOME;
    public currentDelegate = PartyName.BUREAUCRATS;

    public resolve(game: Game, turmoil: Turmoil) {
      if (game.isSoloMode()) {
        const player = game.getPlayers()[0];
        if (player.cardsInHand.length >= 10) this.discardCards(player, game);
      } else {
        const players = [...game.getPlayers()].sort(
          (p1, p2) => this.getScore(p2, turmoil) - this.getScore(p1, turmoil),
        );

        // We have one rank 1 player
        if (this.getScore(players[0], turmoil) > this.getScore(players[1], turmoil)) {
          this.discardCards(players[0], game);
        } else {
          // We have at least two rank 1 players
          const score = this.getScore(players[0], turmoil);

          while (players.length > 0 && this.getScore(players[0], turmoil) === score) {
            this.discardCards(players[0], game);
            players.shift();
          }
        }
      }
    }

    private getScore(player: Player, turmoil: Turmoil) {
      return Math.max(player.getDistinctTagCount(false) - turmoil.getPlayerInfluence(player), 0);
    }

    private discardCards(player: Player, game: Game): void {
      if (player.cardsInHand.length >= 2) {
        game.defer(new DiscardCards(player, 2, 'Global Event - Select 2 cards to discard'));
      } else if (player.cardsInHand.length === 1) {
        game.defer(new DiscardCards(player, 1, 'Global Event - Select a card to discard'));
      }
    }
}
