import { Colony, IColony } from '../../colonies/Colony';
import { Player } from '../../Player';
import { Game } from '../../Game';
import { ColonyName } from '../../colonies/ColonyName';
import { MAX_COLONY_TRACK_POSITION } from '../../constants';
import { LogHelper } from '../../components/LogHelper';

export class Iapetus extends Colony implements IColony {
    public name = ColonyName.IAPETUS;
    public description: string = "TR";

    public trade(player: Player, game: Game, usesTradeFleet: boolean = true): void {
        if (usesTradeFleet) this.beforeTrade(this, player, game);
<<<<<<< HEAD
        let steps : number = 0;
=======
        let qty : number = 0;
>>>>>>> Add Mercury colony tile

        if (this.trackPosition === MAX_COLONY_TRACK_POSITION) {
            steps = 2;
        } else if (this.trackPosition > 2) {
            steps = 1;
        }

        if (steps > 0) {
            player.increaseTerraformRatingSteps(steps, game)
            LogHelper.logTRIncrease(game, player, steps);
        };

        if (usesTradeFleet) this.afterTrade(this, player, game);
    }

    public onColonyPlaced(player: Player, game: Game): undefined {
        super.addColony(this, player, game);
        player.increaseTerraformRating(game);
        return undefined;
    }
    
    public giveTradeBonus(player: Player): void {
        player.cardDiscount += 1;
    }   
}