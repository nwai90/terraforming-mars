import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {PreludeCard} from '../prelude/PreludeCard';
import {Tags} from '../Tags';
import {Size} from '../render/Size';

export class ColonyTradeHub extends PreludeCard {
  constructor() {
    super({
      name: CardName.COLONY_TRADE_HUB,
      tags: [Tags.SPACE],
      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(1));
          b.titanium(3);
          b.preludeBox('effect', (ce) => {
            ce.effect('When any colony is placed, gain 2 M€.', (eb) => {
              eb.colonies(1, Size.SMALL).any.startEffect.megacredits(2);
            });
          });
        }),
        description: 'Increase your energy production 1 step and gain 3 titanium.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    player.addResource(Resources.TITANIUM, 3);
    return undefined;
  }
}

