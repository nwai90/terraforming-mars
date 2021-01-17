import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {BuildColony} from '../../../deferredActions/BuildColony';
import {Tags} from '../../Tags';
import {PlaceCityTile} from '../../../deferredActions/PlaceCityTile';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';
import {CardRenderer} from '../../render/CardRenderer';
import {AltSecondaryTag} from '../../render/CardRenderItem';

export class StrategicBasePlanning extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.STRATEGIC_BASE_PLANNING,
        tags: [Tags.BUILDING],

        metadata: {
          cardNumber: 'Y16',
          renderData: CardRenderer.builder((b) => {
            b.colonies(1).greenery().secondaryTag(AltSecondaryTag.OXYGEN).br;
            b.minus().megacredits(6);
          }),
          description: 'Place a colony. Place a city tile. Pay 6 MC.',
        },
      });
    }

    public canPlay(player: Player) {
      return player.canAfford(6);
    }

    public play(player: Player, game: Game) {
      game.defer(new BuildColony(player, false, 'Select where to build colony'));
      game.defer(new SelectHowToPayDeferred(player, 6, {title: 'Select how to pay for prelude', afterPay: () => {
        game.defer(new PlaceCityTile(player));
      }}));

      return undefined;
    }
}

