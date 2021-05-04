import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {Resources} from '../../../Resources';

export class Hotsprings extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.HOTSPRINGS,
      tags: [Tags.BUILDING],
      startingMegaCredits: 45,

      metadata: {
        cardNumber: 'R48',
        description: 'You start with 45 M€ and 5 heat.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(45).heat(5);
          b.corpBox('action', (ce) => {
            ce.vSpace();
            ce.action('Increase your M€ production 1 step if your heat production was raised 1 step this generation, or 2 steps if it was raised more than 1 step this generation', (eb) => {
              eb.empty().startAction.production((pb) => pb.megacredits(1)).slash().production((pb) => pb.megacredits(2)).asterix();
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addResource(Resources.HEAT, 5);
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.heatProductionStepsIncreasedThisGeneration > 0;
  }

  public action(player: Player) {
    if (player.heatProductionStepsIncreasedThisGeneration === 1) {
      player.addProduction(Resources.MEGACREDITS, 1);
    } else if (player.heatProductionStepsIncreasedThisGeneration > 1) {
      player.addProduction(Resources.MEGACREDITS, 2);
    }

    return undefined;
  }
}
