import {Game} from '../Game';
import {Player} from '../Player';
import {SelectSpace} from '../inputs/SelectSpace';
import {ISpace} from '../boards/ISpace';
import {DeferredAction, Priority} from './DeferredAction';
import {_AresHazardPlacement} from '../ares/AresHazards';
import {LogHelper} from '../LogHelper';
import {TileType} from '../TileType';

export class PlaceHazardTile implements DeferredAction {
  public priority = Priority.DEFAULT;
  constructor(
        public player: Player,
        public game: Game,
        public title: string = 'Select space for hazard tile',
        public spaces: Array<ISpace> = [],
  ) {}

  public execute() {
    if (this.spaces.length === 0) {
      return undefined;
    }

    return new SelectSpace(this.title, this.spaces, (foundSpace: ISpace) => {
      const tileType = Math.floor(Math.random() * 2) === 0 ? TileType.DUST_STORM_MILD : TileType.EROSION_MILD;

      _AresHazardPlacement.putHazardAt(foundSpace, tileType);
      foundSpace.bonus.forEach((spaceBonus) => this.game.grantSpaceBonus(this.player, spaceBonus));
      LogHelper.logTilePlacement(this.player, foundSpace, tileType);

      return undefined;
    });
  }
}
