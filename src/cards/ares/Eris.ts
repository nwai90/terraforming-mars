import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {Game} from '../../Game';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {ARES_CARD_MANIFEST} from './AresCardManifest';
import {PlaceHazardTile} from '../../deferredActions/PlaceHazardTile';
import {ISpace} from '../../boards/ISpace';
import {SelectOption} from '../../inputs/SelectOption';
import {OrOptions} from '../../inputs/OrOptions';
import {HAZARD_TILES} from '../../ares/AresHandler';
import {SelectSpace} from '../../inputs/SelectSpace';
import {LogHelper} from '../../LogHelper';

export class Eris implements CorporationCard {
    public name: CardName = CardName.ERIS;
    public tags: Array<Tags> = [Tags.BUILDING];
    public startingMegaCredits: number = 46;
    public cardType: CardType = CardType.CORPORATION;

    public play() {
      return undefined;
    }

    public initialAction(player: Player, game: Game) {
      if (game.gameOptions.aresExtension) {
        this.drawAresCard(player, game);
      }

      return undefined;
    }

    public canAct(player: Player, game: Game): boolean {
      const availableSpaces = this.getAvailableSpaces(player, game);
      const hazardSpaces = this.getAllUnprotectedHazardSpaces(game);

      if (availableSpaces.length === 0 && hazardSpaces.length === 0) return false;
      return true;
    }

    public action(player: Player, game: Game) {
      const orOptions = new OrOptions();
      const availableSpaces = this.getAvailableSpaces(player, game);
      const hazardSpaces = this.getAllUnprotectedHazardSpaces(game);

      if (availableSpaces.length > 0) {
        orOptions.options.push(new SelectOption('Place a hazard tile adjacent to no other tile', 'Select', () => {
          const title = 'Select space next to no other tile for hazard';
          game.defer(new PlaceHazardTile(player, game, title, availableSpaces));
          return undefined;
        }));
      }

      if (hazardSpaces.length > 0) {
        orOptions.options.push(new SelectOption('Remove a hazard tile to gain 1 TR', 'Select', () => {
          return new SelectSpace(
              'Select hazard tile to remove',
              this.getAllUnprotectedHazardSpaces(game),
              (space: ISpace) => {
                space.tile = undefined;
                player.increaseTerraformRating(game);
                LogHelper.logTRIncrease(game, player, 1);
                return undefined;
              },
          );
        }));
      }

      if (orOptions.options.length === 1) return orOptions.options[0].cb();
      return orOptions;
    }

    private drawAresCard(player: Player, game: Game) {
      const drawnCard = game.drawProjectCardsByCondition(1, (card) => ARES_CARD_MANIFEST.projectCards.findByCardName(card.name) !== undefined);
      player.cardsInHand.push(...drawnCard);
      LogHelper.logDrawnCards(game, player, drawnCard);

      return undefined;
    }

    private getAvailableSpaces(player: Player, game: Game): Array<ISpace> {
      return game.board.getAvailableSpacesOnLand(player)
          .filter(((space) => space.tile === undefined))
          .filter((space) => {
            const adjacentSpaces = game.board.getAdjacentSpaces(space);
            return adjacentSpaces.filter((space) => space.tile !== undefined).length === 0;
          });
    }

    private getAllUnprotectedHazardSpaces(game: Game): Array<ISpace> {
      return game.board.spaces.filter(
          (space) => space.tile && HAZARD_TILES.includes(space.tile.tileType) && space.tile.protectedHazard === false,
      );
    }
}
