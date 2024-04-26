import {CardName} from "../CardName";
import {Dealer} from "../Dealer";
import {Game} from "../Game";
import {GameModule} from "../GameModule";
import {GameSetup} from "../GameSetup";
import {LogHelper} from "../LogHelper";
import {Player} from "../Player";
import {Resources} from "../Resources";
import {SerializedVictoryPointsBreakdown} from "../SerializedVictoryPointsBreakdown";
import {SpaceBonus} from "../SpaceBonus";
import {SpaceType} from "../SpaceType";
import {TileType} from "../TileType";
import {VictoryPointsBreakdown} from "../VictoryPointsBreakdown";
import {AresHandler} from "../ares/AresHandler";
import {_AresHazardPlacement} from "../ares/AresHazards";
import {Board} from "../boards/Board";
import {BoardName} from "../boards/BoardName";
import {BoardType} from "../boards/BoardType";
import {ISpace} from "../boards/ISpace";
import {CardType} from "../cards/CardType";
import {IProjectCard} from "../cards/IProjectCard";
import {Tags} from "../cards/Tags";
import {AUTOMA_CARD_MANIFEST} from "../cards/automa/AutomaCardManifest";
import {TharsisBot} from "../cards/automa/TharsisBot";
import {ThorgateBot} from "../cards/automa/ThorgateBot";
import {CorporationCard} from "../cards/corporation/CorporationCard";
import {LunaProjectOffice} from "../cards/moon/LunaProjectOffice";
import {Colony} from "../colonies/Colony";
import {MAXIMUM_MINING_RATE, MAX_OXYGEN_LEVEL, MAX_TEMPERATURE, MAX_VENUS_SCALE, MILESTONE_VP, MIN_OXYGEN_LEVEL, MIN_TEMPERATURE, MIN_VENUS_SCALE, SOLO_START_TR_AUTOMA} from "../constants";
import {DeferredAction, Priority} from "../deferredActions/DeferredAction";
import {GiveColonyBonus} from "../deferredActions/GiveColonyBonus";
import {OrOptions} from "../inputs/OrOptions";
import {IMoonData} from "../moon/IMoonData";
import {MoonExpansion} from "../moon/MoonExpansion";

export const BLOCKED_OXYGEN_SPOTS = [1, 3, 5, 7, 9, 11, 13];
export const BLOCKED_TEMPERATURE_SPOTS = [-26, -24, -18, -14, -10, -6, -2, 2, 6];
export const BLOCKED_VENUS_SPOTS = [2, 6, 10, 14, 18, 22, 26, 28];

export class AutomaHandler {
    private constructor() {}

    public static initialize(player: Player, game: Game): void {
      // Set the bot's starting TR and VP
      game.automaBotVictoryPointsBreakdown.terraformRating = SOLO_START_TR_AUTOMA;

      // Expansion modifiers
      if (game.gameOptions.preludeExtension) game.automaBotVictoryPointsBreakdown.terraformRating += 5;
      if (game.gameOptions.coloniesExtension) game.automaBotVictoryPointsBreakdown.terraformRating += 3;
      game.automaBotVictoryPointsBreakdown.updateTotal();

      // Set up the board. The bot does not score for this initial ocean and greenery.
      this.placeInitialOcean(player, game);
      this.placeInitialGreenery(game);

      // Deal a random bot corporation
      const automaBotCorporation = this.dealAutomaBotCorporation(game);
      game.automaBotCorporation = automaBotCorporation;
      game.log('Bot played ${0}', (b) => b.card(automaBotCorporation));

      if (automaBotCorporation.initialAction !== undefined) {
        automaBotCorporation.initialAction(player);
        game.automaBotVictoryPointsBreakdown.updateTotal();
      }
    }

    private static dealAutomaBotCorporation(game: Game): CorporationCard {
      let deck: CorporationCard[] = [];

      AUTOMA_CARD_MANIFEST.corporationCards.factories.forEach((f) => {
        if (f.compatibility === undefined || (f.compatibility === GameModule.Venus && game.gameOptions.venusNextExtension)) {
          deck.push(new f.Factory());
        }
      });

      deck = Dealer.shuffle(deck);
      return deck[0];
    }

