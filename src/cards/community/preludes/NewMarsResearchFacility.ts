import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {SelectCard} from '../../../inputs/SelectCard';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {Resources} from '../../../Resources';

export class NewMarsResearchFacility extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.NEW_MARS_RESEARCH_FACILITY,

      metadata: {
        cardNumber: 'Y25',
        renderData: CardRenderer.builder((b) => {
          b.cards(6).colon().megacredits(3).asterix();
        }),
        description: 'Draw 6 cards and keep any number of them. For each card discarded this way, gain 3 M€.',
      },
    });
  }

  public play(player: Player) {
    const game = player.game;
    const dealtCards: IProjectCard[] = [];
    for (let i = 0; i < 6; i++) dealtCards.push(game.dealer.dealCard(game));

    game.defer(new DeferredAction(player, () => {
      return new SelectCard('Select cards to keep', 'Keep cards', dealtCards, (foundCards: Array<IProjectCard>) => {
        game.log('${0} kept ${1} cards', (b) => b.player(player).number(foundCards.length));
        foundCards.forEach((card) => {
          dealtCards.splice(dealtCards.indexOf(card), 1);
          player.cardsInHand.push(card);
        });
        return undefined;
      }, {min: 0, max: dealtCards.length});
    }));

    game.defer(new DeferredAction(player, () => {
      player.addResource(Resources.MEGACREDITS, dealtCards.length * 3, {log: true});
      return undefined;
    }));

    return undefined;
  }
}
