import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {Tags} from '../../Tags';
import {PlaceCityTile} from '../../../deferredActions/PlaceCityTile';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';
import {PlaceGreeneryTile} from '../../../deferredActions/PlaceGreeneryTile';
import {CardRenderer} from '../../render/CardRenderer';
import {AltSecondaryTag} from '../../render/CardRenderItem';

export class FortifiedOutpost extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.FORTIFIED_OUTPOST,
        tags: [Tags.CITY],

        metadata: {
          cardNumber: 'Y11',
          renderData: CardRenderer.builder((b) => {
            b.city().greenery().secondaryTag(AltSecondaryTag.OXYGEN).br;
            b.minus().megacredits(10);
          }),
          description: 'Place a city tile. Place a greenery tile. Pay 10 MC.',
        },
      });
    }

    public canPlay(player: Player) {
      return player.canAfford(10);
    }

    public play(player: Player, game: Game) {
      game.defer(new PlaceCityTile(player));
      game.defer(new PlaceGreeneryTile(player));
      game.defer(new SelectHowToPayDeferred(player, 10, {title: 'Select how to pay for prelude'}));
      return undefined;
    }
}

