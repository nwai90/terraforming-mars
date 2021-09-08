import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';

export class VanAllen extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.VAN_ALLEN,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L22',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.text('MILESTONES: ').megacredits(0).asterix();
          b.br.br;
        }),
        description: 'You may claim milestones for free (you must still meet the requirements).',
      },
    });
  }

  public isDisabled = false;

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
