import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {ISpace} from '../../boards/ISpace';
import {SelectSpace} from '../../inputs/SelectSpace';
import {intersection} from '../../utils/utils';
import {AresHandler} from '../../ares/AresHandler';
import {TurmoilHandler} from '../../turmoil/TurmoilHandler';
import {HellasBoard} from '../../boards/HellasBoard';
import {VastitasBorealisBoard} from '../../boards/VastitasBorealisBoard';

export class MarsNomads extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.MARS_NOMADS,
      cost: 13,

      metadata: {
        cardNumber: '??',
        description: 'PLACE THE NOMADS on a non-reserved, empty area on the game board.',
        renderData: CardRenderer.builder((b) => {
          b.action('MOVE THE NOMADS to an adjacent, non-reserved empty area and collect THE PLACEMENT BONUS as if placing a special tile there. No tiles may be placed on the Nomad area.', (eb) => {
            eb.empty().startAction.nomads(1).asterix();
          });
          b.br;
          b.nomads(1).asterix();
        }),
      },
    });
  }

  public canPlay(player: Player) {
    const spaces = player.game.board.getAvailableSpacesOnLand(player);
    return spaces.length > 0;
  }

  public play(player: Player) {
    return new SelectSpace(
      'Select space for Nomads',
      player.game.board.getAvailableSpacesOnLand(player),
      (space: ISpace) => {
        space.hasNomads = true;
        return undefined;
      },
    );
  }

  public canAct(player: Player) {
    const board = player.game.board;
    if (board.spaces.some((space) => space.hasNomads) === false) return false;

    const eligibleAdjacentSpaces = this.getEligibleDestinationSpaces(player);
    return eligibleAdjacentSpaces.length > 0;
  }

  public action(player: Player) {
    const game = player.game;
    const board = game.board;
    const eligibleAdjacentSpaces = this.getEligibleDestinationSpaces(player);
    
    return new SelectSpace(
      'Select adjacent space to move Nomads to',
      eligibleAdjacentSpaces,
      (space: ISpace) => {
        board.spaces.forEach((s) => s.hasNomads = false);
        space.hasNomads = true;

        // Grant space bonuses
        game.grantSpaceBonuses(player, space);
        game.grantOceanAdjacencyBonuses(player, space, true);

        // Hellas special requirements ocean tile
        HellasBoard.handleBonusOceanFromTilePlacement(game, player, space);
        // Vastitas Borealis special requirements temperature tile
        VastitasBorealisBoard.handleBonusTemperatureFromTilePlacement(game, player, space);

        AresHandler.ifAres(game, (aresData) => {
          AresHandler.earnAdjacencyBonuses(aresData, player, space);
        });

        TurmoilHandler.resolveTilePlacementBonuses(player, space);

        return undefined;
      },
    );
  }

  private getEligibleDestinationSpaces(player: Player): ISpace[] {
    const board = player.game.board;
    if (board.spaces.some((space) => space.hasNomads) === false) return [];

    const availableSpaces = board.getAvailableSpacesOnLand(player);
    const currentNomadSpace = board.spaces.find((space) => space.hasNomads) as ISpace;
    const adjacentSpaces = board.getAdjacentSpaces(currentNomadSpace);
    return intersection(availableSpaces, adjacentSpaces);
  }
}
