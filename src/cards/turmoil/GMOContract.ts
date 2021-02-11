import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {PartyName} from '../../turmoil/parties/PartyName';
import {Resources} from '../../Resources';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../CardRequirements';
import {SOCIETY_ADDITIONAL_CARD_COST} from '../../constants';
import {TurmoilHandler} from '../../turmoil/TurmoilHandler';

export class GMOContract extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.GMO_CONTRACT,
      tags: [Tags.MICROBE, Tags.SCIENCE],
      cost: 3,

      requirements: CardRequirements.builder((b) => b.party(PartyName.GREENS)),
      metadata: {
        description: 'Requires that Greens are ruling or that you have 2 delegates there.',
        cardNumber: 'T06',
        renderData: CardRenderer.builder((b) => {
          b.effect('Each time you play a plant, animal or microbe tag, including this, gain 2MC.', (be) => {
            be.animals(1).played.slash().plants(1).played.slash().microbes(1).played;
            be.startEffect.megacredits(2);
          });
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    const turmoil = player.game.turmoil;
    if (turmoil !== undefined) {      
      if (turmoil.parties.find((p) => p.name === PartyName.GREENS)) {
        return turmoil.canPlay(player, PartyName.GREENS);
      }
      return player.canAfford(player.getCardCost(this) + SOCIETY_ADDITIONAL_CARD_COST);
    }
    return false;
  }

  public onCardPlayed(player: Player, card: IProjectCard): void {
    const amount = card.tags.filter((tag) => tag === Tags.ANIMAL || tag === Tags.PLANT || tag === Tags.MICROBE).length;
    if (amount > 0) {
      player.game.defer(
        new DeferredAction(player, () => {
          player.setResource(Resources.MEGACREDITS, amount * 2);
          return undefined;
        }),
      );
    }
  }

  public play(player: Player) {
    TurmoilHandler.handleSocietyPayment(player, PartyName.SCIENTISTS);
    return undefined;
  }
}
