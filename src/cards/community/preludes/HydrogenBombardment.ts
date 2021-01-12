import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';

export class HydrogenBombardment extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.HYDROGEN_BOMBARDMENT,
        tags: [Tags.VENUS, Tags.SPACE],

        metadata: {
          cardNumber: 'Y13',
          renderData: CardRenderer.builder((b) => {
            b.production((pb) => pb.titanium(1)).br;
            b.venus(1);
          }),
          description: 'Increase your titanium production 1 step. Raise Venus 1 step.',
        },
      });
    }

    public canPlay(player: Player) {
      return player.canAfford(3);
    }

    public play(player: Player, game: Game) {
      game.increaseVenusScaleLevel(player, 1);
      player.addProduction(Resources.TITANIUM);

      return undefined;
    }
}

