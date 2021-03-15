import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';

export class Aristarchus extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ARISTARCHUS,
      tags: [Tags.VENUS, Tags.EARTH, Tags.JOVIAN],
      startingMegaCredits: 33,

      metadata: {
        cardNumber: 'R50',
        description: 'You start with 33 MC.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br.br.br;
          b.megacredits(33);
          b.corpBox('action', (ce) => {
            ce.vSpace();
            ce.action('If you have exactly 0 MC, gain 10 MC', (eb) => {
              eb.empty().startAction.megacredits(10).asterix();
            });
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.megaCredits === 0;
  }

  public action(player: Player) {
    player.megaCredits += 10;
    return undefined;
  }
}
