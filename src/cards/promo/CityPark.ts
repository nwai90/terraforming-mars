import {IProjectCard} from './../IProjectCard';
import {Tags} from './../Tags';
import {Card} from '../Card';
import {CardType} from './../CardType';
import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {CardRequirements} from '../CardRequirements';

export class CityPark extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.CITY_PARK,
      tags: [Tags.PLANT],
      cost: 7,
      requirements: CardRequirements.builder((b) => b.cities(3)),

      metadata: {
        cardNumber: 'X??',
        renderData: CardRenderer.builder((b) => {
          b.plants(2);
        }),
        description: 'Requires that you have three cities in play. Gain 2 plants.',
        victoryPoints: 2,
      },
    });
  }

  public play(player: Player) {
    player.addResource(Resources.PLANTS, 2);
    return undefined;
  }

  public getVictoryPoints() {
    return 2;
  }
}
