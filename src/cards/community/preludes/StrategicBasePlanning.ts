import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {BuildColony} from '../../../deferredActions/BuildColony';
import {Tags} from '../../Tags';
import {PlaceCityTile} from '../../../deferredActions/PlaceCityTile';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';
import {CardMetadata} from '../../CardMetadata';
import {CardRenderer} from '../../render/CardRenderer';

export class StrategicBasePlanning extends PreludeCard implements IProjectCard {
    public tags = [Tags.BUILDING];
    public name = CardName.STRATEGIC_BASE_PLANNING;

    public canPlay(player: Player) {
      return player.canAfford(6);
    }

    public play(player: Player, game: Game) {
      game.defer(new BuildColony(player, game, false, 'Select where to build colony'));
      game.defer(new SelectHowToPayDeferred(player, 6, false, false, 'Select how to pay for prelude', () => {
        game.defer(new PlaceCityTile(player, game));
      }));

      return undefined;
    }

    public metadata: CardMetadata = {
      cardNumber: 'Y16',
      renderData: CardRenderer.builder((b) => {
        b.colonies(1).greenery().br;
        b.minus().megacredits(6);
      }),
      description: 'Place a colony. Place a city tile. Pay 6 MC.',
    }
}

