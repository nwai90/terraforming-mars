import {Player} from '../Player';
import {Tags} from '../cards/Tags';
import {IProjectCard} from '../cards/IProjectCard';
import {DeferredAction, Priority} from './DeferredAction';
import {SelectCard} from '../inputs/SelectCard';
import {ResourceType} from '../ResourceType';
import {CardType} from '../cards/CardType';
import {SelectHowToPayDeferred} from './SelectHowToPayDeferred';
import {LogHelper} from '../LogHelper';
import {Aerotech} from '../cards/community/corporations/Aerotech';
import {Phase} from '../Phase';

export enum LogType {
  DREW = 'drew',
  KEPT = 'kept',
  DRAFTED = 'drafted',
  BOUGHT = 'bought',
  SOLD = 'sold',
  DREW_VERBOSE = 'drew_verbose',
}

export class DrawCards<T extends undefined | SelectCard<IProjectCard>> implements DeferredAction {
  public priority = Priority.DRAW_CARDS;
  private constructor(
    public player: Player,
    public count: number = 1,
    public options: DrawCards.AllOptions = {},
    public cb: (cards: Array<IProjectCard>) => T,
  ) { }

  public execute() : T {
    const game = this.player.game;
    const cards = game.dealer.drawProjectCardsByCondition(game, this.count, (card) => {
      if (this.options.resource !== undefined && this.options.resource !== card.resourceType) {
        return false;
      }
      if (this.options.cardType !== undefined && this.options.cardType !== card.cardType) {
        return false;
      }
      if (this.options.tag !== undefined && !card.tags.includes(this.options.tag)) {
        return false;
      }
      if (this.options.include !== undefined && !this.options.include(card)) {
        return false;
      }
      return true;
    });

    return this.cb(cards);
  };

  public static keepAll(player: Player, count: number = 1, options?: DrawCards.DrawOptions): DrawCards<undefined> {
    return new DrawCards(player, count, options, (cards) =>
      DrawCards.keep(player, cards, options === undefined ? LogType.DREW : LogType.DREW_VERBOSE));
  }

  public static keepSome(player: Player, count: number = 1, options: DrawCards.AllOptions): DrawCards<SelectCard<IProjectCard>> {
    return new DrawCards(player, count, options, (cards) => DrawCards.choose(player, cards, options));
  }

  public static keep(player: Player, cards: Array<IProjectCard>, logType: LogType = LogType.DREW): undefined {
    player.canUndoLastAction = false;
    player.cardsInHand.push(...cards);

    if (logType === LogType.DREW_VERBOSE) {
      LogHelper.logDrawnCards(player, cards);
    } else {
      // Hide the number of cards bought in draft from spectators
      let logOptions = player.game.phase === Phase.RESEARCH && logType === LogType.BOUGHT ? {reservedFor: player} : undefined;
      player.game.log('${0} ${1} ${2} card(s)', (b) => b.player(player).string(logType).number(cards.length), logOptions);

      if (cards.length > 0) LogHelper.logDrawnCards(player, cards, true, logType);
    }
    return undefined;
  }

  public static discard(player: Player, preserve: Array<IProjectCard>, discard: Array<IProjectCard>, options?: DrawCards.ChooseOptions) {
    discard.forEach((card) => {
      if (preserve.find((f) => f.name === card.name) === undefined) {
        player.game.dealer.discard(card);
        if (options !== undefined && options.logDiscardedCards === true) {
          player.game.log('${0} discarded ${1}', (b) => b.player(player).card(card));
        }
      }
    });
  }

  public static choose(player: Player, cards: Array<IProjectCard>, options: DrawCards.ChooseOptions): SelectCard<IProjectCard> {
    player.canUndoLastAction = false;

    let max = options.keepMax || cards.length;
    if (options.paying) {
      max = Math.min(max, Math.floor(player.spendableMegacredits() / player.cardCost));
    }
    const min = options.paying ? 0 : options.keepMax;
    const msg = DrawCards.getSelectCardTitle(options, max);
    const button = max === 0 ? 'Ok' : (options.paying ? 'Buy' : 'Select');
    const cb = (selected: Array<IProjectCard>) => {
      if (options.paying && selected.length > 0) {
        const cost = selected.length * player.cardCost;

        player.game.defer(
          new SelectHowToPayDeferred(player, cost, {
            title: `Select how to spend ${cost} M€ for ${selected.length} cards`,
            afterPay: () => {
              this.keep(player, selected, options.logDrawnCard ? LogType.DREW_VERBOSE : LogType.BOUGHT);
              this.discard(player, selected, cards, options);
              Aerotech.onDrawCards(player, cards, selected);
            },
          }));
      } else if (selected.length === 0 && cards.length === 1 && options.logDrawnCard === true) {
        // Leavitt colony: Log the discarded card
        player.game.log('${0} discarded ${1}', (b) => b.player(player).card(cards[0]));
        this.discard(player, selected, cards);
      } else {
        this.keep(player, selected, options.paying ? LogType.BOUGHT : LogType.DREW);
        this.discard(player, selected, cards);
        Aerotech.onDrawCards(player, cards, selected);
      }
      return undefined;
    };
    return new SelectCard(
      msg,
      button,
      cards,
      cb,
      {max, min},
    );
  }

  public static getSelectCardTitle(options: DrawCards.ChooseOptions, max: number): string {
    if (options.paying) {
      if (max === 0) return 'You cannot afford any cards';
      if (options.title !== undefined) return options.title;

      return 'Select card(s) to buy';
    } else {
      return `Select ${max} card(s) to keep`;
    }
  }
}

export namespace DrawCards {
  export interface DrawOptions {
    tag?: Tags,
    resource?: ResourceType,
    cardType?: CardType,
    include?: (card: IProjectCard) => boolean,
  }

  export interface ChooseOptions {
    keepMax?: number,
    logDrawnCard?: boolean,
    paying?: boolean,
    logDiscardedCards?: boolean,
    title?: string,
  }

  export interface AllOptions extends DrawOptions, ChooseOptions { }
}
