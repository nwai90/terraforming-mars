import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Priority} from '../../deferredActions/DeferredAction';
import {DiscardCards} from '../../deferredActions/DiscardCards';
import {DrawCards} from '../../deferredActions/DrawCards';
import {SelectAmount} from '../../inputs/SelectAmount';

export class Ender extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.ENDER,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L05',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().minus().text('X').cards(1).plus().text('X').cards(1);
        }),
        description: 'Once per game, discard any number of cards to draw that same number of cards.',
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
    return new SelectAmount(
      'Select number of cards to discard',
      'Discard cards',
      (amount: number) => {
        player.game.defer(new DiscardCards(player, amount), Priority.DISCARD_BEFORE_DRAW);
        player.game.defer(DrawCards.keepAll(player, amount));
        this.isDisabled = true;
        return undefined;
      },
      1,
      player.cardsInHand.length,
    );
  }
}
