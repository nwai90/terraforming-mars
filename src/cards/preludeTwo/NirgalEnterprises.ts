import {Player} from '../../Player';
import {CorporationCard} from '../corporation/CorporationCard';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {Size} from '../render/Size';
import {Units} from '../../Units';

export class NirgalEnterprises extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.NIRGAL_ENTERPRISES,
      tags: [Tags.ENERGY, Tags.PLANT, Tags.BUILDING],
      startingMegaCredits: 30,
      productionBox: Units.of({energy: 1, plants:1, steel: 1}),

      metadata: {
        cardNumber: '??',
        description: 'You start with 30 M€. Increase your energy, plant and steel production 1 step each.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(30).production((pb) => pb.energy(1).plants(1).steel(1)).nbsp();
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.SMALL);
            ce.text('AWARDS AND MILESTONES ALWAYS COST 0 M€ FOR YOU.', Size.SMALL);
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    player.addProduction(Resources.PLANTS, 1);
    player.addProduction(Resources.STEEL, 1);
    return undefined;
  }
}
