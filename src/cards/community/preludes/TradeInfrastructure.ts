import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';

export class TradeInfrastructure extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.TRADE_INFRASTRUCTURE,
        tags: [Tags.ENERGY],

        metadata: {
          cardNumber: 'Y17',
          renderData: CardRenderer.builder((b) => {
            b.production((pb) => pb.energy(1)).br;
            b.energy(3).tradeFleet();
          }),
          description: 'Increase your energy production 1 step. Gain 3 energy. Gain 1 trade fleet.',
        },
      });
    }

    public play(player: Player) {
      player.addProduction(Resources.ENERGY);
      player.setResource(Resources.ENERGY, 3);
      player.increaseFleetSize();

      return undefined;
    }
}

