import {IParty} from './IParty';
import {Party} from './Party';
import {PartyName} from './PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Bonus} from '../Bonus';
import {Policy} from '../Policy';
import {Player} from '../../Player';
import {TurmoilPolicy} from '../TurmoilPolicy';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {Turmoil} from '../Turmoil';
import {PlayProjectCard} from '../../deferredActions/PlayProjectCard';
import {DeferredAction} from '../../deferredActions/DeferredAction';

export class Transhumans extends Party implements IParty {
  name = PartyName.TRANSHUMANS;
  description = 'Seeks to foster growth by pushing the boundaries of human limits.';
  bonuses = [TRANSHUMANS_BONUS_1, TRANSHUMANS_BONUS_2];
  policies = [TRANSHUMANS_DEFAULT_POLICY, TRANSHUMANS_POLICY_2, TRANSHUMANS_POLICY_3, TRANSHUMANS_POLICY_4];
}

class TranshumansBonus01 implements Bonus {
  id = 'tb01';
  isDefault = true;
  description = 'Gain 1 M€ for each card with requirements you have played';

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      const amount = player.playedCards.filter((card) => card.requirements !== undefined).length;
      player.addResource(Resources.MEGACREDITS, amount);
    });
  }
}

class TranshumansBonus02 implements Bonus {
  id = 'tb02';
  description = 'Gain 2 M€ for each card with no tags you have played';
  isDefault = false;

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      const amount = player.getNoTagsCount();
      player.addResource(Resources.MEGACREDITS, amount * 2);
    });
  }
}

class TranshumansPolicy01 implements Policy {
  isDefault = true;
  id = TurmoilPolicy.TRANSHUMANS_DEFAULT_POLICY;
  description: string = 'Gain 1 wild tag for this generation';
}

class TranshumansPolicy02 implements Policy {
  id = TurmoilPolicy.TRANSHUMANS_POLICY_2;
  description: string = 'Spend 10 M€ to gain 1 influence (Turmoil Transhumans)';
  isDefault = false;

  canAct(player: Player) {
    return player.canAfford(10) && player.turmoilPolicyActionUsed === false;
  }

  action(player: Player) {
    const game = player.game;
    const turmoil: Turmoil = player.game.turmoil as Turmoil;

    game.log('${0} used Turmoil Transhumans action', (b) => b.player(player));
    game.defer(new SelectHowToPayDeferred(player, 10, {title: 'Select how to pay for action'}));
    turmoil.addInfluenceBonus(player);
    player.turmoilPolicyActionUsed = true;

    return undefined;
  }
}

class TranshumansPolicy03 implements Policy {
  id = TurmoilPolicy.TRANSHUMANS_POLICY_3;
  description: string = 'Spend 10 M€ to play a card from hand, ignoring global requirements (Turmoil Transhumans)';
  isDefault = false;

  canAct(player: Player) {
    return player.canAfford(10) && player.turmoilPolicyActionUsed === false;
  }

  action(player: Player) {
    const game = player.game;

    game.log('${0} used Turmoil Transhumans action', (b) => b.player(player));
    game.defer(new SelectHowToPayDeferred(player, 10, {title: 'Select how to pay for action'}));
    game.defer(new DeferredAction(player, () => {
      player.turmoilPolicyActionUsed = true;
      return undefined;
    }));

    game.defer(new PlayProjectCard(player));
    game.defer(new DeferredAction(player, () => {
      player.turmoilPolicyActionUsed = false;
      return undefined;
    }));

    return undefined;
  }
}

class TranshumansPolicy04 implements Policy {
  id = TurmoilPolicy.TRANSHUMANS_POLICY_4;
  description: string = 'When you trade, you may first increase that Colony Tile track 1 step';
  isDefault = false;

  apply(game: Game) {
    game.getPlayers().forEach((player) => {
      player.hasTranshumansColonyTradeOffset = true;
    });
  }
}

export const TRANSHUMANS_BONUS_1 = new TranshumansBonus01();
export const TRANSHUMANS_BONUS_2 = new TranshumansBonus02();
export const TRANSHUMANS_DEFAULT_POLICY = new TranshumansPolicy01();
export const TRANSHUMANS_POLICY_2 = new TranshumansPolicy02();
export const TRANSHUMANS_POLICY_3 = new TranshumansPolicy03();
export const TRANSHUMANS_POLICY_4 = new TranshumansPolicy04();
