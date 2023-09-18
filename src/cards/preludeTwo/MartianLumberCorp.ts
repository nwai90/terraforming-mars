import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {CardRequirements} from '../CardRequirements';
import {Tags} from '../Tags';
import {Units} from '../../Units';
import {Size} from '../render/Size';

export class MartianLumberCorp extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      tags: [Tags.BUILDING, Tags.PLANT],
      name: CardName.MARTIAN_LUMBER_CORP,
      cost: 6,
      productionBox: Units.of({plants: 1}),
      requirements: CardRequirements.builder((b) => b.greeneries(2)),
      metadata: {
        cardNumber: '??',
        description: 'Requires that you have 2 greenery tiles. Increase your plant production 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.effect('When playing a Building tag, plants may be used as 3 M€ each.', (eb) => {
            eb.building().played.startEffect.plants(1).nbsp(Size.TINY).equals().megacredits(3);
          });
          b.br.br;
          b.production((pb) => pb.plants(1));
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    return undefined;
  }
}
