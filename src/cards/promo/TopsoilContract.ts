import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {CardRenderer} from '../render/CardRenderer';
import {ResourceType} from '../../ResourceType';
import {IResourceCard, ICard} from '../ICard';
import {Resources} from '../../Resources';

export class TopsoilContract extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.TOPSOIL_CONTRACT,
      tags: [Tags.MICROBE, Tags.EARTH],
      cost: 8,

      metadata: {
        cardNumber: 'X30',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you gain a microbe to ANY CARD, gain 1 M€.', (eb) => {
            eb.microbes(1).asterix().startEffect.megacredits(1);
          }).br;
          b.plants(3);
        }),
        description: 'Gain 3 plants.',
      },
    });
  }

  public play(player: Player) {
    player.plants += 3;
    return undefined;
  }

  public static onResourceAdded(player: Player, card: IResourceCard & ICard, count: number): void {
    if (card.resourceType === ResourceType.MICROBE && player.cardIsInEffect(CardName.TOPSOIL_CONTRACT)) {
      player.addResource(Resources.MEGACREDITS, count, {log: true});
    }
  }
}
