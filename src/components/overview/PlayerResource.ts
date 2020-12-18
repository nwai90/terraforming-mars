import Vue from 'vue';
import {DEFAULT_STEEL_VALUE, DEFAULT_TITANIUM_VALUE, HEAT_FOR_TEMPERATURE} from '../../constants';
import {Resources} from '../../Resources';
import {TurmoilModel} from '../../models/TurmoilModel';
import {PartyName} from '../../turmoil/parties/PartyName';
import {CardModel} from '../../models/CardModel';
import {CardName} from '../../CardName';

export const PlayerResource = Vue.component('player-resource', {
  props: {
    type: {
      type: String as () => Resources,
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
    corporationCard: {
      type: Object as () => CardModel || undefined,
    },
  },
  data: function() {
    // TODO: Update logic after PoliticalAgendas merge
    const unityTitaniumBonusActive: boolean = this.turmoil !== undefined && this.turmoil.ruling === PartyName.UNITY;

    let playerTitaniumValueWithOffset: number = this.titaniumValue;
    if (unityTitaniumBonusActive) playerTitaniumValueWithOffset -= 1;

    return {
      playerAdjustedTitaniumValue: playerTitaniumValueWithOffset,
    };
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
    isMetalUpgraded: function(): boolean {
      return (this.type === Resources.STEEL && this.steelValue > DEFAULT_STEEL_VALUE) || (this.type === Resources.TITANIUM && this.titaniumValue > DEFAULT_TITANIUM_VALUE);
    },
    getMetalBonus: function(): string {
      if (this.type === Resources.STEEL) {
        return `${this.steelValue}`;
      } else if (this.type === Resources.TITANIUM) {
        return `${this.titaniumValue}`;
      } else {
        return '';
      }
    },
    getClassForResourceCount: function(count: number): string {
      if (this.type === Resources.PLANTS && this.plantsNeededForGreenery !== undefined && count >= this.plantsNeededForGreenery) {
        return 'resource_item_stock_count resource-count-green-text';
      }

      if (this.type === Resources.HEAT) {
        let totalHeat: number = count;

        if (this.corporationCard.name === CardName.STORMCRAFT_INCORPORATED && this.corporationCard.resources !== undefined) {
          totalHeat += this.corporationCard.resources * 2;
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
                <div v-if="isMetalUpgraded()" class="resource_icon--metalbonus" v-html="getMetalBonus()"></div>
            </div>
        </div>
    `,
});
