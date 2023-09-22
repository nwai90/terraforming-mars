import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {AltSecondaryTag} from '../render/CardRenderItem';
import {ICard} from '../ICard';
import {SelectCard} from '../../inputs/SelectCard';

export class Jane extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.JANE,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L40',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.opgArrow().text('RESET X-1').cards(1).secondaryTag(AltSecondaryTag.BLUE).asterix();
        }),
        description: 'Once per game, mark up to X-1 blue card actions as unused this generation, where X is the current generation number.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    const usedActionCards = this.getUsedActionCards(player);
    return this.isDisabled === false && usedActionCards.length > 0 && player.game.generation > 1;
  }

  public action(player: Player): undefined {
    const game = player.game;
    const resetCount = Math.min(game.generation - 1, this.getUsedActionCards(player).length);

    for (let i = 0; i < resetCount; i++) {
      game.defer(new DeferredAction(
        player,
        () => new SelectCard(
          'Select a blue card action to mark as unused',
          'Select',
          this.getUsedActionCards(player),
          (selected: ICard[]) => {
            player.actionsThisGeneration.delete(selected[0].name);
            return undefined;
          },
        ),
      ));
    }

    game.defer(new DeferredAction(player, () => {
      this.isDisabled = true;
      return undefined;
    }));

    return undefined;
  }

  private getUsedActionCards(player: Player): Array<ICard> {
    const result: Array<ICard> = [];

    for (const playedCard of player.playedCards) {
      if (playedCard.cardType === CardType.ACTIVE &&
        playedCard.action !== undefined &&
        playedCard.canAct !== undefined &&
        player.getActionsThisGeneration().has(playedCard.name)
      ) {
        result.push(playedCard);
      }
    }

    return result;
  }
}
