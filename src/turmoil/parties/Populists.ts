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

export class Populists extends Party implements IParty {
  name = PartyName.POPULISTS;
  description = 'Wishes to curb excessive capitalism and corporate greed.';
  bonuses = [POPULISTS_BONUS_1, POPULISTS_BONUS_2];
  policies = [POPULISTS_POLICY_1, POPULISTS_POLICY_2, POPULISTS_POLICY_3, POPULISTS_POLICY_4];
}

class PopulistsBonus01 implements Bonus {
  id = 'pb01';
  isDefault = true;
  description = 'Lose 1 MC for every 5 MC you have over 40';

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      const amountLost = Math.floor(Math.max(player.megaCredits - 40, 0) / 5);
      player.setResource(Resources.MEGACREDITS, amountLost);
    });
  }
}

class PopulistsBonus02 implements Bonus {
  id = 'pb02';
  description = 'Lose 2 MC for every 8 cards you have in hand';
  isDefault = false;

  grant(game: Game) {
    game.getPlayers().forEach((player) => {
      const amountLost = Math.floor(player.cardsInHand.length / 8);
      player.setResource(Resources.MEGACREDITS, amountLost);
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
  description: string = 'When you play a card with NON-NEGATIVE VP, lose 2 MC or as much as possible';
  isDefault = false;

  onCardPlayed(player: Player, card: IProjectCard) {
    if (card.getVictoryPoints !== undefined && card.getVictoryPoints(player) > 0) {
      player.setResource(Resources.MEGACREDITS, -2);
    }
  }
}

class PopulistsPolicy03 implements Policy {
  id = TurmoilPolicy.POPULISTS_POLICY_3;
  description: string = 'Draw 2 cards if your Terraform Rating was raised this generation (Turmoil Populists)';
  isDefault = false;

  canAct(player: Player) {
    return player.hasIncreasedTerraformRatingThisGeneration && player.turmoilPolicyActionUsed === false;
  }

  action(player: Player) {
    const game = player.game;
    game.log('${0} used Turmoil Populists action', (b) => b.player(player));
    player.drawCard(2);
    player.turmoilPolicyActionUsed = true;

    return undefined;
  }
}

class PopulistsPolicy04 implements Policy {
  id = TurmoilPolicy.POPULISTS_POLICY_4;
  description: string = 'When you place a tile, gain 3 MC';
  isDefault = false;

  onTilePlaced(player: Player) {
    player.setResource(Resources.MEGACREDITS, 3);
  }
}

export const POPULISTS_BONUS_1 = new PopulistsBonus01();
export const POPULISTS_BONUS_2 = new PopulistsBonus02();
export const POPULISTS_POLICY_1 = new PopulistsPolicy01();
export const POPULISTS_POLICY_2 = new PopulistsPolicy02();
export const POPULISTS_POLICY_3 = new PopulistsPolicy03();
export const POPULISTS_POLICY_4 = new PopulistsPolicy04();
