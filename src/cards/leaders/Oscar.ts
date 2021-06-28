import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';

export class Oscar extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.OSCAR,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L15',
        renderData: CardRenderer.builder((b) => {
          b.plus().influence(1);
        }),
        description: 'You have +1 influence.',
      },
    });
  }

  public play(player: Player) {
    const turmoil = player.game.turmoil;
    if (turmoil) turmoil.addInfluenceBonus(player);
    return undefined;
  }

  public canAct(): boolean {
   return false;
  }

  public action(): PlayerInput | undefined {
    return undefined;
  }
}
