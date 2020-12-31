import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {Resources} from '../../../Resources';
import {SendDelegateToArea} from '../../../deferredActions/SendDelegateToArea';
import {CardMetadata} from '../../CardMetadata';
import {CardRenderer} from '../../render/CardRenderer';

export class ExperiencedMartians extends PreludeCard implements IProjectCard {
    public tags = [Tags.BUILDING];
    public name = CardName.EXPERIENCED_MARTIANS;

    public play(player: Player, game: Game) {
      player.addProduction(Resources.HEAT);
      player.addProduction(Resources.PLANTS);

      game.defer(new SendDelegateToArea(player, game, 'Select where to send 2 delegates', 2, undefined, undefined, false));

      return undefined;
    }

    public metadata: CardMetadata = {
      cardNumber: 'Y10',
      renderData: CardRenderer.builder((b) => {
        b.delegates(2).br;
        b.productionBox((pb) => {
          pb.plants(1).heat(1);
        });
      }),
      description: 'Place 2 delegates in any one party. Increase your plant and heat production 1 step.',
    }
}

