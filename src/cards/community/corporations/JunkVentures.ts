import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRenderItemSize} from '../../render/CardRenderItemSize';
import {Card} from '../../Card';
import {SelectCardToKeep} from '../../../deferredActions/SelectCardToKeep';
import {LogHelper} from '../../../LogHelper';

export class JunkVentures extends Card implements CorporationCard {
    constructor() {
      super({
        cardType: CardType.CORPORATION,
        name: CardName.JUNK_VENTURES,
        tags: [],
        initialActionText: 'Discard the top 3 cards of the deck',
        startingMegaCredits: 40,

        metadata: {
          cardNumber: 'R49',
          description: 'You start with 40 MC. As your first action, discard the top 3 cards of the deck.',
          renderData: CardRenderer.builder((b) => {
            b.br.br;
            b.megacredits(40).text('DECK: ').minus().cards(3);
            b.corpBox('action', (cb) => {
              cb.text('ACTION: SHUFFLE THE DISCARD PILE, THEN DRAW 3 CARDS. KEEP ONE AND DISCARD THE OTHER TWO.', CardRenderItemSize.SMALL, true);
            });
          }),
        },
      });
    }

    public play() {
      return undefined;
    }

    public initialAction(player: Player) {
      const discardedCards = new Set<CardName>();

      for (let i = 0; i < 3; i++) {
        const card = player.game.dealer.dealCard(player.game);
        player.game.dealer.discard(card);
        discardedCards.add(card.name);
      }

      LogHelper.logDiscardedCards(player.game, Array.from(discardedCards));
      return undefined;
    }

    public canAct(player: Player): boolean {
      return player.game.dealer.getDiscardedSize() >= 3;
    }

    public action(player: Player) {
      const game = player.game;
      const dealer = game.dealer;
      dealer.discarded = dealer.shuffleCards(dealer.discarded);

      const drawnCards = dealer.discarded.splice(0, 3);
      game.defer(new SelectCardToKeep(player, 'Select card to take into hand', drawnCards));
      return undefined;
    }
}
