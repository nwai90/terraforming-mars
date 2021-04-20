import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';
import {Card} from '../../Card';

export class Midas extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.MIDAS,
      tags: [],
      startingMegaCredits: 120,

      metadata: {
        cardNumber: 'R41',
        description: 'You start with 120 MC. Lower your TR 7 steps.',
        renderData: CardRenderer.builder((b) => {
          b.vSpace(Size.LARGE).br;
          b.megacredits(120, Size.LARGE).nbsp.nbsp.nbsp;
          b.minus().tr(7);
        }),
      },
    });
  }

  public play(player: Player) {
    player.decreaseTerraformRatingSteps(7);
    return undefined;
  }
}
