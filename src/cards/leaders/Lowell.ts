import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {SelectCard} from '../../inputs/SelectCard';
import {IProjectCard} from '../IProjectCard';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';

export class Lowell extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.LOWELL,
      cardType: CardType.LEADER,
      tags: [Tags.WILDCARD],
      metadata: {
        cardNumber: 'L12',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().megacredits(8).colon().text('CHANGE LEADER').asterix();
          b.br.br;
        }),
        description: 'Once per game, pay 8 M€ to draw 3 Leader cards and choose one to play. Discard this card.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.canAfford(8) && this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    const cardsDrawn: Array<IProjectCard> = [];

    for (let i = 0; i < 3; i++) {
      cardsDrawn.push(player.game.dealer.dealLeaderCard());
    }

    player.game.defer(new SelectHowToPayDeferred(player, 8));
    this.isDisabled = true;

    return new SelectCard('Choose leader card to play', 'Play', cardsDrawn, (foundCards: Array<IProjectCard>) => {
      const cardIndex = player.playedCards.findIndex((c) => c.name === this.name);
      player.playedCards.splice(cardIndex, 1);

      return player.playCard(foundCards[0]);
    });
  }
}
