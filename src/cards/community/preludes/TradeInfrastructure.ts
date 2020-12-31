import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardMetadata} from '../../CardMetadata';
import {CardRenderer} from '../../render/CardRenderer';

export class TradeInfrastructure extends PreludeCard implements IProjectCard {
    public tags = [Tags.ENERGY];
    public name = CardName.TRADE_INFRASTRUCTURE;

    public play(player: Player) {
      player.addProduction(Resources.ENERGY);
      player.setResource(Resources.ENERGY, 3);
      player.increaseFleetSize();

      return undefined;
    }
    
    public metadata: CardMetadata = {
      cardNumber: 'Y17',
      renderData: CardRenderer.builder((b) => {
        b.productionBox((pb) => pb.energy(1)).br;
        b.energy(3).tradeFleet();
      }),
      description: 'Increase your energy production 1 step. Gain 3 energy. Gain 1 trade fleet.',
    }
}

