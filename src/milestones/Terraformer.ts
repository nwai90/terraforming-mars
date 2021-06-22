import {IMilestone} from './IMilestone';
import {Player} from '../Player';

export class Terraformer implements IMilestone {
    public name: string = 'Terraformer';
    private terraformRating: number = 35;
    private terraformRatingTurmoil: number = 26;
    public description: string;

    constructor() {
      this.description = 'Have ' + this.terraformRating + ' TR (or ' + this.terraformRatingTurmoil + ' with Turmoil)';
    }

    public getScore(player: Player): number {
      return player.getTerraformRating();
    }
    public canClaim(player: Player): boolean {
      if (player.game.gameOptions.turmoilExtension) {
        return this.getScore(player) >= this.terraformRatingTurmoil;
      }
      return this.getScore(player) >= this.terraformRating;
    }
}
