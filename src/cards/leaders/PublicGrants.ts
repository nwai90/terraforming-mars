import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';

export class PublicGrants extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.PUBLIC_GRANTS,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L41',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(15);
          b.br;
        }),
        description: 'Gain 15 M€.',
      },
    });
  }

  public play(player: Player) {
    player.addResource(Resources.MEGACREDITS, 15, {log: true});
    return undefined;
  }
}