    public static placeInitialOcean(player: Player, game: Game): void {
      const neutral = GameSetup.neutralPlayerFor(game.id);

      if (game.gameOptions.shuffleMapOption || game.gameOptions.boardName === BoardName.LABYRINTHUS) {
        const availableOceanSpaces = game.board.getAvailableSpacesForOcean(player);
        const oceanPlacementValues = availableOceanSpaces.map((s) => this.computePlacementValue(s));
        const highestOceanPlacementValue = Math.max(...oceanPlacementValues);

        const index = oceanPlacementValues.indexOf(highestOceanPlacementValue);
        game.simpleAddTile(neutral, availableOceanSpaces[index], {tileType: TileType.OCEAN});
      } else {
        switch (game.gameOptions.boardName) {
        case BoardName.ORIGINAL:
          // 2 card spot
          game.simpleAddTile(neutral, game.board.getSpace('13'), {tileType: TileType.OCEAN});
          break;
        case BoardName.HELLAS:
          // Upper 2 plant spot
          game.simpleAddTile(neutral, game.board.getSpace('03'), {tileType: TileType.OCEAN});
          break;
        case BoardName.ELYSIUM:
          // Lower 2 plant spot
          game.simpleAddTile(neutral, game.board.getSpace('32'), {tileType: TileType.OCEAN});
          break;
        case BoardName.AMAZONIS:
          // 2 card spot
          game.simpleAddTile(neutral, game.board.getSpace('12'), {tileType: TileType.OCEAN});
          break;
        case BoardName.ARABIA_TERRA:
          // 2 card spot
          game.simpleAddTile(neutral, game.board.getSpace('07'), {tileType: TileType.OCEAN});
          break;
        case BoardName.TERRA_CIMMERIA:
          // Bottom middle 2 plant spot
          game.simpleAddTile(neutral, game.board.getSpace('61'), {tileType: TileType.OCEAN});
          break;
        case BoardName.UTOPIA_PLANITIA:
          // 3 plant spot
          game.simpleAddTile(neutral, game.board.getSpace('14'), {tileType: TileType.OCEAN});
          break;
        case BoardName.VASTITAS_BOREALIS:
          // Plant + card spot
          game.simpleAddTile(neutral, game.board.getSpace('19'), {tileType: TileType.OCEAN});
          break;
        }
      }
    }

    public static placeInitialGreenery(game: Game): void {
      const neutral = GameSetup.neutralPlayerFor(game.id);

      if (game.gameOptions.shuffleMapOption || game.gameOptions.boardName === BoardName.LABYRINTHUS) {
        this.placeGreeneryOnHighestLandPlacementValueSpot(game, neutral);
      } else {
        const targetSpace = this.getTargetInitialGreenerySpace(game);

        if (targetSpace !== undefined && targetSpace.tile === undefined) {
          game.simpleAddTile(neutral, game.board.getSpace(targetSpace.id), {tileType: TileType.GREENERY});
        } else {
          this.placeGreeneryOnHighestLandPlacementValueSpot(game, neutral);
        }
      }
    }

    private static getTargetInitialGreenerySpace(game: Game): ISpace | undefined {
      switch (game.gameOptions.boardName) {
      case BoardName.ORIGINAL:
        return undefined;
      case BoardName.HELLAS:
        // South pole spot
        return game.board.getSpace('61');
      case BoardName.ELYSIUM:
        // 3 card spot
        return game.board.getSpace('20');
      case BoardName.AMAZONIS:
        // 3 plant spot
        return game.board.getSpace('05');
      case BoardName.ARABIA_TERRA:
        // Lower 2 plant spot
        return game.board.getSpace('48');
      case BoardName.TERRA_CIMMERIA:
        // 2 card spot
        return game.board.getSpace('38');
      case BoardName.UTOPIA_PLANITIA:
        // 2 card + titanium spot
        return game.board.getSpace('19');
      case BoardName.VASTITAS_BOREALIS:
        // Temperature spot
        return game.board.getSpace('33');
      default:
        return undefined;
      }
    }

    private static placeGreeneryOnHighestLandPlacementValueSpot(game: Game, neutral: Player): void {
      const availableLandSpaces = game.board.getAvailableSpacesOnLand(neutral);
      const landPlacementValues = availableLandSpaces.map((s) => this.computePlacementValue(s));
      const highestLandPlacementValue = Math.max(...landPlacementValues);

      const index = landPlacementValues.indexOf(highestLandPlacementValue);
      game.simpleAddTile(neutral, availableLandSpaces[index], {tileType: TileType.GREENERY});
    }

    private static computePlacementValue(space: ISpace): number {
      return space.bonus.reduce((acc, val) => acc + this.getSpaceBonusValue(val), 0);
    }

    // These values are approximations just to ensure that we can always identify
    // the most valuable tile placement spots, even with randomized board tiles
    private static getSpaceBonusValue(spaceBonus: SpaceBonus): number {
      switch (spaceBonus) {
      case SpaceBonus.TITANIUM:
        return 3;
      case SpaceBonus.STEEL:
        return 2;
      case SpaceBonus.PLANT:
        return 2.2;
      case SpaceBonus.DRAW_CARD:
        return 4;
      case SpaceBonus.HEAT:
        return 1.2;
      case SpaceBonus.TEMPERATURE:
        return 7.5;
      case SpaceBonus.OCEAN:
        return 8;
      case SpaceBonus.ANIMAL:
        return 3.5;
      case SpaceBonus.MICROBE:
        return 3.3;
      case SpaceBonus.POWER:
        return 1.5;
      case SpaceBonus.MEGACREDITS:
        return 1;
      case SpaceBonus.MICROBE:
        return 2.5;
      default:
        return 0;
      }
    }

