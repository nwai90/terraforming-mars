import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';

export class TransparentPolitics implements IGlobalEvent {
    public name = GlobalEventName.TRANSPARENT_POLITICS;
    public description = 'Lose 3 delegates, reduced by influence.';
    public revealedDelegate = PartyName.POPULISTS;
    public currentDelegate = PartyName.BUREAUCRATS;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const delegatesToRemove = 3 - turmoil.getPlayerInfluence(player);

        if (delegatesToRemove > 0) {
          for (let i = 0; i < delegatesToRemove; i++) {
            game.defer(new DeferredAction(player, () => {
              const partiesWithPresence = turmoil.parties.filter((party) => party.delegates.includes(player.id));
              if (partiesWithPresence.length === 0) return undefined;

              const options = partiesWithPresence.map((party) => new SelectOption(
                'Remove delegate from ' + party.name,
                'Remove delegate',
                () => {
                  party.delegates.splice(party.delegates.indexOf(player.id), 1);
                  return undefined;
                }),
              );

              return new OrOptions(...options);
            }));
          }
        }
      });
    }
}
