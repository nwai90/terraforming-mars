import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';

export class HAL9000 extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.HAL9000,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L08',
        renderData: CardRenderer.builder((b) => {
          b.vpIcon(1).slash().tr(8);
          b.br;
        }),
        description: 'Gain 1 VP for each set of 8 TR.',
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(): boolean {
   return false;
  }

  public action(): PlayerInput | undefined {
    return undefined;
  }
}
