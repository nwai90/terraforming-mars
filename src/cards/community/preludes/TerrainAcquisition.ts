import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {LandClaim} from '../../base/LandClaim';
import {DeferredAction} from '../../../deferredActions/DeferredAction';

export class TerrainAcquisition extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.TERRAIN_ACQUISITION,

      metadata: {
        cardNumber: 'Y26',
        renderData: CardRenderer.builder((b) => {
          b.cards(3).secondaryTag(Tags.BUILDING).br;
          b.landClaimTile(4);
        }),
        description: 'Draw 3 building cards. Place 4 of your markers on non-reserved areas. Only you may place tiles there.',
      },
    });
  }

  public play(player: Player) {
    player.drawCard(3, {tag: Tags.BUILDING});

    for (let i = 0; i < 4; i++) {
      player.game.defer(new DeferredAction(player, () => {
        return LandClaim.selectSpaceForClaim(player);
      }));
    }

    return undefined;
  }
}
