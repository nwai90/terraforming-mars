import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {SpaceType} from '../../SpaceType';
import {Player} from '../../Player';
import {TileType} from '../../TileType';
import {ISpace} from '../../boards/ISpace';
import {SelectSpace} from '../../inputs/SelectSpace';
import {BoardName} from '../../boards/BoardName';
import {CardName} from '../../CardName';
import {MAX_TEMPERATURE, REDS_RULING_POLICY_COST} from '../../constants';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {IAdjacencyBonus} from '../../ares/IAdjacencyBonus';
import {CardMetadata} from '../CardMetadata';
import {CardRenderer} from '../render/CardRenderer';

export class LavaFlows extends Card implements IProjectCard {
  constructor(
    name: CardName = CardName.LAVA_FLOWS,
    adjacencyBonus: IAdjacencyBonus | undefined = undefined,
    metadata: CardMetadata = {
      cardNumber: '140',
      renderData: CardRenderer.builder((b) => {
        b.temperature(2).br;
        b.tile(TileType.LAVA_FLOWS, true, false).asterix();
      }),
      description: 'Raise temperature 2 steps and place this tile on a VOLCANIC AREA',
    }) {
    super({
      cardType: CardType.EVENT,
      name,
      cost: 18,
      adjacencyBonus,
      metadata,
    });
  }

  public static getVolcanicSpaces(player: Player): Array<ISpace> {
    const board = player.game.board;
    const boardsWithVolcanicSpaces = [BoardName.ORIGINAL, BoardName.ELYSIUM, BoardName.AMAZONIS, BoardName.TERRA_CIMMERIA, BoardName.VASTITAS_BOREALIS];

    const landSpaces = board.getSpaces(SpaceType.LAND, player);
    const unoccupiedLandSpaces = landSpaces.filter((space) => space.tile === undefined && (space.player === undefined || space.player === player));

    if (boardsWithVolcanicSpaces.includes(player.game.gameOptions.boardName)) {
      return unoccupiedLandSpaces.filter((space) => board.getVolcanicSpaceIds().includes(space.id));
    } else {
      return unoccupiedLandSpaces;
    }
  }

  public canPlay(player: Player): boolean {
    const canPlaceTile = LavaFlows.getVolcanicSpaces(player).length > 0;
    const remainingTemperatureSteps = (MAX_TEMPERATURE - player.game.getTemperature()) / 2;
    const stepsRaised = Math.min(remainingTemperatureSteps, 2);

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(player.getCardCost(this) + REDS_RULING_POLICY_COST * stepsRaised) && canPlaceTile;
    }

    return canPlaceTile;
  }

  public play(player: Player) {
    player.game.increaseTemperature(player, 2);
    return new SelectSpace('Select a volcanic area to place this tile on', LavaFlows.getVolcanicSpaces(player), (space: ISpace) => {
      player.game.addTile(player, SpaceType.LAND, space, {tileType: TileType.LAVA_FLOWS});
      space.adjacency = this.adjacencyBonus;
      return undefined;
    });
  }
}
