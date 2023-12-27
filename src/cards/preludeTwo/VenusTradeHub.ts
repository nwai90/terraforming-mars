import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {CardRequirements} from '../CardRequirements';

export class VenusTradeHub extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.VENUS_TRADE_HUB,
      tags: [Tags.VENUS, Tags.SPACE],
      cost: 12,
      requirements: CardRequirements.builder((b) => b.tag(Tags.VENUS, 2)),

      metadata: {
        cardNumber: '??',
        description: 'Requires 2 Venus tags.',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you trade, gain 3 M€.', (eb) => {
            eb.trade().startEffect.megacredits(3);
          });
        }),
        victoryPoints: 1,
      },
    });
  }

  public play() {
    return undefined;
  }

  public getVictoryPoints(): number {
    return 1;
  }
}
