import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Resources} from '../../Resources';

export class Will extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.WILL,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L23',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.venusTag().played.colon().megacredits(3);
          b.br.br;
        }),
        description: 'When you play a Venus tag, gain 3 M€.',
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

  public onCardPlayed(player: Player, card: IProjectCard): void {
    const amount = card.tags.filter((tag) => tag === Tags.VENUS).length;
    if (amount > 0) player.addResource(Resources.MEGACREDITS, amount * 3, {log: true});
  }
}
