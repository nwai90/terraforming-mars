import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {Resources} from '../../../Resources';
import {SendDelegateToArea} from '../../../deferredActions/SendDelegateToArea';
import {CardRenderer} from '../../render/CardRenderer';

export class ExperiencedMartians extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.EXPERIENCED_MARTIANS,
        tags: [Tags.BUILDING],

        metadata: {
          cardNumber: 'Y10',
          renderData: CardRenderer.builder((b) => {
            b.delegates(2).br;
            b.production((pb) => {
              pb.plants(1).heat(1);
            });
          }),
          description: 'Place 2 delegates in any one party. Increase your plant and heat production 1 step.',
        },
      });
    }

    public play(player: Player, game: Game) {
      player.addProduction(Resources.HEAT);
      player.addProduction(Resources.PLANTS);

      game.defer(new SendDelegateToArea(player, 'Select where to send 2 delegates', 2, undefined, undefined, false));

      return undefined;
    }
}

