import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {SendDelegateToArea} from '../../../deferredActions/SendDelegateToArea';

export class VirtualDemocracy implements IGlobalEvent {
    public name = GlobalEventName.VIRTUAL_DEMOCRACY;
    public description = 'Place a delegate for every 2 City tiles (max 5 sets). Influence counts as City tiles.';
    public revealedDelegate = PartyName.TRANSHUMANS;
    public currentDelegate = PartyName.BUREAUCRATS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const citiesCount = Math.floor(player.getCitiesCount() / 2 + turmoil.getPlayerInfluence(player));
        const amount = Math.min(citiesCount, 5);

        const playerHasLobbyDelegate = turmoil.lobby.has(player.id);
        let availablePlayerDelegates = turmoil.getDelegatesInReserve(player.id);
        if (playerHasLobbyDelegate) availablePlayerDelegates += 1;

        const qty = Math.min(amount, availablePlayerDelegates);

        for (let i = 0; i < qty; i++) {
          const fromLobby = (i === qty - 1 && qty === availablePlayerDelegates && playerHasLobbyDelegate);
          game.defer(new SendDelegateToArea(player, 'Select where to send delegate', {source: fromLobby ? 'lobby' : 'reserve'}));
        }
      });
    }
}
