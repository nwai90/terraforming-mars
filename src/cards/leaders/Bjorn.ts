import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Size} from '../render/Size';
import {Card} from '../Card';
import {CardType} from '../CardType';

export class Bjorn extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.BJORN,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L02',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.award().nbsp.colon().text('+2', Size.LARGE);
          b.br.br.br;
        }),
        description: 'You have +2 score for all awards.',
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
