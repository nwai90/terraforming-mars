import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Size} from '../render/Size';

export class Tate extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.TATE,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L20',
        renderData: CardRenderer.builder((b) => {
          b.vpIcon(1).slash(Size.LARGE).cityTag().played;
          b.br;
        }),
        description: 'Gain 1 VP for each city tag.',
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