    public static decreaseTemperature(game: Game, steps: number): void {
      if (game.gameOptions.automaSoloVariant) {
        for (let i = 0; i < Math.abs(steps); i++) {
          game.setTemperature(game.getTemperature() - 2);

          while (BLOCKED_TEMPERATURE_SPOTS.includes(game.getTemperature()) && game.getTemperature() > MIN_TEMPERATURE) {
            game.setTemperature(game.getTemperature() - 2);
          }
        }
      } else {
        game.setTemperature(Math.max(MIN_TEMPERATURE, game.getTemperature() + steps * 2));
      }
    }

    public static increaseTemperature(game: Game, steps: number): void {
      if (game.gameOptions.automaSoloVariant) {
        for (let i = 0; i < steps; i++) {
          game.setTemperature(game.getTemperature() + 2);

          while (BLOCKED_TEMPERATURE_SPOTS.includes(game.getTemperature()) && game.getTemperature() < MAX_TEMPERATURE) {
            game.setTemperature(game.getTemperature() + 2);
          }
        }
      } else {
        game.setTemperature(game.getTemperature() + steps * 2);
      }
    }

    public static decreaseVenusScale(game: Game, steps: number): void {
      if (game.gameOptions.automaSoloVariant) {
        for (let i = 0; i < Math.abs(steps); i++) {
          game.setVenusScaleLevel(game.getVenusScaleLevel() - 2);

          while (BLOCKED_VENUS_SPOTS.includes(game.getVenusScaleLevel()) && game.getVenusScaleLevel() > MIN_VENUS_SCALE) {
            game.setVenusScaleLevel(game.getVenusScaleLevel() - 2);
          }
        }
      } else {
        game.setVenusScaleLevel(Math.max(MIN_VENUS_SCALE, game.getVenusScaleLevel() + steps * 2));
      }
    }

    public static increaseVenusScale(game: Game, steps: number): void {
      if (game.gameOptions.automaSoloVariant) {
        for (let i = 0; i < steps; i++) {
          game.setVenusScaleLevel(game.getVenusScaleLevel() + 2);

          while (BLOCKED_VENUS_SPOTS.includes(game.getVenusScaleLevel()) && game.getVenusScaleLevel() < MAX_VENUS_SCALE) {
            game.setVenusScaleLevel(game.getVenusScaleLevel() + 2);
          }
        }
      } else {
        game.setVenusScaleLevel(game.getVenusScaleLevel() + steps * 2);
      }
    }

    public static decreaseOxygenLevel(game: Game, steps: number): void {
      if (game.gameOptions.automaSoloVariant) {
        for (let i = 0; i < Math.abs(steps); i++) {
          game.setOxygenLevel(game.getOxygenLevel() - 1);

          while (BLOCKED_OXYGEN_SPOTS.includes(game.getOxygenLevel()) && game.getOxygenLevel() > MIN_OXYGEN_LEVEL) {
            game.setOxygenLevel(game.getOxygenLevel() - 1);
          }
        }
      } else {
        game.setOxygenLevel(Math.max(MIN_OXYGEN_LEVEL, game.getOxygenLevel() + steps));
      }
    }

    public static increaseOxygenLevel(game: Game, steps: number): void {
      if (game.gameOptions.automaSoloVariant) {
        for (let i = 0; i < steps; i++) {
          game.setOxygenLevel(game.getOxygenLevel() + 1);

          while (BLOCKED_OXYGEN_SPOTS.includes(game.getOxygenLevel()) && game.getOxygenLevel() < MAX_OXYGEN_LEVEL) {
            game.setOxygenLevel(game.getOxygenLevel() + 1);
          }
        }
      } else {
        game.setOxygenLevel(game.getOxygenLevel() + steps);
      }
    }

    public static performBotTrade(game: Game): void {
      const neutral = GameSetup.neutralPlayerFor(game.id);
      const colonyTrackPositions = game.colonies.map((c) => c.trackPosition);
      const highestTrackPosition = Math.max(...colonyTrackPositions);

      const soloPlayer = game.getPlayers()[0];
      const targetColony = game.colonies.find((c) => c.trackPosition === highestTrackPosition) as Colony;
      targetColony.visitor = neutral.id;

      game.log('Bot traded with ${0}', (b) => b.colony(targetColony));
      game.defer(new GiveColonyBonus(soloPlayer, targetColony));

      game.defer(new DeferredAction(soloPlayer, () => {
        targetColony.trackPosition = targetColony.colonies.length;
        return undefined;
      }), Priority.DECREASE_COLONY_TRACK_AFTER_TRADE);
    }

    public static getBotTagCount(game: Game): number {
      return Math.ceil(game.generation / 2) + 1;
    }

    public static scoreUnclaimedMilestones(game: Game): void {
      const allMilestones = game.milestones;
      const allClaimedMilestones = game.claimedMilestones.map((cm) => cm.milestone);
      const unclaimedMilestones = allMilestones.filter((m) => allClaimedMilestones.map((cm) => cm.name).includes(m.name) === false);

      unclaimedMilestones.forEach((milestone) => {
        game.log('Bot claimed ${0} milestone', (b) => b.milestone(milestone));
        game.automaBotVictoryPointsBreakdown.milestones += MILESTONE_VP;
      });

      game.automaBotVictoryPointsBreakdown.updateTotal();
    }

