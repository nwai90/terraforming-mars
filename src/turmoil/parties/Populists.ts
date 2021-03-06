import {IParty} from './IParty';
import {Party} from './Party';
import {PartyName} from './PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Bonus} from '../Bonus';
import {Policy} from '../Policy';
import {Player} from '../../Player';
import {TurmoilPolicy} from '../TurmoilPolicy';
import {IProjectCard} from '../../cards/IProjectCard';
import {MarsCoalition} from '../../cards/community/corporations/MarsCoalition';

export class Populists extends Party implements IParty {
  name = PartyName.POPULISTS;
  description = 'Wishes to curb excessive capitalism and corporate greed.';
  bonuses = [POPULISTS_BONUS_1, POPULISTS_BONUS_2];
  policies = [POPULISTS_DEFAULT_POLICY, POPULISTS_POLICY_2, POPULISTS_POLICY_3, POPULISTS_POLICY_4];
}

class PopulistsBonus01 implements Bonus {
  id = 'pb01';
  isDefault = true;
  description = 'Lose 1 M€ for every 5 M€ you have over 40';

  getScore(player: Player) {
    return Math.floor(Math.max(player.megaCredits - 40, 0) / 5) * -1;
  }

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.addResource(Resources.MEGACREDITS, this.getScore(player));
    });
  }
}

class PopulistsBonus02 implements Bonus {
  id = 'pb02';
  description = 'Lose 2 M€ for every 8 cards you have in hand';
  isDefault = false;

  getScore(player: Player) {
    return Math.floor(player.cardsInHand.length / 8) * -2;
  }

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      player.addResource(Resources.MEGACREDITS, this.getScore(player));
    });
  }
}

class PopulistsPolicy01 implements Policy {
  isDefault = true;
  id = TurmoilPolicy.POPULISTS_DEFAULT_POLICY;
  description: string = 'No card discounts are applied this generation';
}

class PopulistsPolicy02 implements Policy {
  id = TurmoilPolicy.POPULISTS_POLICY_2;
  description: string = 'When you play a card with NON-NEGATIVE VP, lose 2 M€ or as much as possible';
  isDefault = false;

  onCardPlayed(player: Player, card: IProjectCard) {
    if (card.getVictoryPoints !== undefined && card.getVictoryPoints(player) > 0) {
      player.addResource(Resources.MEGACREDITS, -2);
    }
  }
}

class PopulistsPolicy03 implements Policy {
  id = TurmoilPolicy.POPULISTS_POLICY_3;
  description: string = 'Draw 2 cards if your Terraform Rating was raised this generation (Turmoil Populists)';
  isDefault = false;

  canAct(player: Player, isDominantPartyAction: boolean = false) {
    return player.hasIncreasedTerraformRatingThisGeneration && player.canUseSingleTurmoilAction(isDominantPartyAction);
  }

  action(player: Player, isDominantPartyAction: boolean = false) {
    const game = player.game;
    game.log('${0} used Turmoil Populists action', (b) => b.player(player));
    player.drawCard(2);

    MarsCoalition.handleSingleUsePolicyLogic(player, isDominantPartyAction);

    return undefined;
  }
}

class PopulistsPolicy04 implements Policy {
  id = TurmoilPolicy.POPULISTS_POLICY_4;
  description: string = 'When you place a tile, gain 3 M€';
  isDefault = false;

  onTilePlaced(player: Player) {
    player.addResource(Resources.MEGACREDITS, 3);
  }
}

export const POPULISTS_BONUS_1 = new PopulistsBonus01();
export const POPULISTS_BONUS_2 = new PopulistsBonus02();
export const POPULISTS_DEFAULT_POLICY = new PopulistsPolicy01();
export const POPULISTS_POLICY_2 = new PopulistsPolicy02();
export const POPULISTS_POLICY_3 = new PopulistsPolicy03();
export const POPULISTS_POLICY_4 = new PopulistsPolicy04();
