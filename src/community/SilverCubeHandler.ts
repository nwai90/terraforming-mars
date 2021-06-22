import {AquiferStandardProject} from "../cards/base/standardProjects/AquiferStandardProject";
import {AsteroidStandardProject} from "../cards/base/standardProjects/AsteroidStandardProject";
import {GreeneryStandardProject} from "../cards/base/standardProjects/GreeneryStandardProject";
import {AirScrappingStandardProject} from "../cards/venusNext/AirScrappingStandardProject";
import {MAX_OCEAN_TILES, MAX_OXYGEN_LEVEL, MAX_TEMPERATURE, MAX_VENUS_SCALE} from "../constants";
import {Game} from "../Game";
import {OrOptions} from "../inputs/OrOptions";
import {SelectOption} from "../inputs/SelectOption";
import {SelectSpace} from "../inputs/SelectSpace";
import {Player} from "../Player";
import {Resources} from "../Resources";
import {SpaceType} from "../SpaceType";

export class SilverCubeHandler {
  public static onTemperatureIncrease(player: Player, game: Game): void {
    if (game.temperatureSilverCubeBonusMC > 0) {
      player.addResource(Resources.MEGACREDITS, game.temperatureSilverCubeBonusMC);
      game.temperatureSilverCubeBonusMC = 0;
    }
  }

  public static onOxygenIncrease(player: Player, game: Game): void {
    if (game.oxygenSilverCubeBonusMC > 0) {
      player.addResource(Resources.MEGACREDITS, game.oxygenSilverCubeBonusMC);
      game.oxygenSilverCubeBonusMC = 0;
    }
  }
  
  public static onOceanPlaced(player: Player, game: Game): void {
    if (game.oceansSilverCubeBonusMC > 0) {
      player.addResource(Resources.MEGACREDITS, game.oceansSilverCubeBonusMC);
      game.oceansSilverCubeBonusMC = 0;
    }
  }

  public static onVenusIncrease(player: Player, game: Game): void {
    if (game.venusSilverCubeBonusMC > 0) {
      player.addResource(Resources.MEGACREDITS, game.venusSilverCubeBonusMC);
      game.venusSilverCubeBonusMC = 0;
    }
  }

  public static onTemperatureSilverCubeAdded(player: Player, game: Game): void {
    const asteroidStandard = new AsteroidStandardProject();

    game.temperatureSilverCubeBonusMC += 5;
    game.log('${0} acted as World Government and placed 5 M€ on temperature track', (b) => b.player(player));

    if (game.temperatureSilverCubeBonusMC >= asteroidStandard.cost) {
      game.temperatureSilverCubeBonusMC = 0;
      if (game.getTemperature() < MAX_TEMPERATURE) {
        game.increaseTemperature(player, 1);
        game.log('${0} acted as World Government and increased temperature', (b) => b.player(player));
      }
    }
  }

  public static onOxygenSilverCubeAdded(player: Player, game: Game): void {
    const greeneryStandard = new GreeneryStandardProject();

    game.oxygenSilverCubeBonusMC += 5;
    game.log('${0} acted as World Government and placed 5 M€ on oxygen track', (b) => b.player(player));

    if (game.oxygenSilverCubeBonusMC >= greeneryStandard.cost) {
      game.oxygenSilverCubeBonusMC = 0;
      if (game.getOxygenLevel() < MAX_OXYGEN_LEVEL) {
        game.increaseOxygenLevel(player, 1);
        game.log('${0} acted as World Government and increased oxygen level', (b) => b.player(player));
      }
    }
  }

  public static onOceanSilverCubeAdded(player: Player, game: Game): SelectSpace | void {
    const aquifer = new AquiferStandardProject();

    game.oceansSilverCubeBonusMC += 5;
    game.log('${0} acted as World Government and placed 5 M€ on oceans track', (b) => b.player(player));

    if (game.oceansSilverCubeBonusMC >= aquifer.cost) {
      game.oceansSilverCubeBonusMC = 0;
      if (game.board.getOceansOnBoard() < MAX_OCEAN_TILES) {
        return new SelectSpace(
          'WGT: Add an ocean',
          game.board.getAvailableSpacesForOcean(player), (space) => {
            game.addOceanTile(player, space.id, SpaceType.OCEAN);
            game.log('${0} acted as World Government and placed an ocean', (b) => b.player(player));
            return undefined;
          },
        );
      }
    }
  }

  public static onVenusSilverCubeAdded(player: Player, game: Game): void {
    const airScrapping = new AirScrappingStandardProject();

    game.venusSilverCubeBonusMC += 5;
    game.log('${0} acted as World Government and placed 5 M€ on Venus track', (b) => b.player(player));

    if (game.venusSilverCubeBonusMC >= airScrapping.cost) {
      game.venusSilverCubeBonusMC = 0;
      if (game.getVenusScaleLevel() < MAX_VENUS_SCALE) {
        game.increaseVenusScaleLevel(player, 1);
        game.log('${0} acted as World Government and increased Venus scale', (b) => b.player(player));
      }
    }
  }

  public static addSilverCubeWGTOptions(player: Player, game: Game, action: OrOptions): void {
    if (game.getTemperature() < MAX_TEMPERATURE) {
      action.options.push(
        new SelectOption('Add 5 M€ to temperature track', 'Select', () => {
          SilverCubeHandler.onTemperatureSilverCubeAdded(player, game);
          return undefined;
        }),
      );
    }
    if (game.getOxygenLevel() < MAX_OXYGEN_LEVEL) {
      action.options.push(
        new SelectOption('Add 5 M€ to oxygen track', 'Select', () => {
          SilverCubeHandler.onOxygenSilverCubeAdded(player, game);
          return undefined;
        }),
      );
    }
    if (game.board.getOceansOnBoard() < MAX_OCEAN_TILES) {
      action.options.push(
        new SelectOption('Add 5 M€ to oceans track', 'Select', () => {
          SilverCubeHandler.onOceanSilverCubeAdded(player, game);
          return undefined;
        }),
      );
    }
    if (game.getVenusScaleLevel() < MAX_VENUS_SCALE && game.gameOptions.venusNextExtension) {
      action.options.push(
        new SelectOption('Add 5 M€ to Venus track', 'Select', () => {
          SilverCubeHandler.onVenusSilverCubeAdded(player, game);
          return undefined;
        }),
      );
    }
  }
}