    public static takeBotTurn(game: Game): void {
      const botActionsCount = Math.ceil(game.generation / 2);
      let actionsTaken = 0;

      while (actionsTaken < botActionsCount) {
        const topCard = game.dealer.dealCard(game);
        game.log('Bot revealed and discarded ${0}', (b) => b.card(topCard));
        game.dealer.discard(topCard);

        // If it's an event card, we need to add an event tag as the rightmost tag
        let tagsToResolve = topCard.tags;
        if (topCard.cardType === CardType.EVENT) tagsToResolve.push(Tags.EVENT);

        for (let i = 0; i < tagsToResolve.length; i++) {
          if (actionsTaken === botActionsCount) break;

          this.performActionForTag(game, tagsToResolve[i]);
          actionsTaken++;

          // Interplanetary Cinematics Bot effect: Event tags grant 1 extra action
          if (tagsToResolve[i] === Tags.EVENT && game.automaBotCorporation?.name === CardName.INTERPLANETARY_CINEMATICS_BOT) {
            actionsTaken--;
          }
        }
      }
    }

    public static performActionForTag(game: Game, tag: Tags): void {
      const neutral = GameSetup.neutralPlayerFor(game.id);
      const soloPlayer = game.getPlayers()[0];

      // Give player any corp benefits as though the bot played a card with this tag
      this.grantTagPlayedBonus(soloPlayer, game, tag);

      const originalTag = tag;
      let appliedTag = tag;

      if (game.overwriteNextBotAction) {
        // Ecoline Bot effect: Next action is to place a city regardless of the tag
        if (game.automaBotCorporation?.name === CardName.ECOLINE_BOT) {
          appliedTag = Tags.CITY;
        }

        // Thorgate Bot effect: Next tag is treated as a power tag
        if (game.automaBotCorporation?.name === CardName.THORGATE_BOT) {
          appliedTag = Tags.ENERGY;
        }

        game.overwriteNextBotAction = false;
      }

      switch (appliedTag) {
      case Tags.SCIENCE:
      case Tags.ENERGY:
        game.automaBotVictoryPointsBreakdown.terraformRating++;

        if (game.getTemperature() === MAX_TEMPERATURE) {
          game.log('Bot action from ${0} tag: Gain 1 TR as temperature is already maxed', (b) => b.string(originalTag));

          if (appliedTag === Tags.ENERGY && game.automaBotCorporation?.name === CardName.THORGATE_BOT) {
            ThorgateBot.handleOxygenandTRIncreaseFromPowerTag(game, neutral);
          }

          break;
        }

        AutomaHandler.increaseTemperature(game, 1);
        game.temperatureSilverCubeBonusMC = 0;
        this.checkForTemperatureBonusOcean(game, neutral);

        AresHandler.ifAres(game, (aresData) => {
          AresHandler.onTemperatureChange(game, aresData);
        });

        game.log('Bot action from ${0} tag: Increase temperature 1 step', (b) => b.string(originalTag));

        if (appliedTag === Tags.ENERGY && game.automaBotCorporation?.name === CardName.THORGATE_BOT) {
          ThorgateBot.handleOxygenandTRIncreaseFromPowerTag(game, neutral);
        }

        break;
      case Tags.ANIMAL:
      case Tags.PLANT:
      case Tags.MICROBE:
        const landSpacesCount = game.board.getAvailableSpacesOnLand(neutral).length;
        if (landSpacesCount === 0) {
          game.automaBotVictoryPointsBreakdown.terraformRating++;
          game.log('Bot action from ${0} tag: Gain 1 TR as there are no greenery spots left', (b) => b.string(originalTag));
          break;
        }

        game.automaBotVictoryPointsBreakdown.greenery++;

        if (game.getOxygenLevel() !== MAX_OXYGEN_LEVEL) {
          AutomaHandler.increaseOxygenLevel(game, 1);
          game.automaBotVictoryPointsBreakdown.terraformRating++;

          if (game.getOxygenLevel() === 8 && game.getTemperature() !== MAX_TEMPERATURE) {
            AutomaHandler.increaseTemperature(game, 1);
            game.temperatureSilverCubeBonusMC = 0;
            game.automaBotVictoryPointsBreakdown.terraformRating++;
            this.checkForTemperatureBonusOcean(game, neutral);

            AresHandler.ifAres(game, (aresData) => {
              AresHandler.onTemperatureChange(game, aresData);
            });
          }
        }

        const targetGreenerySpace = AutomaHandler.getTargetGreenerySpace(game, neutral);
        game.simpleAddTile(neutral, game.board.getSpace(targetGreenerySpace.id), {tileType: TileType.GREENERY});
        AutomaHandler.grantBonusesForBotTilePlacement(game, targetGreenerySpace, neutral, TileType.GREENERY);
        game.oxygenSilverCubeBonusMC = 0;
        game.log('Bot action from ${0} tag: Place a greenery on row ${1} position ${2}', (b) => b.string(originalTag).number(targetGreenerySpace.y + 1).number(targetGreenerySpace.x - Math.abs(targetGreenerySpace.y - 4) + 1));

        // Each adjacent bot city scores 1 VP for the newly placed greenery
        const adjacentCities = game.board.getAdjacentSpaces(targetGreenerySpace).filter((space) => space.spaceType === SpaceType.LAND && space.tile?.tileType === TileType.CITY && space.player?.name === neutral.name);
        game.automaBotVictoryPointsBreakdown.city += adjacentCities.length;

        // If we are placing a greenery that is not adjacent to any of our own cities
        if (adjacentCities.length === 0 && game.automaBotCorporation?.name === CardName.ECOLINE_BOT) {
          game.overwriteNextBotAction = true;
        }

        break;
      case Tags.EARTH:
        game.automaBotVictoryPointsBreakdown.terraformRating++;

        if (game.noOceansAvailable()) {
          game.log('Bot action from ${0} tag: Gain 1 TR as oceans are already maxed', (b) => b.string(originalTag));
          break;
        }

        const targetOceanSpace: ISpace = this.getTargetOceanSpace(game);
        game.simpleAddTile(neutral, game.board.getSpace(targetOceanSpace.id), {tileType: TileType.OCEAN});
        AutomaHandler.grantBonusesForBotTilePlacement(game, targetOceanSpace, neutral, TileType.OCEAN);
        game.oceansSilverCubeBonusMC = 0;
        game.log('Bot action from ${0} tag: Place an ocean on row ${1} position ${2}', (b) => b.string(originalTag).number(targetOceanSpace.y + 1).number(targetOceanSpace.x - Math.abs(targetOceanSpace.y - 4) + 1));

        this.maybeRemoveAresDustStorms(game);
        this.maybePlaceErosions(game);
        break;
      case Tags.SPACE:
      case Tags.CITY:
        const availableCitySpaces = game.board.getAvailableSpacesForCity(neutral);

        if (availableCitySpaces.length === 0) {
          game.automaBotVictoryPointsBreakdown.terraformRating++;
          game.log('Bot action from ${0} tag: Gain 1 TR as there are no city spots left', (b) => b.string(originalTag));
          break;
        }

        const targetCitySpace: ISpace = this.getTargetCitySpace(game);
        game.simpleAddTile(neutral, game.board.getSpace(targetCitySpace.id), {tileType: TileType.CITY});
        AutomaHandler.grantBonusesForBotTilePlacement(game, targetCitySpace, neutral, TileType.CITY);

        const adjacentGreeneries = game.board.getAdjacentSpaces(targetCitySpace).filter((s) => s.tile?.tileType === TileType.GREENERY).length;
        game.automaBotVictoryPointsBreakdown.city += adjacentGreeneries;
        game.log('Bot action from ${0} tag: Place a city on row ${1} position ${2}', (b) => b.string(originalTag).number(targetCitySpace.y + 1).number(targetCitySpace.x - Math.abs(targetCitySpace.y - 4) + 1));
        break;
      case Tags.BUILDING:
        game.automaBotVictoryPointsBreakdown.terraformRating++;
        game.log('Bot action from ${0} tag: Gain 1 TR', (b) => b.string(originalTag));
        break;
      case Tags.EVENT:
      case Tags.JOVIAN:
      case Tags.WILDCARD:
        game.automaBotCorporation!.action!(soloPlayer);
        break;
      case Tags.VENUS:
        game.automaBotVictoryPointsBreakdown.terraformRating++;

        if (game.getVenusScaleLevel() === MAX_VENUS_SCALE) {
          game.log('Bot action from ${0} tag: Gain 1 TR as Venus is already maxed', (b) => b.string(originalTag));
          break;
        }

        AutomaHandler.increaseVenusScale(game, 1);
        game.venusSilverCubeBonusMC = 0;
        const gotBonusTRFromVenusTrack = game.getVenusScaleLevel() === 16;
        if (gotBonusTRFromVenusTrack) game.automaBotVictoryPointsBreakdown.terraformRating++;

        // Check for Aphrodite corporation
        const aphrodite = game.getPlayers().find((player) => player.isCorporation(CardName.APHRODITE));
        if (aphrodite !== undefined) aphrodite.megaCredits += gotBonusTRFromVenusTrack ? 4 : 2;

        game.log('Bot action from ${0} tag: Increase Venus scale 1 step', (b) => b.string(originalTag));
        break;
      case Tags.MOON:
        game.automaBotVictoryPointsBreakdown.terraformRating++;

        MoonExpansion.ifMoon(game, (moonData) => {
          const lowestRate = Math.min(moonData.colonyRate, moonData.logisticRate, moonData.miningRate);

          if (lowestRate === MAXIMUM_MINING_RATE) {
            game.log('Bot action from ${0} tag: Gain 1 TR as all Moon tracks are already maxed', (b) => b.string(originalTag));
          } else if (lowestRate === moonData.colonyRate) {
            moonData.colonyRate += 2;

            // Grant track bonuses. We cannot call MoonExpansion.raiseColonyRate here as it causes circular dependency error
            if (moonData.colonyRate === 4) soloPlayer.drawCard();
            if (moonData.colonyRate === 6) soloPlayer.addProduction(Resources.ENERGY, 1, {log: true});
            AutomaHandler.grantLunaFirstPlayerBonus(moonData);

            game.log('Bot action from ${0} tag: Increase Moon colonyRate rate 1 step', (b) => b.string(originalTag));
          } else if (lowestRate === moonData.logisticRate) {
            moonData.logisticRate += 2;

            // Grant track bonuses. We cannot call MoonExpansion.raiseLogisticRate here as it causes circular dependency error
            if (moonData.logisticRate === 4) soloPlayer.drawCard();
            if (moonData.logisticRate === 6) soloPlayer.addProduction(Resources.STEEL, 1, {log: true});
            AutomaHandler.grantLunaFirstPlayerBonus(moonData);

            game.log('Bot action from ${0} tag: Increase Moon logistic rate 1 step', (b) => b.string(originalTag));
          } else {
            // lowestRate === moonData.miningRate
            moonData.miningRate += 2;

            // Grant track bonuses. We cannot call MoonExpansion.raiseMiningRate here as it causes circular dependency error
            if (moonData.miningRate === 4) soloPlayer.drawCard();
            if (moonData.miningRate === 6) soloPlayer.addProduction(Resources.TITANIUM, 1, {log: true});
            AutomaHandler.grantLunaFirstPlayerBonus(moonData);

            game.log('Bot action from ${0} tag: Increase Moon mining rate 1 step', (b) => b.string(originalTag));
          }
        });

        break;
      default:
        break;
      }

      game.automaBotVictoryPointsBreakdown.updateTotal();
    }

