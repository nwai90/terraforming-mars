import {Player} from '../../Player';
import {PreludeCard} from '../prelude/PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../CardName';
import {BuildColony} from '../../deferredActions/BuildColony';
import {Tags} from '../Tags';
import {PlaceCityTile} from '../../deferredActions/PlaceCityTile';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {CardRenderer} from '../render/CardRenderer';

export class StrategicBasePlanning extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.STRATEGIC_BASE_PLANNING,
        tags: [Tags.CITY, Tags.BUILDING, Tags.SPACE],

        metadata: {
          cardNumber: '??',
          renderData: CardRenderer.builder((b) => {
            b.colonies(1).city().br;
            b.minus().megacredits(3);
          }),
          description: 'Place a colony. Place a city tile. Pay 3 M€.',
        },
      });
    }

    public canPlay(player: Player) {
      return player.canAfford(3);
    }

    public play(player: Player) {
      const game = player.game;

      game.defer(new BuildColony(player, false, 'Select where to build colony'));
      game.defer(new SelectHowToPayDeferred(player, 3, {title: 'Select how to pay for prelude', afterPay: () => {
        game.defer(new PlaceCityTile(player));
      }}));

      return undefined;
    }
}

