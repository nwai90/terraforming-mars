// Common code for SelectHowToPay and SelectHowToPayForProjectCard
import {CardName} from '../CardName';
import {CardModel} from '../models/CardModel';
import {ResourceType} from '../ResourceType';

export const PaymentWidgetMixin = {
  'name': 'PaymentWidgetMixin',
  'methods': {
    getMegaCreditsMax: function(): number {
      const $this = (this as any);

      if ($this.$data.card !== undefined && $this.playerinput !== undefined && $this.playerinput.cards !== undefined) {
        const card = ($this.playerinput.cards as Array<CardModel>).find((card) => $this.$data.card.name === card.name);
        if (card !== undefined && card.mustSpendAtMost !== undefined) {
          return card.mustSpendAtMost;
        }
      }

      return Math.min($this.player.megaCredits, $this.$data.cost);
    },
    getCssClassFor: function(action: string, target: string): string {
      const currentValue: number = (this as any)[target];
      const maxValue: number = (this as any).player[target];
      const disablingLimit = (action === '<') ? 0 : maxValue;

      if (currentValue === disablingLimit) return 'is-disabled';
      return 'is-primary';
    },
    getResourceRate: function(resourceName: string): number {
      let rate = 1; // one resource == one money
      if (resourceName === 'titanium') {
        rate = (this as any).player.titaniumValue;
      } else if (resourceName === 'steel') {
        rate = (this as any).player.steelValue;
      } else if (resourceName === 'microbes') {
        rate = 2;
      } else if (resourceName === 'floaters' || resourceName === 'plants') {
        rate = 3;
      } else if (resourceName === 'graphene') {
        rate = 4;
      }
      return rate;
    },
    reduceValue: function(target: string, to: number): void {
      const currentValue: number = (this as any)[target];

      if (currentValue === 0) return;

      const realTo = Math.min(to, currentValue);
      (this as any)[target] -= realTo;

      if (target === 'megaCredits' || realTo === 0) return;

      this.setRemainingMCValue();
    },
    addValue: function(target: string, to: number, max?: number): void {
      const currentValue: number = (this as any)[target];
      let maxValue: number = max ?? (this as any).player[target];

      if (target === 'megaCredits') {
        maxValue = this.getMegaCreditsMax();
      }

      if (target === 'asteroids') {
        maxValue = this.availableAsteroids();
      }

      if (target === 'microbes') maxValue = (this as any).playerinput.microbes;
      if (target === 'floaters') {
        maxValue = (this as any).playerinput.floaters;
        if (this.isStratosphericBirdsEdgeCase()) maxValue--;
      }
      if (target === 'science') maxValue = (this as any).playerinput.science;
      if (target === 'graphene') maxValue = (this as any).playerinput.graphene;
      
      if (currentValue === maxValue) return;

      const realTo = (currentValue + to <= maxValue) ? to : maxValue - currentValue;
      (this as any)[target] += realTo;

      if (target === 'megaCredits' || realTo === 0) return;

      this.setRemainingMCValue();
    },
    setRemainingMCValue: function(): void {
      const remainingMC: number = (this as any).$data.cost -
              (this as any)['heat'] -
              (this as any)['titanium'] * this.getResourceRate('titanium') -
              (this as any)['plants'] * this.getResourceRate('plants') -
              (this as any)['steel'] * this.getResourceRate('steel') -
              (this as any)['microbes'] * this.getResourceRate('microbes') -
              (this as any)['floaters'] * this.getResourceRate('floaters') -
              (this as any)['graphene'] * this.getResourceRate('graphene') -
              ((this as any)['asteroids'] ?? 0) -
              ((this as any)['science'] ?? 0);

      (this as any)['megaCredits'] = Math.max(0, Math.min(this.getMegaCreditsMax(), remainingMC));
    },
    setMaxValue: function(target: string, max?: number): void {
      let currentValue: number = (this as any)[target];
      const cardCost: number = (this as any).$data.cost;
      let amountHave: number = max ?? (this as any).player[target];
      if (target === 'heat') amountHave = this.availableHeat();
      if (target === 'asteroids') amountHave = this.availableAsteroids();

      let amountNeed: number = cardCost;
      if (['titanium', 'steel', 'microbes', 'floaters', 'graphene', 'plants'].includes(target)) {
        amountNeed = Math.floor(cardCost/this.getResourceRate(target));
      }

      if (target === 'microbes') amountHave = (this as any).playerinput.microbes;
      if (target === 'floaters') {
        amountHave = (this as any).playerinput.floaters;
        if (this.isStratosphericBirdsEdgeCase()) amountHave--;
      }
      if (target === 'science') amountHave = (this as any).playerinput.science;
      
      if (target === 'graphene') amountHave = (this as any).playerinput.graphene;

      while (currentValue < amountHave && currentValue < amountNeed) {
        this.addValue(target, 1, max);
        currentValue++;
      }
    },
    isStratosphericBirdsEdgeCase: function(): boolean {
      if ((this as any).$data.card.name === CardName.STRATOSPHERIC_BIRDS) {
        const playedCards = (this as any).player.playedCards as Array<CardModel>;
        const cardsWithFloaters = playedCards.filter((card) => card.resourceType === ResourceType.FLOATER && (card.resources ?? 0) > 0);
        return cardsWithFloaters.length === 1;
      }
      return false;
    },
    availableAsteroids(): number {
      const thisPlayer = (this as any).player;
      const corpCards = thisPlayer.corporationCards as Array<CardModel>;
      
      const kuiperCooperative = corpCards.find((card) => card.name === CardName.KUIPER_COOPERATIVE);
      if (kuiperCooperative !== undefined && kuiperCooperative.resources !== undefined) {
        return kuiperCooperative.resources;
      }

      return 0;
    },
    availableHeat(): number {
      const thisPlayer = (this as any).player;
      const corpCards = thisPlayer.corporationCards as Array<CardModel>;

      const stormcraft = corpCards.find((card) => card.name === CardName.STORMCRAFT_INCORPORATED);
      if (stormcraft !== undefined && stormcraft.resources !== undefined) {
        return thisPlayer['heat'] + (stormcraft.resources * 2);
      }

      return thisPlayer['heat'];
    },
  },
};
