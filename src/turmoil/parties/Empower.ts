import {IParty} from './IParty';
import {Party} from './Party';
import {PartyName} from './PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Bonus} from '../Bonus';
import {Policy} from '../Policy';
import {Player} from '../../Player';
import {TurmoilPolicy} from '../TurmoilPolicy';
import {Tags} from '../../cards/Tags';
import {SelectAmount} from '../../inputs/SelectAmount';
import {DeferredAction} from '../../deferredActions/DeferredAction';

export class Empower extends Party implements IParty {
  name = PartyName.EMPOWER;
  description = 'Champions efficient energy utilization for sustainable growth.';
  bonuses = [EMPOWER_BONUS_1, EMPOWER_BONUS_2];
  policies = [EMPOWER_DEFAULT_POLICY, EMPOWER_POLICY_2, EMPOWER_POLICY_3, EMPOWER_POLICY_4];
}

class EmpowerBonus01 implements Bonus {
  id = 'eb01';
  isDefault = true;
  description = 'Gain 2 M€ for each Power tag you have';

  getScore(player: Player) {
    return player.getTagCount(Tags.ENERGY, false, false) * 2;
  }

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.addResource(Resources.MEGACREDITS, this.getScore(player));
    });
  }
}

class EmpowerBonus02 implements Bonus {
  id = 'eb02';
  description = 'Gain 1 M€ for each Energy production you have';
  isDefault = false;

  getScore(player: Player) {
    return player.getProduction(Resources.ENERGY);
  }

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.addResource(Resources.MEGACREDITS, this.getScore(player));
    });
  }
}

class EmpowerPolicy01 implements Policy {
  isDefault = true;
  id = TurmoilPolicy.EMPOWER_DEFAULT_POLICY;
  description: string = 'Spend X M€ to gain X energy (Turmoil Empower)';

  canAct(player: Player) {
    return player.canAfford(1) && player.turmoilPolicyActionUsed === false;
  }

  action(player: Player) {
    const availableMC = player.spendableMegacredits();

    player.game.defer(
      new DeferredAction(
        player, () => new SelectAmount(
          'Select amount of energy to gain',
          'Gain energy',
          (amount: number) => {
            player.addResource(Resources.MEGACREDITS, -amount);
            player.addResource(Resources.ENERGY, amount);
            player.game.log('${0} used Turmoil Empower action', (b) => b.player(player));
            player.game.log('${0} spent ${1} M€ to gain ${2} energy', (b) => b.player(player).number(amount).number(amount));
            return undefined;
          },
          1,
          availableMC,
        ),
      ),
    );

    player.turmoilPolicyActionUsed = true;
    return undefined;
  }
}

class EmpowerPolicy02 implements Policy {
  id = TurmoilPolicy.EMPOWER_POLICY_2;
  description: string = 'When you place a tile, gain 1 energy';
  isDefault = false;

  onTilePlaced(player: Player) {
    player.addResource(Resources.ENERGY);
  }
}

class EmpowerPolicy03 implements Policy {
  id = TurmoilPolicy.EMPOWER_POLICY_3;
  description: string = 'When you gain or lose energy production, gain 2 energy';
  isDefault = false;
}

class EmpowerPolicy04 implements Policy {
  id = TurmoilPolicy.EMPOWER_POLICY_4;
  description: string = 'When you play a Power tag, you pay 3 M€ less for it';
  isDefault = false;
}

export const EMPOWER_BONUS_1 = new EmpowerBonus01();
export const EMPOWER_BONUS_2 = new EmpowerBonus02();
export const EMPOWER_DEFAULT_POLICY = new EmpowerPolicy01();
export const EMPOWER_POLICY_2 = new EmpowerPolicy02();
export const EMPOWER_POLICY_3 = new EmpowerPolicy03();
export const EMPOWER_POLICY_4 = new EmpowerPolicy04();
