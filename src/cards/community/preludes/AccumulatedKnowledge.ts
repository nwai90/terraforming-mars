import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {Tags} from '../../Tags';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectCard} from '../../../inputs/SelectCard';
import {SelectOption} from '../../../inputs/SelectOption';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {CardRenderer} from '../../render/CardRenderer';

export class AccumulatedKnowledge extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.ACCUMULATED_KNOWLEDGE,
        tags: [Tags.SCIENCE],

        metadata: {
          cardNumber: 'Y08',
          renderData: CardRenderer.builder((b) => {
            b.cards(4).br;
            b.minus().cards(1).nbsp.plus().cards(1)
          }),
          description: 'Draw 4 cards. You may discard a card to draw a card.',
        },
      });
    }

    public play(player: Player, game: Game) {
      player.drawCard(4);

      game.defer(new DeferredAction(player, () => new OrOptions(
        new SelectCard('Discard a card to draw a card', 'Discard', player.cardsInHand, (foundCards: Array<IProjectCard>) => {
          player.cardsInHand.splice(player.cardsInHand.indexOf(foundCards[0]), 1);
          game.dealer.discard(foundCards[0]);
          player.cardsInHand.push(game.dealer.dealCard());
          return undefined;
        }),
        new SelectOption('Do nothing', 'Confirm', () => {
          return undefined;
        }),
      )));

      return undefined;
    }
}

