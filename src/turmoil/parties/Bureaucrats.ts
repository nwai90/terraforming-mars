import {IParty} from './IParty';
import {Party} from './Party';
import {PartyName} from './PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Bonus} from '../Bonus';
import {Policy} from '../Policy';
import {Player} from '../../Player';
import {TurmoilPolicy} from '../TurmoilPolicy';
import {POLITICAL_AGENDAS_MAX_ACTION_USES} from '../../constants';
import {Turmoil} from '../Turmoil';
import {SendDelegateToArea} from '../../deferredActions/SendDelegateToArea';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {LandClaim} from '../../cards/base/LandClaim';
import {DeferredAction} from '../../deferredActions/DeferredAction';

export class Bureaucrats extends Party implements IParty {
  name = PartyName.BUREAUCRATS;
  description = 'Advocates a rigorous system of checks and balances.';
  bonuses = [BUREAUCRATS_BONUS_1, BUREAUCRATS_BONUS_2];
  policies = [BUREAUCRATS_DEFAULT_POLICY, BUREAUCRATS_POLICY_2, BUREAUCRATS_POLICY_3, BUREAUCRATS_POLICY_4];
}

class BureaucratsBonus01 implements Bonus {
  id = 'bb01';
  isDefault = true;
  description = 'Gain 1 M€ for each Event card you have played';

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      const amount = player.getPlayedEventsCount();
      player.addResource(Resources.MEGACREDITS, amount);
    });
  }
}

class BureaucratsBonus02 implements Bonus {
  id = 'bb02';
  description = 'Mark all card actions as used this generation';
  isDefault = false;

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.getPlayableActionCards().forEach((card) => player.actionsThisGeneration.add(card.name));
    });
  }
}

class BureaucratsPolicy01 implements Policy {
  isDefault = true;
  id = TurmoilPolicy.BUREAUCRATS_DEFAULT_POLICY;
  description: string = 'Pay 3 M€ to send a delegate from your reserve into any party (Turmoil Bureaucrats)';

  canAct(player: Player) {
    const turmoil: Turmoil = player.game.turmoil as Turmoil;
    const hasDelegateInReserve = turmoil.getDelegatesInReserve(player.id) >= 1;

    return player.canAfford(3) && hasDelegateInReserve && player.politicalAgendasActionUsedCount < POLITICAL_AGENDAS_MAX_ACTION_USES;
  }

  action(player: Player) {
    const game = player.game;
    game.log('${0} used Turmoil Bureaucrats action', (b) => b.player(player));
    game.defer(new SendDelegateToArea(player, 'Select where to send delegate', {source: 'reserve'}));
    game.defer(new SelectHowToPayDeferred(player, 3, {title: 'Select how to pay for action'}));
    player.politicalAgendasActionUsedCount += 1;

    return undefined;
  }
}

class BureaucratsPolicy02 implements Policy {
  id = TurmoilPolicy.BUREAUCRATS_POLICY_2;
  description: string = 'When you trade, you must pay 1 additional resource for it';
  isDefault = false;

  apply(game: Game) {
    game.getPlayers().forEach((player) => {
      player.hasBureaucratsColonyTradePenalty = true;
    });
  }
}

class BureaucratsPolicy03 implements Policy {
  id = TurmoilPolicy.BUREAUCRATS_POLICY_3;
  description: string = 'Pay 3 M€ to place your player marker on a non-reserved area (Turmoil Bureaucrats)';
  isDefault = false;

  canAct(player: Player) {
    return player.canAfford(3) && player.politicalAgendasActionUsedCount < POLITICAL_AGENDAS_MAX_ACTION_USES;
  }

  action(player: Player) {
    const game = player.game;

    game.log('${0} used Turmoil Bureaucrats action', (b) => b.player(player));
    game.defer(new SelectHowToPayDeferred(player, 3, {title: 'Select how to pay for action'}));
    game.defer(new DeferredAction(player, () => LandClaim.selectSpaceForClaim(player)));
    player.politicalAgendasActionUsedCount += 1;

    return undefined;
  }
}

class BureaucratsPolicy04 implements Policy {
  id = TurmoilPolicy.BUREAUCRATS_POLICY_4;
  description: string = 'When you play an Earth tag, you pay 3 M€ less for it';
  isDefault = false;
}

export const BUREAUCRATS_BONUS_1 = new BureaucratsBonus01();
export const BUREAUCRATS_BONUS_2 = new BureaucratsBonus02();
export const BUREAUCRATS_DEFAULT_POLICY = new BureaucratsPolicy01();
export const BUREAUCRATS_POLICY_2 = new BureaucratsPolicy02();
export const BUREAUCRATS_POLICY_3 = new BureaucratsPolicy03();
export const BUREAUCRATS_POLICY_4 = new BureaucratsPolicy04();
