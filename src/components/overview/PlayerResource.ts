import Vue from 'vue';
import {HEAT_FOR_TEMPERATURE} from '../../constants';
import {Resources} from '../../Resources';
import {TurmoilModel} from '../../models/TurmoilModel';
import {CardModel} from '../../models/CardModel';
import {CardName} from '../../CardName';

export const PlayerResource = Vue.component('player-resource', {
  props: {
    type: {
      type: String as () => Resources,
    },
    canUseHeatAsMegaCredits: {
      type: Boolean || undefined,
    },
    count: {
      type: Number,
    },
    production: {
      type: Number,
    },
    plantsAreProtected: {
      type: Boolean || undefined,
    },
    plantsNeededForGreenery: {
      type: Number || undefined,
    },
    steelValue: {
      type: Number,
    },
    titaniumValue: {
      type: Number,
    },
    turmoil: {
      type: Object as () => TurmoilModel || undefined,
    },
    corporationCards: {
      type: Array as () => Array<CardModel>,
    },
  },
  data: function() {
    return {};
  },
  methods: {
    mainCSS: function(): string {
      return 'resource_item--' + this.type;
    },
    iconCSS: function(): string {
      return 'resource_icon--' + this.type;
    },
    productionSign: function(): string {
      if (this.production > 0) return '+';
      return '';
    },
    displayPlantsProtectedIcon: function(): boolean {
      return this.type === Resources.PLANTS && this.plantsAreProtected;
    },
    showResourceValue: function(): boolean {
      switch (this.type) {
      case Resources.STEEL:
        return true;
      case Resources.TITANIUM:
        return true;
      case Resources.HEAT:
        return this.canUseHeatAsMegaCredits;
      default:
        return false;
      }
    },
    getResourceValue: function(): string {
      if (this.type === Resources.STEEL) {
        return `${this.steelValue}`;
      } else if (this.type === Resources.TITANIUM) {
        return `${this.titaniumValue}`;
      } else if (this.type === Resources.HEAT && this.canUseHeatAsMegaCredits) {
        return '1';
      } else {
        return '';
      }
    },
    getClassForResourceCount: function(count: number): string {
      if (this.type === Resources.PLANTS && this.plantsNeededForGreenery !== undefined && count >= this.plantsNeededForGreenery) {
        return 'resource_item_stock_count resource-count-green-text';
      }

      if (this.type === Resources.HEAT && this.corporationCards.length > 0) {
        let totalHeat: number = count;

        const stormcraft = this.corporationCards.find((corp) => corp.name === CardName.STORMCRAFT_INCORPORATED);

        if (stormcraft !== undefined && stormcraft.resources !== undefined) {
          totalHeat += stormcraft.resources * 2;
        }

        if (totalHeat >= HEAT_FOR_TEMPERATURE) return 'resource_item_stock_count resource-count-orange-text';
      }

      return 'resource_item_stock_count';
    }
  },
  template: `
        <div class="resource_item" :class="mainCSS()">
            <div class="resource_item_stock">
                <i class="resource_icon" :class="iconCSS()"></i>
                <div :class="getClassForResourceCount(count)">{{ count }}</div>
            </div>
            <div class="resource_item_prod">
                <span class="resource_item_prod_count">{{ productionSign() }}{{ production }}</span>
                <div v-if="displayPlantsProtectedIcon()" class="shield_icon"></div>
                <div v-if="showResourceValue()" class="resource_icon--metalbonus">{{ getResourceValue() }}</div>
            </div>
        </div>
    `,
});
