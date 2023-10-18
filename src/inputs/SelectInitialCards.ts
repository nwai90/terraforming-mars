import {AndOptions} from './AndOptions';
import {CorporationCard} from '../cards/corporation/CorporationCard';
import {IProjectCard} from '../cards/IProjectCard';
import {Player} from '../Player';
import {PlayerInput} from '../PlayerInput';
import {PlayerInputTypes} from '../PlayerInputTypes';
import {SelectCard} from './SelectCard';
import {LogType} from '../deferredActions/DrawCards';
import {LogHelper} from '../LogHelper';
import {Merger} from '../cards/promo/Merger';
import {CardName} from '../CardName';

export class SelectInitialCards extends AndOptions implements PlayerInput {
    public inputType = PlayerInputTypes.SELECT_INITIAL_CARDS;
    constructor(player: Player, cb: (corporation: CorporationCard) => undefined) {
      super(() => {
        cb(corporation);
        return undefined;
      });
      let corporation: CorporationCard;
      this.title = ' ';
      this.buttonLabel = 'Start';

      this.options.push(
        new SelectCard<CorporationCard>(
          'Select corporation', undefined, player.dealtCorporationCards,
          (foundCards: Array<CorporationCard>) => {
            corporation = foundCards[0];
            LogHelper.logDrawnCards(player, foundCards, true, LogType.KEPT);
            return undefined;
          },
        ),
      );

      const game = player.game;

      // Give each player Merger in this variant, or a 5th prelude if they already have Merger
      if (game.gameOptions.twoCorpsVariant) {
        if (!player.dealtPreludeCards.some((card) => card.name === CardName.MERGER)) {
          player.dealtPreludeCards.push(new Merger());
        } else {
          player.dealtPreludeCards.push(game.dealer.dealPreludeCard(game));
        }
      }

      if (game.gameOptions.preludeExtension) {
        this.options.push(
          new SelectCard(
            'Select 2 Prelude cards', undefined, player.dealtPreludeCards,
            (preludeCards: Array<IProjectCard>) => {
              player.preludeCardsInHand.push(...preludeCards);
              LogHelper.logDrawnCards(player, preludeCards, true, LogType.KEPT);
              return undefined;
            }, {min: 2, max: 2},
          ),
        );
      }

      if (game.gameOptions.leadersExpansion) {
        this.options.push(
          new SelectCard(
            'Select 1 Leader card', undefined, player.dealtLeaderCards,
            (leaderCards: Array<IProjectCard>) => {
              player.leaderCardsInHand.push(...leaderCards);
              LogHelper.logDrawnCards(player, leaderCards, true, LogType.KEPT);
              return undefined;
            },
          ),
        );
      }

      this.options.push(
        new SelectCard(
          'Select initial cards to buy', undefined, player.dealtProjectCards,
          (foundCards: Array<IProjectCard>) => {
            player.cardsInHand.push(...foundCards);
            LogHelper.logDrawnCards(player, foundCards, true, LogType.BOUGHT);
            return undefined;
          }, {min: 0, max: 10},
        ),
      );
    }
}
