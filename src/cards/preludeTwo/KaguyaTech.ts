import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {Tags} from '../Tags';
import {Board} from '../../boards/Board';
import {ISpace} from '../../boards/ISpace';
import {SelectSpace} from '../../inputs/SelectSpace';
import {LogHelper} from '../../LogHelper';

export class KaguyaTech extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      tags: [Tags.CITY, Tags.PLANT],
      name: CardName.KAGUYA_TECH,
      cost: 10,

      metadata: {
        cardNumber: '??',
        description: 'Increase your M€ production 2 steps. Draw 1 card. Remove 1 of your greenery tiles (does not affect oxygen). Place a city there, regardless of other nearby cities. Collect placement bonuses as usual.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2)).cards(1);
          b.br.br;
          b.minus().greenery().plus().city();
        }),
      },
    });
  }

  public canPlay(player: Player) {
    const greenerySpaces = player.game.board.spaces.filter((space) => Board.isGreenerySpace(space) && space.player === player);
    return greenerySpaces.length > 0;
  }

  public play(player: Player) {
    const game = player.game;
    player.addProduction(Resources.MEGACREDITS, 2);
    player.drawCard(1);

    const greenerySpaces = game.board.spaces.filter((space) => Board.isGreenerySpace(space) && space.player === player);

    return new SelectSpace('Select greenery tile to replace with a city', greenerySpaces, (space: ISpace) => {
      player.game.removeTile(space.id);
      LogHelper.logBoardTileAction(player, space, 'greenery tile', 'removed');
      player.game.addCityTile(player, space.id, space.spaceType);
      return undefined;
    });
  }
}
