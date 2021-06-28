import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {PlayProjectCard} from '../../deferredActions/PlayProjectCard';

export class Xavier extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.XAVIER,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L24',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().wildTag(2).played;
        }),
        description: 'Once per game, gain 2 temporary wild tags and immediately play a card from hand.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.cardsInHand.length > 0 && this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    player.game.defer(new PlayProjectCard(player));
    player.game.defer(new DeferredAction(player, () => {
      this.isDisabled = true;
      return undefined;
    }));
    return undefined;
  }
}
