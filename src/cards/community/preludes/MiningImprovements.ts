import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';
import {Units} from '../../../Units';

export class MiningImprovements extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MINING_IMPROVEMENTS,
      tags: [Tags.SCIENCE, Tags.BUILDING],
      productionBox: Units.of({steel: 1, titanium: 1}),

      metadata: {
        cardNumber: 'Y28',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.steel(1).titanium(1));
          b.megacredits(-2);
        }),
        description: 'Increase your steel and titanium production 1 step each. Pay 2 M€.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.STEEL);
    player.addProduction(Resources.TITANIUM);
    player.game.defer(new SelectHowToPayDeferred(player, 2));
    return undefined;
  }
}
