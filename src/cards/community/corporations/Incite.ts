import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {SendDelegateToArea} from '../../../deferredActions/SendDelegateToArea';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';
import {Card} from '../../Card';
import {Turmoil} from '../../../turmoil/Turmoil';

export class Incite extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.INCITE,
      tags: [Tags.SCIENCE],
      initialActionText: 'Place 2 delegates in one party',
      startingMegaCredits: 32,

      metadata: {
        cardNumber: 'R37',
        description: 'You start with 32 M€. As your first action, place two delegates in one party.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(32).nbsp.delegates(2);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.startEffect.influence(1);
            });
            ce.vSpace(Size.SMALL);
            ce.effect('You have +1 influence. When you send a delegate using the lobbying action, you pay 2 M€ less for it.', (eb) => {
              eb.delegates(1).startEffect.megacredits(-2);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    Turmoil.getTurmoil(player.game).addInfluenceBonus(player);
    return undefined;
  }

  public initialAction(player: Player) {
    const title = 'Incite first action - Select where to send two delegates';
    player.game.defer(new SendDelegateToArea(player, title, {count: 2, source: 'reserve'}));

    return undefined;
  }
}
