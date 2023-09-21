import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {GainResources} from '../../deferredActions/GainResources';
import {Resources} from '../../Resources';

export class MediaGroup extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.MEDIA_GROUP,
      tags: [Tags.EARTH],
      cost: 6,

      metadata: {
        cardNumber: '109',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play an event card, gain 3 M€.', (eb) => {
            eb.event().played.startEffect.megacredits(3);
          });
        }),
      },
    });
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    if (!player.cardIsInEffect(this.name)) return;

    if (card.cardType === CardType.EVENT) {
      player.game.defer(new GainResources(player, Resources.MEGACREDITS, {count: 3}));
    }
  }
  public play() {
    return undefined;
  }
}