    private static grantLunaFirstPlayerBonus(moonData: IMoonData): void {
      const lunaFirstPlayer = moonData.lunaFirstPlayer;
      if (lunaFirstPlayer !== undefined) lunaFirstPlayer.addResource(Resources.MEGACREDITS, 1, {log: true});
    }

    private static grantTagPlayedBonus(player: Player, game: Game, tag: Tags): void {
      player.corporationCards.forEach((corp) => {
        if (corp.onCardPlayed !== undefined) {
          const actionFromPlayedCard: OrOptions | void = corp.onCardPlayed(player, {tags: [tag]} as IProjectCard);
          if (actionFromPlayedCard !== undefined) {
            game.defer(new DeferredAction(
              player,
              () => actionFromPlayedCard,
            ));
          }
        }
      });
    }

    // Rule 1: Highest placement value
    // Rule 2: Adjacent to most other oceans
    public static getTargetOceanSpace(game: Game): ISpace {
      const soloPlayer = game.getPlayers()[0];
      const availableOceanSpaces = game.board.getAvailableSpacesForOcean(soloPlayer);
      const oceanPlacementValues = availableOceanSpaces.map((s) => this.computePlacementValue(s));
      const highestOceanPlacementValue = Math.max(...oceanPlacementValues);
      const highestValueSpaces = oceanPlacementValues.filter((v) => v === highestOceanPlacementValue);

      if (highestValueSpaces.length === 1) {
        const index = oceanPlacementValues.indexOf(highestOceanPlacementValue);
        return availableOceanSpaces[index];
      } else {
        const tiedSpaces = availableOceanSpaces.filter((space) => this.computePlacementValue(space) === highestOceanPlacementValue);
        const adjacentOceansCount = tiedSpaces.map((space) => game.board.getAdjacentSpaces(space).filter((s) => Board.isOceanSpace(s)).length);

        return tiedSpaces.find((space) => game.board.getAdjacentSpaces(space).filter((s) => Board.isOceanSpace(s)).length === Math.max(...adjacentOceansCount))!;
      }
    }

