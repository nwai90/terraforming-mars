import {CorporationCard} from './cards/corporation/CorporationCard';
import {IProjectCard} from './cards/IProjectCard';
import {ISerializable} from './ISerializable';
import {SerializedDealer} from './SerializedDealer';
import {CardFinder} from './CardFinder';
import {CardLoader} from './CardLoader';
import {CardName} from './CardName';
import {LogHelper} from './LogHelper';
import {Game} from './Game';

export class Dealer implements ISerializable<SerializedDealer> {
    public deck: Array<IProjectCard> = [];
    public preludeDeck: Array<IProjectCard> = [];
    public discarded: Array<IProjectCard> = [];
    public discardedPreludes: Array<IProjectCard> = [];
    public corporationCards: Array<CorporationCard> = [];
    public discardedCorporations: Array<CorporationCard> = [];
    public leaderDeck: Array<IProjectCard> = [];

    private constructor() { }

    public static newInstance(loader: CardLoader): Dealer {
      const dealer = new Dealer();

      dealer.deck = Dealer.shuffle(loader.getProjectCards());
      dealer.preludeDeck = Dealer.shuffle(loader.getPreludeCards());
      dealer.corporationCards = loader.getCorporationCards();
      dealer.leaderDeck = Dealer.shuffle(loader.getLeaderCards());
      return dealer;
    }

    public static shuffle<T>(cards: Array<T>): Array<T> {
      const deck: Array<T> = [];
      const copy = cards.slice();
      while (copy.length) {
        deck.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
      }
      return deck;
    }
    public discard(card: IProjectCard): void {
      this.discarded.push(card);
    }
    public discardCorporation(card: CorporationCard): void {
      this.discardedCorporations.push(card);
    }
    public discardPrelude(card: IProjectCard): void {
      this.discardedPreludes.push(card);
    }
    public dealCard(game: Game, isResearchPhase: boolean = false): IProjectCard {
      let result: IProjectCard | undefined;
      if (isResearchPhase) {
        result = this.deck.shift();
      } else {
        result = this.deck.pop();
      }

      if (result === undefined) {
        throw 'Unexpected empty deck';
      }

      if (this.deck.length === 0) {
        game.log('The discard pile has been shuffled to form a new deck.');
        this.deck = Dealer.shuffle(this.discarded);
        this.discarded = [];
      }

      return result;
    }

    public drawProjectCardsByCondition(game: Game, total: number, include: (card: IProjectCard) => boolean) {
      const result: Array<IProjectCard> = [];
      const discardedCards = new Set<CardName>();

      while (result.length < total) {
        if (discardedCards.size >= this.getDeckSize() + this.getDiscardedSize()) {
          game.log('discarded every card without match');
          break;
        }
        const projectCard = this.dealCard(game);
        if (include(projectCard)) {
          result.push(projectCard);
        } else {
          discardedCards.add(projectCard.name);
          this.discard(projectCard);
        }
      }
      if (discardedCards.size > 0) {
        LogHelper.logDiscardedCards(game, Array.from(discardedCards));
      }

      return result;
    }

    public dealPreludeCard(game: Game): IProjectCard {
      if (this.preludeDeck.length === 0) {
        game.log('The preludes discard pile has been shuffled to form a new deck.');
        this.preludeDeck = Dealer.shuffle(this.discardedPreludes);
        this.discardedPreludes = [];
      }

      const result: IProjectCard | undefined = this.preludeDeck.pop();
      if (result === undefined) {
        throw 'Unexpected empty prelude deck';
      }

      return result;
    }

    // Leader deck does not need discard and reshuffle mecanisms
    public dealLeaderCard(): IProjectCard {
      const result: IProjectCard | undefined = this.leaderDeck.pop();
      if (result === undefined) {
        throw 'Unexpected empty leader deck';
      }
      // All Leader cards are expected to subclass IProjectCard
      return result;
    }

    // Corporation deck does not need discard and reshuffle mecanisms
    public dealCorporationCard(): IProjectCard {
      const result: IProjectCard | undefined = this.corporationCards.pop() as IProjectCard;
      if (result === undefined) {
        throw 'Unexpected empty corporation deck';
      }
      // All Corporation cards are expected to subclass IProjectCard
      return result;
    }

    public getDeckSize(): number {
      return this.deck.length;
    }

    public getDiscardedSize(): number {
      return this.discarded.length;
    }

    public static deserialize(d: SerializedDealer): Dealer {
      const dealer = new Dealer();
      const cardFinder = new CardFinder();

      dealer.corporationCards = cardFinder.corporationCardsFromJSON(d.corporationCards);
      dealer.discardedCorporations = cardFinder.corporationCardsFromJSON(d.discardedCorporations);
      dealer.deck = cardFinder.cardsFromJSON(d.deck);
      dealer.discarded = cardFinder.cardsFromJSON(d.discarded);
      dealer.discardedPreludes = cardFinder.cardsFromJSON(d.discardedPreludes);
      dealer.preludeDeck = cardFinder.cardsFromJSON(d.preludeDeck);
      dealer.leaderDeck = cardFinder.cardsFromJSON(d.leaderDeck);
      return dealer;
    }

    public serialize(): SerializedDealer {
      return {
        corporationCards: this.corporationCards.map((c) => c.name),
        discardedCorporations: this.discardedCorporations.map((c) => c.name),
        deck: this.deck.map((c) => c.name),
        discarded: this.discarded.map((c) => c.name),
        discardedPreludes: this.discardedPreludes.map((c) => c.name),
        preludeDeck: this.preludeDeck.map((c) => c.name),
        leaderDeck: this.leaderDeck.map((c) => c.name),
      };
    }
}
