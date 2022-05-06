import {Player} from '../../Player';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {IProjectCard} from '../IProjectCard';
import {SelectCard} from '../../inputs/SelectCard';

export class NewPartner extends PreludeCard {
  constructor() {
    super({
      name: CardName.NEW_PARTNER,

      metadata: {
        cardNumber: 'P43',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(1)).prelude().asterix();
        }),
        description: 'Raise your M€ production 1 step. Immediately draw 2 prelude cards. Play 1 of them, and discard the other.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 1);

    const cardsDrawn: Array<IProjectCard> = [
      player.game.dealer.dealPreludeCard(),
      player.game.dealer.dealPreludeCard(),
    ];

    if (cardsDrawn.every((card) => card.canPlay !== undefined && card.canPlay(player) === false)) {
      player.game.log('${0} and ${1} were discarded as ${2} could not pay for both cards.', (b) => b.card(cardsDrawn[0]).card(cardsDrawn[1]).player(player));
      return undefined;
    }

    return new SelectCard('Choose prelude card to play', 'Play', cardsDrawn, (foundCards: Array<IProjectCard>) => {
      if (foundCards[0].canPlay === undefined || foundCards[0].canPlay(player)) {
        return player.playCard(foundCards[0]);
      } else {
        throw new Error('You cannot pay for this card');
      }
    });
  }
}
