import {IParty} from './IParty';
import {Party} from './Party';
import {PartyName} from './PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Bonus} from '../Bonus';
import {Policy} from '../Policy';
import {Player} from '../../Player';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {TurmoilPolicy} from '../TurmoilPolicy';
import {DiscardCards} from '../../deferredActions/DiscardCards';
import {Tags} from '../../cards/Tags';
import {MarsCoalition} from '../../cards/community/corporations/MarsCoalition';

export class Spome extends Party implements IParty {
  name = PartyName.SPOME;
  description = 'Believes that space is limitless and wants to explore every direction.';
  bonuses = [SPOME_BONUS_1, SPOME_BONUS_2];
  policies = [SPOME_DEFAULT_POLICY, SPOME_POLICY_2, SPOME_POLICY_3, SPOME_POLICY_4];
}

class SpomeBonus01 implements Bonus {
  id = 'spb01';
  isDefault = true;
  description = 'Gain 1 M€ for each different tag you have';

  getScore(player: Player) {
    return player.getDistinctTagCount(false);
  }

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.addResource(Resources.MEGACREDITS, this.getScore(player));
    });
  }
}

class SpomeBonus02 implements Bonus {
  id = 'spb02';
  description = 'Gain 1 M€ for each type of resource you have';
  isDefault = false;

  getScore(player: Player) {
    const standardResources = [Resources.MEGACREDITS, Resources.STEEL, Resources.TITANIUM, Resources.PLANTS, Resources.ENERGY, Resources.HEAT]
        .filter((res) => player.getResource(res) > 0).length;
    const nonStandardResources = new Set(player.getCardsWithResources().map((card) => card.resourceType)).size;

    return standardResources + nonStandardResources;
  }

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.addResource(Resources.MEGACREDITS, this.getScore(player));
    });
  }
}

class SpomePolicy01 implements Policy {
  isDefault = true;
  id = TurmoilPolicy.SPOME_DEFAULT_POLICY;
  description: string = 'When you raise Venus, gain 2 M€ per step raised';
}

class SpomePolicy02 implements Policy {
  id = TurmoilPolicy.SPOME_POLICY_2;
  description: string = 'Pay 10 M€ to gain a trade fleet (Turmoil Spome)';
  isDefault = false;

  canAct(player: Player, isDominantPartyAction: boolean = false) {
    const hasActionsRemaining = isDominantPartyAction ? player.dominantPartyActionUsedCount === 0 : player.turmoilPolicyActionUsed === false;
    return player.megaCredits >= 10 && hasActionsRemaining;
  }

  action(player: Player, isDominantPartyAction: boolean = false) {
    player.game.defer(new SelectHowToPayDeferred(player, 10, {title: 'Select how to pay for action'}));
    player.increaseFleetSize();

    MarsCoalition.handleSingleUsePolicyLogic(player, isDominantPartyAction);

    player.game.log('${0} used Turmoil Spome action', (b) => b.player(player));
    return undefined;
  }
}

class SpomePolicy03 implements Policy {
  id = TurmoilPolicy.SPOME_POLICY_3;
  description: string = 'When you place a tile ON MARS, discard a card if possible';
  isDefault = false;

  onTilePlaced(player: Player) {
    if (player.cardsInHand.length > 0) {
      player.game.defer(new DiscardCards(player, 1, 'Spome Ruling Policy - Select a card to discard'));
    }
  }
}

class SpomePolicy04 implements Policy {
  id = TurmoilPolicy.SPOME_POLICY_4;
  description: string = 'Pay 10 M€ to draw 2 planetary cards (Turmoil Spome)';
  isDefault = false;

  canAct(player: Player, isDominantPartyAction: boolean = false) {
    const hasActionsRemaining = isDominantPartyAction ? player.dominantPartyActionUsedCount === 0 : player.turmoilPolicyActionUsed === false;
    return player.canAfford(10) && hasActionsRemaining;
  }

  action(player: Player, isDominantPartyAction: boolean = false) {
    const game = player.game;
    game.log('${0} used Turmoil Spome action', (b) => b.player(player));

    MarsCoalition.handleSingleUsePolicyLogic(player, isDominantPartyAction);

    game.defer(new SelectHowToPayDeferred(
      player,
      10,
      {
        title: 'Select how to pay for Turmoil Spome action',
        afterPay: () => {
          player.drawCard(2, {
            include: (card) => card.tags.includes(Tags.VENUS) || card.tags.includes(Tags.EARTH) || card.tags.includes(Tags.JOVIAN),
          });
        },
      },
    ));

    return undefined;
  }
}

export const SPOME_BONUS_1 = new SpomeBonus01();
export const SPOME_BONUS_2 = new SpomeBonus02();
export const SPOME_DEFAULT_POLICY = new SpomePolicy01();
export const SPOME_POLICY_2 = new SpomePolicy02();
export const SPOME_POLICY_3 = new SpomePolicy03();
export const SPOME_POLICY_4 = new SpomePolicy04();