    // Rule 1: Adjacent to most greeneries
    // Rule 2: Most spots for future greeneries
    // Rule 3: Most spots for future greeneries adjacent to oceans or reserved areas for oceans
    public static getTargetCitySpace(game: Game): ISpace {
      const soloPlayer = game.getPlayers()[0];
      let availableCitySpaces: ISpace[] = game.board.getAvailableSpacesForCity(soloPlayer);

      const adjacentGreeneriesCounts: number[] = availableCitySpaces.map((s) => game.board.getAdjacentSpaces(s).filter((s) => s.tile?.tileType === TileType.GREENERY).length);
      const highestAdjacentGreeneriesCount: number = Math.max(...adjacentGreeneriesCounts);

      availableCitySpaces = availableCitySpaces.filter((s) => game.board.getAdjacentSpaces(s).filter((s) => s.tile?.tileType === TileType.GREENERY).length === highestAdjacentGreeneriesCount);

      if (availableCitySpaces.length === 1) {
        return availableCitySpaces[0];
      } else {
        const futureGreenerySpotsCounts: number[] = availableCitySpaces.map((space) => game.board.getAdjacentSpaces(space).filter((s) => s.tile === undefined && s.player === undefined && s.spaceType === SpaceType.LAND).length);
        const highestFutureGreenerySpotsCount: number = Math.max(...futureGreenerySpotsCounts);

        availableCitySpaces = availableCitySpaces.filter((space) => game.board.getAdjacentSpaces(space).filter((s) => s.tile === undefined && s.player === undefined && s.spaceType === SpaceType.LAND).length === highestFutureGreenerySpotsCount);

        if (availableCitySpaces.length === 1) {
          return availableCitySpaces[0];
        } else {
          const futureGreenerySpotsAdjacentToOceansCounts: number[] = availableCitySpaces.map((space) => game.board.getAdjacentSpaces(space).filter((s) => game.board.getAdjacentSpaces(s).some((adjSpace) => adjSpace.spaceType === SpaceType.OCEAN)).length);
          const highestFutureGreenerySpotsAdjacentToOceansCount: number = Math.max(...futureGreenerySpotsAdjacentToOceansCounts);

          availableCitySpaces = availableCitySpaces.filter((space) => game.board.getAdjacentSpaces(space).filter((s) => game.board.getAdjacentSpaces(s).some((adjSpace) => adjSpace.spaceType === SpaceType.OCEAN)).length === highestFutureGreenerySpotsAdjacentToOceansCount);
          return availableCitySpaces[0];
        }
      }
    }

