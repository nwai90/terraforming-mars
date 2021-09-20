import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {SelectCard} from '../../inputs/SelectCard';
import {IProjectCard} from '../IProjectCard';

export class Karen extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.KAREN,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L11',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('X').prelude().asterix();
        }),
        description: 'Once per game, draw Prelude cards equal to the current generation number and choose one to play.',
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
    let cardsDrawn: Array<IProjectCard> = [];

    for (let i = 0; i < player.game.generation; i++) {
      cardsDrawn.push(player.game.dealer.dealPreludeCard());
    }

    return new SelectCard('Choose prelude card to play', 'Play', cardsDrawn, (foundCards: Array<IProjectCard>) => {
      if (foundCards[0].canPlay === undefined || foundCards[0].canPlay(player)) {
        this.isDisabled = true;
        return player.playCard(foundCards[0]);
      } else {
        throw new Error('You cannot pay for this card');
      }
    }, 1, 1);
  }
}
