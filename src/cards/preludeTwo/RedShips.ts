import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../CardRequirements';
import {Size} from '../render/Size';
import {Player} from '../../Player';
import {Board} from '../../boards/Board';
import {Resources} from '../../Resources';

export class RedShips extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.RED_SHIPS,
      cost: 2,
      requirements: CardRequirements.builder((b) => b.oxygen(4)),

      metadata: {
        cardNumber: '??',
        description: 'Requires 4% oxygen.',
        renderData: CardRenderer.builder((b) => {
          b.action('Gain 1 M€ for each CITY AND SPECIAL TILE adjacent to oceans, regardless of their owner.', (eb) => {
            eb.empty().startAction.megacredits(1).slash().nbsp(Size.TINY).cityOrSpecialTile(1).any.oceans(1).asterix();
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct() {
    return true;
  }

  public action(player: Player) {
    const board = player.game.board;
    const allCityAndSpecialTileSpaces = board.getSpacesWithSpecialTiles().concat(board.spaces.filter((space) => Board.isCitySpace(space)));
    const eligibleTiles = allCityAndSpecialTileSpaces.filter((space) => board.getAdjacentSpaces(space).some((adjSpace) => Board.isOceanSpace(adjSpace)));

    player.addResource(Resources.MEGACREDITS, eligibleTiles.length, {log: true});

    return undefined;
  }
}