    public static scoreCityVPForPlayerGreeneryPlacements(game: Game, space: ISpace): void {
      const neutral = GameSetup.neutralPlayerFor(game.id);
      game.automaBotVictoryPointsBreakdown.city += game.board.getAdjacentSpaces(space).filter((s) => s.tile?.tileType === TileType.CITY && s.player?.name === neutral.name).length;
    }

    // Rule 1: Adjacent to most own cities
    // Rule 2: Adjacent to fewest opponent cities
    // Rule 3: Highest placement bonus
    public static getTargetGreenerySpace(game: Game, neutral: Player): ISpace {
      // First find a space adjacent to the bot's own cities
      let availableGreenerySpaces: ISpace[] = game.board.getAvailableSpacesOnLand(neutral).filter((space) => game.board.getAdjacentSpaces(space).some((adjSpace) => adjSpace.tile?.tileType === TileType.CITY && adjSpace.player?.name === neutral.name));
      // If there are none (e.g. the bot has no cities placed), all land spaces are eligible for greenery placement
      if (availableGreenerySpaces.length === 0) availableGreenerySpaces = game.board.getAvailableSpacesOnLand(neutral);

      const adjacentCitiesCounts: number[] = availableGreenerySpaces.map((s) => game.board.getAdjacentSpaces(s).filter((adjSpace) => adjSpace.tile?.tileType === TileType.CITY && adjSpace.player?.name === neutral.name && adjSpace.spaceType === SpaceType.LAND).length);
      const highestAdjacentCitiesCounts: number = Math.max(...adjacentCitiesCounts);
      availableGreenerySpaces = availableGreenerySpaces.filter((s) => game.board.getAdjacentSpaces(s).filter((adjSpace) => adjSpace.tile?.tileType === TileType.CITY && adjSpace.player?.name === neutral.name).length === highestAdjacentCitiesCounts);

      if (availableGreenerySpaces.length === 1) {
        return availableGreenerySpaces[0];
      } else {
        const adjacentToOpponentCitiesCounts: number[] = availableGreenerySpaces.map((space) => game.board.getAdjacentSpaces(space).filter((adjSpace) => adjSpace.tile?.tileType === TileType.CITY && adjSpace.player !== undefined && adjSpace.player?.name !== neutral.name).length);
        const lowestAdjacentToOpponentCitiesCount: number = Math.min(...adjacentToOpponentCitiesCounts);

        availableGreenerySpaces = availableGreenerySpaces.filter((space) => game.board.getAdjacentSpaces(space).filter((adjSpace) => adjSpace.tile?.tileType === TileType.CITY && adjSpace.player !== undefined && adjSpace.player.name !== neutral.name).length === lowestAdjacentToOpponentCitiesCount);

        if (availableGreenerySpaces.length === 1) {
          return availableGreenerySpaces[0];
        } else {
          const greeneryPlacementValues = availableGreenerySpaces.map((s) => this.computePlacementValue(s));
          const highestGreeneryPlacementValue = Math.max(...greeneryPlacementValues);
          const index = greeneryPlacementValues.indexOf(highestGreeneryPlacementValue);

          return availableGreenerySpaces[index];
        }
      }
    }

    public static checkForTemperatureBonusOcean(game: Game, neutral: Player): void {
      if (game.getTemperature() === 0) {
        const targetSpace: ISpace = this.getTargetOceanSpace(game);
        game.simpleAddTile(neutral, game.board.getSpace(targetSpace.id), {tileType: TileType.OCEAN});

        game.oceansSilverCubeBonusMC = 0;
        game.automaBotVictoryPointsBreakdown.terraformRating++;
        AutomaHandler.grantBonusesForBotTilePlacement(game, targetSpace, neutral, TileType.OCEAN);
      }
    }

