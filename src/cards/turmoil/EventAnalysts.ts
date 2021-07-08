import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {PartyName} from '../../turmoil/parties/PartyName';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../CardRequirements';
import {TurmoilHandler} from '../../turmoil/TurmoilHandler';
import {Turmoil} from '../../turmoil/Turmoil';
import {SOCIETY_ADDITIONAL_CARD_COST} from '../../constants';

export class EventAnalysts extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.EVENT_ANALYSTS,
      tags: [Tags.SCIENCE],
      cost: 5,

      requirements: CardRequirements.builder((b) => b.party(PartyName.SCIENTISTS)),
      metadata: {
        description: 'Requires that Scientists are ruling or that you have 2 delegates there.',
        cardNumber: 'T05',
        renderData: CardRenderer.builder((b) => b.effect('You have +1 influence.', (be) => {
          be.startEffect.influence(1);
        })),
      },
    });
  }

  public canPlay(player: Player): boolean {
    const turmoil = player.game.turmoil;

    if (turmoil !== undefined) {
      if (turmoil.parties.find((p) => p.name === PartyName.SCIENTISTS)) {
        return turmoil.canPlay(player, PartyName.SCIENTISTS);
      }
      return player.canAfford(player.getCardCost(this) + SOCIETY_ADDITIONAL_CARD_COST);
    }
    return false;
  }

  public play(player: Player) {
    TurmoilHandler.handleSocietyPayment(player, PartyName.SCIENTISTS);
    Turmoil.getTurmoil(player.game).addInfluenceBonus(player);
    return undefined;
  }
}
