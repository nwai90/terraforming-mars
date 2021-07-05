import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {SpaceBonus} from '../../../SpaceBonus';
import {ISpace} from '../../../boards/ISpace';
import {SelectSpace} from '../../../inputs/SelectSpace';
import {SpaceType} from '../../../SpaceType';
import {Units} from '../../../Units';
import {AltSecondaryTag} from '../../render/CardRenderItem';

export class GroundwaterMohole extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.GROUNDWATER_MOHOLE,
      tags: [Tags.BUILDING],
      productionBox: Units.of({steel: 1}),

      metadata: {
        cardNumber: 'Y24',
        renderData: CardRenderer.builder((b) => {
          b.oceans(1).secondaryTag(AltSecondaryTag.STEEL_RESOURCE).asterix().br;
          b.production((pb) => pb.steel(1));
          b.heat(3);
        }),
        description: 'Place an ocean tile on an area where you gain steel as a placement bonus. Increase your steel production 1 step. Gain 3 heat.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.STEEL);
    player.addResource(Resources.HEAT, 3);

    const spaces = player.game.board.getAvailableSpacesOnLand(player)
      .concat(player.game.board.getAvailableSpacesForOcean(player))
      .filter((space) => space.bonus.includes(SpaceBonus.STEEL));

    return new SelectSpace('Select a space with a steel placement bonus to place an ocean', spaces, (foundSpace: ISpace) => {
      player.game.addOceanTile(player, foundSpace.id, SpaceType.LAND);
      return undefined;
    });
  }
}
