import { Colony } from "../../colonies/Colony";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { ColonyName } from "../../colonies/ColonyName";
import { ISpace } from "../../ISpace";
import { ColonyBenefit } from "../../colonies/ColonyBenefit";

export class Deimos extends Colony {
    public name = ColonyName.DEIMOS;
    public description = 'Hazards';
    public buildType = ColonyBenefit.PLACE_HAZARD_TILE;
    public tradeType = ColonyBenefit.ERODE_SPACES_ADJACENT_TO_HAZARDS;
    public tradeQuantity = [0, 0, 1, 1, 2, 2, 3];
    public colonyBonusType = ColonyBenefit.GAIN_MC_PER_HAZARD_TILE;

    public static getAvailableSpaces(player: Player, game: Game): Array<ISpace> {
        return game.board.getAvailableSpacesOnLand(player)
                .filter((space => space.tile === undefined))
                .filter((space) => {
                    const adjacentSpaces = game.board.getAdjacentSpaces(space);
                    return adjacentSpaces.filter((space) => space.tile !== undefined).length === 0;
                });
    }
}