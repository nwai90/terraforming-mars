import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {ResourceType} from '../../ResourceType';
import {IResourceCard, ICard} from '../ICard';

export class MeatIndustry extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.MEAT_INDUSTRY,
      tags: [Tags.BUILDING],
      cost: 5,

      metadata: {
        cardNumber: 'X25',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you gain an animal to ANY CARD, gain 2 M€.', (eb) => {
            eb.animals(1).asterix().startEffect.megacredits(2);
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public static onResourceAdded(player: Player, card: IResourceCard & ICard, count: number): void {
    if (card.resourceType === ResourceType.ANIMAL && player.cardIsInEffect(CardName.MEAT_INDUSTRY)) {
      player.addResource(Resources.MEGACREDITS, count * 2, {log: true});
    }
  }
}
