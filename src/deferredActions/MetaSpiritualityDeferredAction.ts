import {Player} from '../Player';
import {AndOptions} from '../inputs/AndOptions';
import {SelectAmount} from '../inputs/SelectAmount';
import {DeferredAction, Priority} from './DeferredAction';

export class MetaSpiritualityDeferredAction implements DeferredAction {
  public priority = Priority.DEFAULT;
  constructor(
        public player: Player,
        public count: number = 1,
        public title: string = 'Meta Spirituality Global Event - Gain ' + count + ' standard resource(s)',
  ) {}

  public execute() {
    let megacreditsAmount: number = this.count >= 6 ? 1 : 0;
    let steelAmount: number = this.count >= 6 ? 1 : 0;
    let titaniumAmount: number = this.count >= 6 ? 1 : 0;
    let plantsAmount: number = this.count >= 6 ? 1 : 0;
    let energyAmount: number = this.count >= 6 ? 1 : 0;
    let heatAmount: number = this.count >= 6 ? 1 : 0;

    const amounts = [megacreditsAmount, steelAmount, titaniumAmount, plantsAmount, energyAmount, heatAmount];
    const minSelectionPerResource = Math.floor(this.count / 6);
    const maxSelectionPerResource = Math.ceil(this.count / 6);

    const selectMegacredit = new SelectAmount('Megacredits', 'Select', (amount: number) => {
      megacreditsAmount = amount;
      return undefined;
    }, minSelectionPerResource, maxSelectionPerResource);
    const selectSteel = new SelectAmount('Steel', 'Select', (amount: number) => {
      steelAmount = amount;
      return undefined;
    }, minSelectionPerResource, maxSelectionPerResource);
    const selectTitanium = new SelectAmount('Titanium', 'Select', (amount: number) => {
      titaniumAmount = amount;
      return undefined;
    }, minSelectionPerResource, maxSelectionPerResource);
    const selectPlants = new SelectAmount('Plants', 'Select', (amount: number) => {
      plantsAmount = amount;
      return undefined;
    }, minSelectionPerResource, maxSelectionPerResource);
    const selectEnergy = new SelectAmount('Energy', 'Select', (amount: number) => {
      energyAmount = amount;
      return undefined;
    }, minSelectionPerResource, maxSelectionPerResource);
    const selectHeat = new SelectAmount('Heat', 'Select', (amount: number) => {
      heatAmount = amount;
      return undefined;
    }, minSelectionPerResource, maxSelectionPerResource);

    const selectResources = new AndOptions(
      () => {
        if (
          megacreditsAmount +
                    steelAmount +
                    titaniumAmount +
                    plantsAmount +
                    energyAmount +
                    heatAmount > this.count
        ) {
          throw new Error('Need to select ' + this.count + ' resource(s)');
        }

        if (Math.min(...amounts) < minSelectionPerResource || Math.max(...amounts) > maxSelectionPerResource) {
          throw new Error('Must select at least ' + this.count + ' of each resource');
        }
        this.player.megaCredits += megacreditsAmount;
        this.player.steel += steelAmount;
        this.player.titanium += titaniumAmount;
        this.player.plants += plantsAmount;
        this.player.energy += energyAmount;
        this.player.heat += heatAmount;
        return undefined;
      },
      selectMegacredit,
      selectSteel,
      selectTitanium,
      selectPlants,
      selectEnergy,
      selectHeat,
    );
    selectResources.title = this.title;

    return selectResources;
  }
}