    public static grantBonusesForBotTilePlacement(game: Game, space: ISpace, neutral: Player, tileType: TileType) : void {
      game.getPlayers().forEach((p) => {
        p.corporationCards.forEach((corp) => {
          corp.onTilePlaced?.(p, neutral, space, BoardType.MARS);
        });

        p.playedCards.forEach((playedCard) => {
          playedCard.onTilePlaced?.(p, neutral, space, BoardType.MARS);
        });
      });

      if (tileType === TileType.CITY) TharsisBot.scoreVictoryPoints(game);
    }

    private static maybeRemoveAresDustStorms(game: Game): void {
      AresHandler.ifAres(game, (aresData) => {
        _AresHazardPlacement.testConstraint(
          aresData.hazardData.removeDustStormsOceanCount,
          game.board.getOceansOnBoard(),
          () => {
            game.board.spaces.forEach((space) => {
              if (space.tile?.tileType === TileType.DUST_STORM_MILD || space.tile?.tileType === TileType.DUST_STORM_SEVERE) {
                if (space.tile.protectedHazard !== true) space.tile = undefined;
              }
            });

            game.log('Bot eliminated dust storms.');
          },
        );
      });
    }

    private static maybePlaceErosions(game: Game): void {
      const neutral = GameSetup.neutralPlayerFor(game.id);

      AresHandler.ifAres(game, (aresData) => {
        _AresHazardPlacement.testConstraint(
          aresData.hazardData.erosionOceanCount,
          game.board.getOceansOnBoard(),
          () => {
            let type = TileType.EROSION_MILD;
            if (aresData.hazardData.severeErosionTemperature.available !== true) {
              type = TileType.EROSION_SEVERE;
            }

            const space1 = _AresHazardPlacement.randomlyPlaceHazard(game, type, 1);
            const space2 = _AresHazardPlacement.randomlyPlaceHazard(game, type, -1);

            [space1, space2].forEach((space) => {
              LogHelper.logTilePlacement(neutral, space, type);
            });
          },
        );
      });
    }

    // Deals 4 packs of 3 cards to the player, 1 at a time
    // The player can buy 0 or 1 cards from each pack
    public static conductDraftPhase(game: Game) {
      const player = game.getPlayers()[0];

      for (let i = 0; i < 4; i++) {
        let dealtCards: Array<IProjectCard> = [];
        player.dealCards(LunaProjectOffice.isActive(player) ? 5 : 3, dealtCards);

        // When i === 3 below we call setWaitingFor with the 4th and last pack, and it will proc first before the other 3 packs
        // draftRound value is being modified here to display the right number to the player, since the order of the 4 packs does not actually matter
        const draftRound = (i + 1) % 4 + 1;
        const action = player.drawCardKeepSome(dealtCards.length, {keepMax: 1, paying: true, logDrawnCard: true, title: `Draft ${draftRound} of 4: Buy up to 1 card`});

        if (i === 3) {
          player.setWaitingFor(action, () => game.playerIsFinishedWithResearchPhase(player));
        } else {
          game.defer(new DeferredAction(player, () => action));
        }
      }
    }

    public static deserializeBotVictoryPoints(d: SerializedVictoryPointsBreakdown): VictoryPointsBreakdown {
      const vpb = new VictoryPointsBreakdown();
      vpb.terraformRating = d.terraformRating;
      vpb.milestones = d.milestones;
      vpb.awards = d.awards;
      vpb.greenery = d.greenery;
      vpb.city = d.city;
      vpb.moonColonies = d.moonColonies;
      vpb.moonMines = d.moonMines;
      vpb.moonRoads = d.moonRoads;
      vpb.victoryPoints = d.victoryPoints;
      vpb.total = d.total;

      return vpb;
    }

    public static serializeBotVictoryPoints(vpb: VictoryPointsBreakdown): SerializedVictoryPointsBreakdown {
      return {
        total: vpb.total,
        terraformRating: vpb.terraformRating,
        milestones: vpb.milestones,
        awards: vpb.awards,
        greenery: vpb.greenery,
        city: vpb.city,
        moonColonies: vpb.moonColonies,
        moonMines: vpb.moonMines,
        moonRoads: vpb.moonRoads,
        victoryPoints: vpb.victoryPoints,
      };
    }

    public static logBotFinalScore(game: Game):void {
      const vpb = game.automaBotVictoryPointsBreakdown;
      let data = `Player: Bot, Total: ${vpb.total}, TR: ${vpb.terraformRating}, `;

      data += `Milestones: ${vpb.milestones}, Awards: ${vpb.awards}, `;
      data += `Greenery: ${vpb.greenery}, City: ${vpb.city}, VP: ${vpb.victoryPoints}`;

      game.log(data);
    }
}
