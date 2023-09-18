import {Player} from '../Player';
import {SelectHowToPay} from '../inputs/SelectHowToPay';
import {HowToPay} from '../inputs/HowToPay';
import {DeferredAction, Priority} from './DeferredAction';

export class SelectHowToPayDeferred implements DeferredAction {
  public priority = Priority.DEFAULT;
  constructor(
        public player: Player,
        public amount: number,
        public options: SelectHowToPayDeferred.Options = {},
  ) {}

  public execute() {
    this.player.totalSpend += this.amount;

    if ((!this.player.canUseHeatAsMegaCredits || this.player.availableHeat === 0) &&
            (!this.options.canUseSteel || this.player.steel === 0) &&
            (!this.options.canUsePlants || this.player.plants === 0) &&
            (!this.options.canUseTitanium || this.player.titanium === 0) &&
            !this.options.canUseAsteroids && !this.options.canUseGraphene) {
      this.player.megaCredits -= this.amount;
      if (this.options.afterPay !== undefined) {
        this.options.afterPay();
      }
      return undefined;
    }

    return new SelectHowToPay(
      this.options.title || 'Select how to spend ' + this.amount + ' M€',
      this.options.canUseSteel || false,
      this.options.canUseTitanium || false,
      this.player.canUseHeatAsMegaCredits && this.player.availableHeat > 0,
      this.options.canUseGraphene || false,
      this.options.canUseAsteroids|| false,
      this.options.canUsePlants || false,
      this.amount,
      (howToPay: HowToPay) => {
        this.player.plants -= howToPay.plants;
        this.player.steel -= howToPay.steel;
        this.player.titanium -= howToPay.titanium;
        this.player.megaCredits -= howToPay.megaCredits;
        this.player.spendGraphene(howToPay.graphene);
        this.player.spendAsteroids(howToPay.asteroids);
        this.player.game.defer(new DeferredAction(this.player, () => this.player.spendHeat(howToPay.heat)));
        if (this.options.afterPay !== undefined) {
          this.options.afterPay();
        }
        return undefined;
      },
    );
  }
}

export namespace SelectHowToPayDeferred {
  export interface Options {
    canUsePlants?: boolean;
    canUseSteel?: boolean;
    canUseTitanium?: boolean;
    canUseGraphene?: boolean;
    canUseAsteroids?: boolean;
    title?: string;
    afterPay?: () => void;
  };
}
