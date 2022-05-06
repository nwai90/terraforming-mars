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
    const cardsDrawn: Array<IProjectCard> = [];

    for (let i = 0; i < player.game.generation; i++) {
      cardsDrawn.push(player.game.dealer.dealPreludeCard());
    }

    cardsDrawn.forEach((card) => {
      if (card.canPlay !== undefined && card.canPlay(player) === false ) {
        cardsDrawn.splice(cardsDrawn.indexOf(card), 1);
        player.game.log('${0} was discarded as ${1} could not afford to pay for it', (b) => b.card(card).player(player));
      }
    })

    if (cardsDrawn.length === 0) {
      player.game.log('${0} drew no playable prelude cards', (b) => b.player(player));
      return undefined;
    }

    return new SelectCard('Choose prelude card to play', 'Play', cardsDrawn, (foundCards: Array<IProjectCard>) => {
      if (foundCards[0].canPlay === undefined || foundCards[0].canPlay(player)) {
        this.isDisabled = true;
        return player.playCard(foundCards[0]);
      } else {
        throw new Error('You cannot pay for this card');
      }
    });
  }
}
