import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {CardRenderer} from '../../render/CardRenderer';
import {DeferredAction} from '../../../deferredActions/DeferredAction';

export class GamblingHouse extends PreludeCard {
    constructor() {
      super({
        name: CardName.GAMBLING_HOUSE,

        metadata: {
          cardNumber: 'Y19',
          renderData: CardRenderer.builder((b) => {
            b.prelude().br.br.megacredits(5);
          }),
          description: 'Draw and play another prelude card. Gain 5 MC.',
        },
      });
    }

    public play(player: Player, game: Game) {
      player.megaCredits += 5;
      const preludeCard = game.dealer.dealPreludeCard();

      if (preludeCard.canPlay === undefined || preludeCard.canPlay(player, game)) {
        game.defer(new DeferredAction(player, () => player.playCard(game, preludeCard)));
      } else {
        game.dealer.discard(preludeCard);
        game.log('${0} discarded ${1}', (b) => b.player(player).card(preludeCard));
      }

      return undefined;
    }
}
