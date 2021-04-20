import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {Game} from '../../Game';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {PlaceHazardTile} from '../../deferredActions/PlaceHazardTile';
import {ISpace} from '../../boards/ISpace';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class Athena extends Card implements CorporationCard {
    constructor() {
      super({
          cardType: CardType.CORPORATION,
          name: CardName.ATHENA,
          tags: [Tags.EARTH],
          initialActionText: 'Place 2 hazard tiles adjacent to no other tiles.',
          startingMegaCredits: 62,
    
          metadata: {
            cardNumber: 'R52',
            description: 'You start with 62 MC. As your first action, place 2 hazard tiles adjacent to no other tiles.',
            renderData: CardRenderer.builder((b) => {
              b.megacredits(62).hazardTile(2);
              b.corpBox('effect', (ce) => {
                ce.vSpace(Size.SMALL);
                ce.effect('You do not lose production when placing adjacent to hazard tiles.', (eb) => {
                  eb.startEffect.hazardTile().asterix();
                });
              });
            }),
          },
        });
    }

    public play(player: Player) {
      player.game.athenaOwner = player.id;
      return undefined;
    }

    public initialAction(player: Player) {
      const game = player.game;
      const title = 'Select space next to no other tile for hazard';

      if (game.gameOptions.aresExtension) {
        game.defer(new PlaceHazardTile(player, game, title, this.getAvailableSpaces(player, game)));
        game.defer(new PlaceHazardTile(player, game, title, this.getAvailableSpaces(player, game)));
      }

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
}
