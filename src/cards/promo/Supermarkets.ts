import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {CardRequirements} from '../CardRequirements';

export class Supermarkets extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.SUPERMARKETS,
      cost: 9,
      requirements: CardRequirements.builder((b) => b.cities(2).any()),

      metadata: {
        cardNumber: 'X??',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2));
        }),
        description: 'Requires two cities in play. Increase your M€ production 2 steps.',
        victoryPoints: 1,
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 2);
    return undefined;
  }

  public getVictoryPoints() {
    return 1;
  }
}
