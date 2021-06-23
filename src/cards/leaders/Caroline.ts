import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardType} from '../CardType';

export class Caroline extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.CAROLINE,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L03',
        renderData: CardRenderer.builder((b) => {
          b.text('X+2').plants(1).heat(1).asterix();
        }),
        description: 'Once per game, gain plants and heat equal to your production +2.',
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
    player.addResource(Resources.PLANTS, player.getProduction(Resources.PLANTS) + 2, {log: true});
    player.addResource(Resources.HEAT, player.getProduction(Resources.HEAT) + 2, {log: true});
    this.isDisabled = true;

    return undefined;
  }
}
