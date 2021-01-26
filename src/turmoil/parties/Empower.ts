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
  policies = [EMPOWER_POLICY_1, EMPOWER_POLICY_2, EMPOWER_POLICY_3, EMPOWER_POLICY_4];
}

class EmpowerBonus01 implements Bonus {
  id = 'eb01';
  isDefault = true;
  description = 'Gain 2 MC for each Power tag you have';

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      const tagCount = player.getTagCount(Tags.ENERGY, false, false);
      player.setResource(Resources.MEGACREDITS, tagCount);
    });
  }
}

class EmpowerBonus02 implements Bonus {
  id = 'eb02';
  description = 'Gain 1 MC for each Energy production you have';
  isDefault = false;

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      const energyProduction = player.getProduction(Resources.ENERGY);
      player.setResource(Resources.MEGACREDITS, energyProduction);
    });
  }
}

class EmpowerPolicy01 implements Policy {
  isDefault = true;
  id = TurmoilPolicy.EMPOWER_DEFAULT_POLICY;
  description: string = 'Spend X MC to gain X energy';

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
            player.setResource(Resources.MEGACREDITS, -amount);
            player.setResource(Resources.ENERGY, amount);

            player.game.log('${0} spent ${1} MC to gain ${2} energy', (b) => b.player(player).number(amount).number(amount));
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
    player.setResource(Resources.ENERGY);
  }
}

class EmpowerPolicy03 implements Policy {
  id = TurmoilPolicy.EMPOWER_POLICY_3;
  description: string = 'When you gain or lose energy production, gain that many energy resources';
  isDefault = false;
}

class EmpowerPolicy04 implements Policy {
  id = TurmoilPolicy.EMPOWER_POLICY_4;
  description: string = 'Cards with Power tags cost 3 MC less to play';
  isDefault = false;
}

export const EMPOWER_BONUS_1 = new EmpowerBonus01();
export const EMPOWER_BONUS_2 = new EmpowerBonus02();
export const EMPOWER_POLICY_1 = new EmpowerPolicy01();
export const EMPOWER_POLICY_2 = new EmpowerPolicy02();
export const EMPOWER_POLICY_3 = new EmpowerPolicy03();
export const EMPOWER_POLICY_4 = new EmpowerPolicy04();
