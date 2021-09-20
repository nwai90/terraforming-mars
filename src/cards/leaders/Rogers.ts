import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';

export class Rogers extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.ROGERS,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L18',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.venus(1).colon().megacredits(3);
          b.br.br;
        }),
        description: 'When you take an action that raises Venus, gain 3 M€ for each step.',
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
