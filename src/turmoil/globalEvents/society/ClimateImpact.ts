import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {Resources} from '../../../Resources';
import {MAX_OXYGEN_LEVEL} from '../../../constants';

export class ClimateImpact implements IGlobalEvent {
    public name = GlobalEventName.CLIMATE_IMPACT;
    public description = 'Decrease oxygen 1 step. Lose 1 plant for each set of 5 TR over 15 and influence (max 5 sets).';
    public revealedDelegate = PartyName.EMPOWER;
    public currentDelegate = PartyName.CENTRISTS;

    public resolve(game: Game, turmoil: Turmoil) {
      const canDecreaseOxygen = game.getTemperature() !== MAX_OXYGEN_LEVEL;
      if (canDecreaseOxygen) game.increaseOxygenLevel(game.getPlayers()[0], -1);

      game.getPlayers().forEach((player) => {
        const trSetsOver15 = Math.floor((player.getTerraformRating() - 15) / 5);
        const amount = Math.min(trSetsOver15, 5) + turmoil.getPlayerInfluence(player);

        if (amount > 0) {
          player.addResource(Resources.PLANTS, -amount, {log: true});
        }
      });
    }
}
