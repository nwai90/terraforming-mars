import {IParty} from './IParty';
import {Party} from './Party';
import {PartyName} from './PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Bonus} from '../Bonus';
import {Policy} from '../Policy';
import {Player} from '../../Player';
import {TurmoilPolicy} from '../TurmoilPolicy';
import {LogHelper} from '../../LogHelper';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {ColonyName} from '../../colonies/ColonyName';
import {SelectColony} from '../../inputs/SelectColony';
import {ColonyModel} from '../../models/ColonyModel';

export class Centrists extends Party implements IParty {
  name = PartyName.CENTRISTS;
  description = 'Strives for equality and teamwork to achieve a greater good.';
  bonuses = [CENTRISTS_BONUS_1, CENTRISTS_BONUS_2];
  policies = [CENTRISTS_DEFAULT_POLICY, CENTRISTS_POLICY_2, CENTRISTS_POLICY_3, CENTRISTS_POLICY_4];
}

class CentristsBonus01 implements Bonus {
  id = 'cb01';
  isDefault = true;
  description = 'Gain 8 MC';

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.addResource(Resources.MEGACREDITS, 8);
    });
  }
}

class CentristsBonus02 implements Bonus {
  id = 'cb02';
  description = 'Gain 1 TR';
  isDefault = false;

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.increaseTerraformRating();
    });
  }
}

class CentristsPolicy01 implements Policy {
  isDefault = true;
  id = TurmoilPolicy.CENTRISTS_DEFAULT_POLICY;
  description: string = 'Gain 6 MC (Turmoil Centrists)';

  canAct(player: Player) {
    return player.turmoilPolicyActionUsed === false;
  }

  action(player: Player) {
    player.game.log('${0} used Turmoil Centrists action', (b) => b.player(player));
    LogHelper.logGainStandardResource(player, Resources.MEGACREDITS, 6);
    player.addResource(Resources.MEGACREDITS, 6);
    player.turmoilPolicyActionUsed = true;

    return undefined;
  }
}

class CentristsPolicy02 implements Policy {
  id = TurmoilPolicy.CENTRISTS_POLICY_2;
  description: string = 'Delegates cost 2 MC more to place';
  isDefault = false;
}

class CentristsPolicy03 implements Policy {
  id = TurmoilPolicy.CENTRISTS_POLICY_3;
  description: string = 'Trade with any colony tile for free (Turmoil Centrists)';
  isDefault = false;

  canAct(player: Player) {
    if (player.game.gameOptions.coloniesExtension === false) return false;
    if (player.getFleetSize() === player.tradesThisGeneration) return false;

    const openColonies = player.game.colonies.filter((colony) => colony.isActive && colony.visitor === undefined);
    return player.turmoilPolicyActionUsed === false && openColonies.length > 0;
  }

  action(player: Player) {
    const game = player.game;
    game.log('${0} used Turmoil Centrists action', (b) => b.player(player));

    const openColonies = player.game.colonies.filter((colony) => colony.isActive && colony.visitor === undefined);
    const coloniesModel: Array<ColonyModel> = player.game.getColoniesModel(openColonies);

    game.defer(new DeferredAction(player, () => new SelectColony('Select colony tile for trade', 'trade', coloniesModel, (colonyName: ColonyName) => {
      openColonies.forEach((colony) => {
        if (colony.name === colonyName) {
          player.game.log('${0} traded with ${1}', (b) => b.player(player).colony(colony));
          colony.trade(player);
          return undefined;
        }
        return undefined;
      });
      return undefined;
    })));

    player.turmoilPolicyActionUsed = true;
    return undefined;
  }
}

class CentristsPolicy04 implements Policy {
  id = TurmoilPolicy.CENTRISTS_POLICY_4;
  description: string = 'When you play an Event card, you pay 2 MC less for it';
  isDefault = false;
}

export const CENTRISTS_BONUS_1 = new CentristsBonus01();
export const CENTRISTS_BONUS_2 = new CentristsBonus02();
export const CENTRISTS_DEFAULT_POLICY = new CentristsPolicy01();
export const CENTRISTS_POLICY_2 = new CentristsPolicy02();
export const CENTRISTS_POLICY_3 = new CentristsPolicy03();
export const CENTRISTS_POLICY_4 = new CentristsPolicy04();
