import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';

export class Lowell extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.LOWELL,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L12',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.wildTag().played;
          b.br.br;
        }),
        description: 'Gain a wild tag.',
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
