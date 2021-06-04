import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {SelectSpace} from '../../inputs/SelectSpace';
import {TileType} from '../../TileType';
import {ISpace} from '../../boards/ISpace';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {ResearchOutpost} from '../base/ResearchOutpost';

export class PerseveranceLanding extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.PERSEVERANCE_LANDING,
      tags: [Tags.SPACE],
      cost: 1,

      metadata: {
        cardNumber: 'Z01',
        renderData: CardRenderer.builder((b) => {
          b.tile(TileType.PERSEVERANCE_LANDING, true).br;
        }),
        description: 'Place this tile NEXT TO NO OTHER TILE.',
      },
    });
  }
  
  public canPlay(player: Player): boolean {
    return ResearchOutpost.getAvailableSpaces(player).length > 0;
  }

  public play(player: Player) {
    return new SelectSpace('Select space for special tile', ResearchOutpost.getAvailableSpaces(player), (foundSpace: ISpace) => {
      player.game.addTile(player, foundSpace.spaceType, foundSpace, {tileType: TileType.PERSEVERANCE_LANDING});
      return undefined;
    });
  }
}
