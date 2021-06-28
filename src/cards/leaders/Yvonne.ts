import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ProductiveOutpost} from '../colonies/ProductiveOutpost';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {Size} from '../render/Size';

export class Yvonne extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.YVONNE,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L25',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('GAIN ALL YOUR COLONY BONUSES TWICE', Size.SMALL);
        }),
        description: 'Once per game, gain all your colony bonuses twice.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    if (player.game.gameOptions.coloniesExtension === false) return false;
    return this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    player.game.defer(new DeferredAction(player, () => {
      ProductiveOutpost.giveAllColonyBonuses(player);
      ProductiveOutpost.giveAllColonyBonuses(player);
      this.isDisabled = true;
      return undefined;
    }));

    return undefined;
  }
}
