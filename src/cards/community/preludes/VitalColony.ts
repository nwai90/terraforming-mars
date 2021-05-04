import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {BuildColony} from '../../../deferredActions/BuildColony';
import {Resources} from '../../../Resources';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {ColonyName} from '../../../colonies/ColonyName';
import {CardRenderer} from '../../render/CardRenderer';

export class VitalColony extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.VITAL_COLONY,

        metadata: {
          cardNumber: 'Y18',
          renderData: CardRenderer.builder((b) => {
            b.colonies(1).colonyPlacementBonus().br;
            b.minus().megacredits(5);
          }),
          description: 'Place a colony. Gain its placement bonus a second time. Pay 5 M€.',
        },
      });
    }

    public play(player: Player) {
      const coloniesBeforeBuilding: ColonyName[] = [];
      const game = player.game;

      game.colonies.forEach((colony) => {
        if (colony.colonies.includes(player.id)) {
          coloniesBeforeBuilding.push(colony.name);
        }
      });

      game.defer(new BuildColony(player, false, 'Select where to build colony'));
      game.defer(new DeferredAction(player, () => {
        game.colonies.forEach((colony) => {
          if (colony.colonies.includes(player.id) && !coloniesBeforeBuilding.includes(colony.name)) {
            colony.giveBonus(player, colony.buildType, colony.buildQuantity[colony.colonies.length - 1], colony.buildResource);    
          }
        });

        return undefined;
      }));

      player.addResource(Resources.MEGACREDITS, -5);
      return undefined;
    }
}

