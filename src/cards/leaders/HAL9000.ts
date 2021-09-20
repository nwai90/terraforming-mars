import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';

export class HAL9000 extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.HAL9000,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L08',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
          b.br.br;
          b.minus().text('EACH').production((pb) => pb.wild(1)).nbsp.colon().wild(3).digit.asterix();
          b.br;
        }),
        description: 'Once per game, decrease each of your productions 1 step to gain 3 of that resource.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(): boolean {
   return this.isDisabled === false;
  }
  
  public action(player: Player): PlayerInput | undefined {
    const decreasableProductions = [];
    if (player.getProduction(Resources.MEGACREDITS) > -5) decreasableProductions.push(Resources.MEGACREDITS);
    [Resources.STEEL, Resources.TITANIUM, Resources.PLANTS, Resources.ENERGY, Resources.HEAT].forEach((resource) => {
      if (player.getProduction(resource) > 0) decreasableProductions.push(resource);
    });

    decreasableProductions.forEach((production) => {
      player.addProduction(production, -1, {log: true});
      player.addResource(production, 3, {log: true});
    });

    this.isDisabled = true;
    return undefined;
  }
}
