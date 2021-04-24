import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {Tags} from '../../../cards/Tags';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';

export class PlanetFederation implements IGlobalEvent {
    public name = GlobalEventName.PLANET_FEDERATION;
    public description = 'Gain 3 steel, 2 titanium or 5 MC if you have at least 5 planetary tags. Influence counts as planetary tags.';
    public revealedDelegate = PartyName.CENTRISTS;
    public currentDelegate = PartyName.EMPOWER;

    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const planetaryTagCount = player.getTagCount(Tags.VENUS, false, false) + player.getTagCount(Tags.EARTH, false, false) + player.getTagCount(Tags.JOVIAN, false, false);

        if (planetaryTagCount + turmoil.getPlayerInfluence(player) >= 5) {
          const gainSteel = new SelectOption(
            'Gain 3 steel',
            'Select',
            () => {
              player.addResource(Resources.STEEL, 3, {log: true});
              return undefined;
            },
          );

          const gainTitanium = new SelectOption(
            'Gain 2 titanium',
            'Select',
            () => {
              player.addResource(Resources.TITANIUM, 2, {log: true});
              return undefined;
            },
          );

          const gainMc = new SelectOption(
            'Gain 5 MC',
            'Select',
            () => {
              player.addResource(Resources.MEGACREDITS, 5, {log: true});
              return undefined;
            },
          );

          game.defer(new DeferredAction(player, () => new OrOptions(gainTitanium, gainSteel, gainMc)));
        }
      });
    }
}
