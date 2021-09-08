import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';

export class Zoe extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.ZOE,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L26',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.reds().megacredits(1).asterix();
          b.br.br;
        }),
        description: 'You are immune to Reds\' ruling policy. At the end of each generation, gain 1 M€.',
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
