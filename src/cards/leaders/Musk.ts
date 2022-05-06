import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {DeferredAction, Priority} from '../../deferredActions/DeferredAction';
import {DrawCards} from '../../deferredActions/DrawCards';
import {SelectAmount} from '../../inputs/SelectAmount';
import {Resources} from '../../Resources';
import {SelectCard} from '../../inputs/SelectCard';
import {LogHelper} from '../../LogHelper';
import {IProjectCard} from '../IProjectCard';

export class Musk extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.MUSK,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L28',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().minus().cards(1).secondaryTag(Tags.EARTH).colon().cards(1).secondaryTag(Tags.SPACE).titanium(1).asterix();
          b.br;
          b.titanium(6);
          b.br.br;
        }),
        description: 'Once per game, discard any number of Earth cards to draw/gain that many Space cards and titanium. Gain 6 titanium.',
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
    const eligibleCards = player.cardsInHand.filter((card) => card.tags.includes(Tags.EARTH));
    const max = eligibleCards.length;

    return new SelectAmount(
      'Select number of Earth cards to discard',
      'Discard cards',
      (amount: number) => {
        const discardEarthCards = new DeferredAction(
          player,
          () => {
            if (amount === 0) return undefined;

            return new SelectCard(
              `Select ${amount} Earth card(s) to discard`,
              'Discard',
              eligibleCards,
              (foundCards: Array<IProjectCard>) => {
                for (const card of foundCards) {
                  player.cardsInHand.splice(player.cardsInHand.indexOf(card), 1);
                  player.game.dealer.discard(card);
                }
                LogHelper.logPlayerDiscardedCards(player, foundCards);
                return undefined;
              },
              {min: amount, max: amount})
          },
        )

        player.game.defer(discardEarthCards, Priority.DISCARD_BEFORE_DRAW);
        player.game.defer(DrawCards.keepAll(player, amount, {tag: Tags.SPACE}));
        player.addResource(Resources.TITANIUM, 6 + amount);
        this.isDisabled = true;
        return undefined;
      },
      0,
      max,
    );
  }
}
