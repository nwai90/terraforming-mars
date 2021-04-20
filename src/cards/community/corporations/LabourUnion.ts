import {CorporationCard} from '../../corporation/CorporationCard';
import {Tags} from '../../Tags';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {Player} from '../../../Player';
import {DiscardCards} from '../../../deferredActions/DiscardCards';
import {Size} from '../../render/Size';

export class LabourUnion extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.LABOUR_UNION,
      tags: [Tags.BUILDING],
      startingMegaCredits: 55,

      metadata: {
        cardNumber: 'R51',
        description: 'You start with 55 MC.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(55);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.plate('Standard projects').startEffect.megacredits(-4);
            });
            ce.vSpace();
            ce.effect('Standard Projects cost 4 MC less. At generation end, discard down to 6 cards.', (eb) => {
              eb.cards(1).startEffect.text('MAX 6 AT GEN END', Size.SMALL);
            });
            ce.vSpace(Size.SMALL);
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public onProductionPhase(player: Player) {
    if (player.cardsInHand.length > 6) {
      const cardsToDiscard: number = player.cardsInHand.length - 6;
      player.game.defer(new DiscardCards(player, cardsToDiscard));
    }
    return undefined;
  }
}
