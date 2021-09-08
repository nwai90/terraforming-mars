import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';

export class Duncan extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.DUNCAN,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L04',
        renderData: CardRenderer.builder((b) => {
          b.vpIcon(4);
          b.br;
        }),
        description: 'Gain 4 VP.',
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
