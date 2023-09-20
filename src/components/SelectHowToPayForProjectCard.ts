import Vue from 'vue';
import {Button} from './common/Button';

interface SelectHowToPayForProjectCardModel {
  cardName: CardName;
  card: CardModel;
  cards: Array<CardModel>;
  cost: number;
  tags: Array<Tags>
  heat: number;
  megaCredits: number;
  mustSpendAtMost: number;
  steel: number;
  titanium: number;
  microbes: number;
  floaters: number;
  science: number;
  graphene: number;
  asteroids: number;
  plants: number;
  spireScience: number;
  warning: string | undefined;
  available: Units;
}

import {HowToPay} from '../inputs/HowToPay';
import {Card} from './card/Card';
import {CardFinder} from '../CardFinder';
import {Tags} from '../cards/Tags';
import {CardModel} from '../models/CardModel';
import {CardOrderStorage} from './CardOrderStorage';
import {PaymentWidgetMixin} from './PaymentWidgetMixin';
import {PlayerInputModel} from '../models/PlayerInputModel';
import {PlayerModel} from '../models/PlayerModel';
import {PreferencesManager} from './PreferencesManager';
import {TranslateMixin} from './TranslateMixin';
import {CardName} from '../CardName';
import {Units} from '../Units';
import {DEFAULT_FLOATERS_VALUE, DEFAULT_MICROBES_VALUE, DEFAULT_STEEL_VALUE, DEFAULT_TITANIUM_VALUE, DEFAULT_GRAPHENE_VALUE, DEFAULT_PLANT_VALUE, DEFAULT_SPIRE_SCIENCE_VALUE} from '../constants';

export const SelectHowToPayForProjectCard = Vue.component('select-how-to-pay-for-project-card', {
  props: {
    player: {
      type: Object as () => PlayerModel,
    },
    playerinput: {
      type: Object as () => PlayerInputModel,
    },
    onsave: {
      type: Function as unknown as () => (out: Array<Array<string>>) => void,
    },
    showsave: {
      type: Boolean,
    },
    showtitle: {
      type: Boolean,
    },
  },
  data: function(): SelectHowToPayForProjectCardModel {
    let card: CardModel | undefined;
    let cards: Array<CardModel> = [];
    if (this.playerinput !== undefined &&
            this.playerinput.cards !== undefined &&
            this.playerinput.cards.length > 0) {
      cards = CardOrderStorage.getOrdered(
        CardOrderStorage.getCardOrder(this.player.id),
        this.playerinput.cards,
      );
      card = cards[0];
    }
    if (card === undefined) {
      throw new Error('no card provided in player input');
    }
    return {
      cardName: card.name,
      card: card,
      cards: cards,
      cost: 0,
      tags: [],
      heat: 0,
      megaCredits: 0,
      mustSpendAtMost: 0,
      steel: 0,
      titanium: 0,
      microbes: 0,
      science: 0,
      floaters: 0,
      graphene: 0,
      asteroids: 0,
      plants: 0,
      spireScience: 0,
      warning: undefined,
      available: Units.of({}),
    };
  },
  components: {
    Card,
    Button,
  },
  mixins: [PaymentWidgetMixin, TranslateMixin],
  mounted: function() {
    const app = this;
    Vue.nextTick(function() {
      app.$data.card = app.getCard();
      app.$data.cost = app.$data.card.calculatedCost;
      app.$data.tags = app.getCardTags(),

      app.$data.mustSpendAtMost = (app as unknown as typeof PaymentWidgetMixin.methods).getMegaCreditsMax();
      app.$data.megaCredits = app.$data.mustSpendAtMost;

      app.setDefaultValues();
    });
  },
  methods: {
    getCard: function() {
      const card = this.cards.find((c) => c.name === this.cardName); // this.player.cardsInHand.concat(this.player.selfReplicatingRobotsCards).find((c) => c.name === this.cardName);
      if (card === undefined) {
        throw new Error(`card not found ${this.cardName}`);
      }
      return card;
    },
    getCardTags: function() {
      const card = new CardFinder().getProjectCardByName(this.cardName);
      if (card === undefined) {
        throw new Error(`card not found ${this.cardName}`);
      }
      return card.tags;
    },
    setDefaultValues: function() {
      this.microbes = 0;
      this.floaters = 0;
      this.science = 0;
      this.steel = 0;
      this.titanium = 0;
      this.heat = 0;
      this.graphene = 0;
      this.asteroids = 0;
      this.plants = 0;
      this.spireScience = 0;

      const units = this.card.reserveUnits || Units.EMPTY;
      let megacreditBalance = Math.max(this.cost - this.mustSpendAtMost + units.megacredits, 0);

      // Calculates the optimal number of units to use given the unit value.
      //
      // It reads `megacreditBalance` as the remaining balance, and deducts the
      // consumed balance as part of this method.
      //
      // It returns the number of units consumed from availableUnits to make that
      const deductUnits = function(
        availableUnits: number | undefined,
        unitValue: number,
        overpay: boolean = true): number {
        if (availableUnits === undefined || availableUnits === 0) {
          return 0;
        }
        // The number of units required to sell to meet the balance.
        const _tmp = megacreditBalance / unitValue;
        const balanceAsUnits = overpay ? Math.ceil(_tmp) : Math.floor(_tmp);
        const contributingUnits = Math.min(availableUnits, balanceAsUnits);

        megacreditBalance -= contributingUnits * unitValue;
        return contributingUnits;
      };

      // This function help save some money at the end
      const saveOverSpendingUnits = function(
        spendingUnits: number | undefined,
        unitValue: number): number {
        if (spendingUnits === undefined || spendingUnits === 0 || megacreditBalance === 0) {
          return 0;
        }
        // Calculate the unit of resource we can save and still pay enough
        const overSpendingAsUnits = Math.floor(Math.abs(megacreditBalance) / unitValue);
        const toSaveUnits = Math.min(spendingUnits, overSpendingAsUnits);

        megacreditBalance += toSaveUnits * unitValue;
        return toSaveUnits;
      };

      if (megacreditBalance > 0 && this.canUseMicrobes()) {
        this.microbes = deductUnits(this.playerinput.microbes, DEFAULT_MICROBES_VALUE);
      }

      if (megacreditBalance > 0 && this.canUseFloaters()) {
        this.floaters = deductUnits(this.playerinput.floaters, DEFAULT_FLOATERS_VALUE);
      }

      if (megacreditBalance > 0 && this.canUseScience()) {
        this.science = deductUnits(this.playerinput.science, 1);
      }

      if (megacreditBalance > 0 && this.canUseAsteroids()) {
        this.asteroids = deductUnits(this.playerinput.asteroids, 1);
      }

      if (megacreditBalance > 0 && this.canUseSpireScience()) {
        this.spireScience = deductUnits(this.playerinput.spireScience, DEFAULT_SPIRE_SCIENCE_VALUE);
      }

      if (megacreditBalance > 0 && this.canUseGraphene()) {
        this.graphene = deductUnits(this.playerinput.graphene, DEFAULT_GRAPHENE_VALUE);
      }

      this.available.steel = Math.max(this.player.steel - this.card.reserveUnits.steel, 0);
      if (megacreditBalance > 0 && this.canUseSteel()) {
        this.steel = deductUnits(this.available.steel, this.player.steelValue, true);
      }

      this.available.plants = this.player.plants;
      if (megacreditBalance > 0 && this.canUsePlants()) {
        this.plants = deductUnits(this.available.plants, DEFAULT_PLANT_VALUE, true);
      }

      this.available.titanium = Math.max(this.player.titanium - this.card.reserveUnits.titanium, 0);
      if (megacreditBalance > 0 && this.canUseTitanium()) {
        this.titanium = deductUnits(this.available.titanium, this.player.titaniumValue, true);
      }

      this.available.heat = Math.max(this.availableHeat() - this.card.reserveUnits.heat, 0);

      if (megacreditBalance > 0 && this.canUseHeat()) {
        this.heat = deductUnits(this.available.heat, 1);
      }

      // If we are overspending
      if (megacreditBalance - this.card.reserveUnits.megacredits < 0) {
        // Try to spend less resource if possible, in the reverse order of the payment (also from high to low)
        // We need not try to save heat since heat is paid last at value 1. We will never overspend in heat.
        // We do not need to save Ti either because Ti is paid last before heat. If we overspend, it is because of Ti.
        // We cannot reduce the amount of Ti and still pay enough.
        this.plants -= saveOverSpendingUnits(this.plants, DEFAULT_PLANT_VALUE);
        this.steel -= saveOverSpendingUnits(this.steel, this.player.steelValue);
        this.floaters -= saveOverSpendingUnits(this.floaters, DEFAULT_FLOATERS_VALUE);
        this.microbes -= saveOverSpendingUnits(this.microbes, DEFAULT_MICROBES_VALUE);
        this.science -= saveOverSpendingUnits(this.science, 1);
        this.asteroids -= saveOverSpendingUnits(this.asteroids, 1);
        this.graphene -= saveOverSpendingUnits(this.graphene, DEFAULT_GRAPHENE_VALUE);
        this.spireScience -= saveOverSpendingUnits(this.spireScience, DEFAULT_SPIRE_SCIENCE_VALUE);
      }

      let finalmegaCreditsCost = this.cost;
      finalmegaCreditsCost -= (this.titanium || 0) * (this.player.titaniumValue || DEFAULT_TITANIUM_VALUE);
      finalmegaCreditsCost -= (this.plants || 0) * DEFAULT_PLANT_VALUE;
      finalmegaCreditsCost -= (this.steel || 0) * (this.player.steelValue || DEFAULT_STEEL_VALUE);
      finalmegaCreditsCost -= (this.floaters || 0) * DEFAULT_FLOATERS_VALUE;
      finalmegaCreditsCost -= (this.microbes || 0) * DEFAULT_MICROBES_VALUE;
      finalmegaCreditsCost -= this.heat || 0;
      finalmegaCreditsCost -= this.science || 0;
      finalmegaCreditsCost -= this.asteroids || 0;
      finalmegaCreditsCost -= (this.graphene || 0) * DEFAULT_GRAPHENE_VALUE;
      finalmegaCreditsCost -= (this.spireScience || 0) * DEFAULT_SPIRE_SCIENCE_VALUE;

      this.megaCredits = Math.max(0, finalmegaCreditsCost);
    },
    availableHeat: function(): number {
      const availableHeat = this.player.heat - this.card?.reserveUnits?.heat;
      const stormcraft = this.player.corporationCards.find((c) => c.name === CardName.STORMCRAFT_INCORPORATED);

      if (stormcraft !== undefined && stormcraft.resources !== undefined) {
        return availableHeat + (stormcraft.resources * 2);
      }

      return availableHeat;
    },
    canUseHeat: function(): boolean {
      return this.playerinput.canUseHeat === true && this.availableHeat() > 0;
    },
    canUsePlants: function() {
      const martianLumberCorp = this.player.playedCards.find((c) => c.name === CardName.MARTIAN_LUMBER_CORP);

      if (this.card !== undefined && martianLumberCorp !== undefined && this.available.plants > 0) {
        if (this.tags.find((tag) => tag === Tags.BUILDING) !== undefined) {
          return true;
        }
      }
      return false;
    },
    canUseSteel: function() {
      if (this.card !== undefined && this.available.steel > 0) {
        if (this.tags.find((tag) => tag === Tags.BUILDING) !== undefined) {
          return true;
        }
      }
      return false;
    },
    canUseTitanium: function() {
      if (this.card !== undefined && this.available.titanium > 0) {
        if (this.tags.find((tag) => tag === Tags.SPACE) !== undefined) {
          return true;
        }
      }
      return false;
    },
    canUseMicrobes: function() {
      // FYI Microbes are limited to the Psychrophiles card, which allows spending microbes for Plant cards.
      if (this.card !== undefined && this.playerinput.microbes !== undefined && this.playerinput.microbes > 0) {
        if (this.tags.find((tag) => tag === Tags.PLANT) !== undefined) {
          return true;
        }
      }
      return false;
    },
    canUseFloaters: function() {
      // FYI Floaters are limited to the DIRIGIBLES card.
      if (this.card !== undefined && this.playerinput.floaters !== undefined && this.playerinput.floaters > 0) {
        if (this.tags.find((tag) => tag === Tags.VENUS) !== undefined) {
          return true;
        }
      }
      return false;
    },
    canUseScience: function() {
      // FYI Science Resources are limited to the Luna Archive card, which allows spending its science resources for Moon cards.
      if (this.card !== undefined && (this.playerinput.science ?? 0) > 0) {
        if (this.tags.find((tag) => tag === Tags.MOON) !== undefined) {
          return true;
        }
      }
      return false;
    },
    canUseAsteroids: function() {
      // Asteroid resources are limited to the Kuiper Cooperative card, which allows spending its resources for SP Asteroid or Aquifer.
      if (this.card !== undefined && (this.playerinput.asteroids ?? 0) > 0) {
        if (this.cardName === CardName.ASTEROID_STANDARD_PROJECT || this.cardName === CardName.AQUIFER_STANDARD_PROJECT) {
          return true;
        }
      }
      return false;
    },
    canUseSpireScience: function() {
      const standardProjectNames = [
        CardName.ASTEROID_STANDARD_PROJECT,
        CardName.AQUIFER_STANDARD_PROJECT,
        CardName.CITY_STANDARD_PROJECT,
        CardName.GREENERY_STANDARD_PROJECT,
        CardName.POWER_PLANT_STANDARD_PROJECT,
        CardName.POWER_PLANT_STANDARD_PROJECT_THORGATE,
        CardName.BUFFER_GAS_STANDARD_PROJECT,
        CardName.AIR_SCRAPPING_STANDARD_PROJECT,
        CardName.AIR_SCRAPPING_STANDARD_PROJECT_VARIANT,
        CardName.BUILD_COLONY_STANDARD_PROJECT,
        CardName.MOON_COLONY_STANDARD_PROJECT,
        CardName.MOON_COLONY_STANDARD_PROJECT_V2,
        CardName.MOON_MINE_STANDARD_PROJECT,
        CardName.MOON_MINE_STANDARD_PROJECT_V2,
        CardName.MOON_ROAD_STANDARD_PROJECT,
        CardName.MOON_ROAD_STANDARD_PROJECT_V2,
      ];

      if (this.card !== undefined && (this.playerinput.spireScience ?? 0) > 0) {
        if (standardProjectNames.includes(this.cardName)) {
          return true;
        }
      }
      return false;
    },
    canUseGraphene: function() {
      // Graphene resources are limited to the Carbon Nanosystems card, which allows spending graphene resources for Space or City cards.
      if (this.card !== undefined && this.playerinput.graphene !== undefined && this.playerinput.graphene > 0) {
        if (this.tags.find((tag) => tag === Tags.SPACE || tag === Tags.CITY) !== undefined) {
          return true;
        }
      }
      return false;
    },
    cardChanged: function() {
      this.card = this.getCard();
      this.cost = this.card.calculatedCost || 0;
      this.tags = this.getCardTags();

      this.megaCredits = (this as unknown as typeof PaymentWidgetMixin.methods).getMegaCreditsMax();

      this.setDefaultValues();
    },
    hasWarning: function(): boolean {
      return this.warning !== undefined;
    },
    hasCardWarning: function(): boolean {
      return this.card !== undefined && this.card.warning !== undefined;
    },
    showReserveMegaCreditsWarning: function(): boolean {
      if (!this.canUseSteel() && !this.canUseTitanium()) return false;
      if (this.card?.reserveUnits?.megacredits === undefined) return false;
      if (this.card.reserveUnits.megacredits === 0) return false;

      return this.card.reserveUnits.megacredits > 0 && this.player.megaCredits < this.cost + this.card.reserveUnits.megacredits;
    },
    showReserveSteelWarning: function(): boolean {
      return this.card?.reserveUnits?.steel > 0 && this.canUseSteel();
    },
    showReserveTitaniumWarning: function(): boolean {
      return this.card?.reserveUnits?.titanium > 0 && this.canUseTitanium();
    },
    showReserveHeatWarning: function(): boolean {
      return this.card?.reserveUnits?.heat > 0 && this.canUseHeat();
    },
    saveData: function() {
      const htp: HowToPay = {
        heat: this.heat,
        megaCredits: this.megaCredits,
        steel: this.steel,
        titanium: this.titanium,
        microbes: this.microbes,
        floaters: this.floaters,
        science: this.science,
        graphene: this.graphene,
        asteroids: this.asteroids,
        plants: this.plants,
        spireScience: this.spireScience,
      };
      if (htp.megaCredits > this.player.megaCredits) {
        this.warning = 'You don\'t have that many M€';
        return;
      }
      if (this.playerinput.microbes !== undefined && htp.microbes > this.playerinput.microbes) {
        this.warning = 'You don\'t have enough microbes';
        return;
      }
      if (this.playerinput.floaters !== undefined && htp.floaters > this.playerinput.floaters) {
        this.warning = 'You don\'t have enough floaters';
        return;
      }
      if (this.playerinput.science !== undefined && htp.science > this.playerinput.science) {
        this.warning = 'You don\'t have enough science resources';
        return;
      }
      if (this.playerinput.graphene !== undefined && htp.graphene > this.playerinput.graphene) {
        this.warning = 'You don\'t have enough graphene resources';
        return;
      }
      if (this.playerinput.asteroids !== undefined && htp.asteroids > this.playerinput.asteroids) {
        this.warning = 'You don\'t have enough asteroid resources';
        return;
      }
      if (this.playerinput.spireScience !== undefined && htp.spireScience > this.playerinput.spireScience) {
        this.warning = 'You don\'t have enough science resources';
        return;
      }
      if (htp.heat > this.availableHeat()) {
        this.warning = 'You don\'t have enough heat';
        return;
      }
      if (htp.titanium > this.player.titanium) {
        this.warning = 'You don\'t have enough titanium';
        return;
      }
      if (htp.plants > this.player.plants) {
        this.warning = 'You don\'t have enough plants';
        return;
      }
      if (htp.steel > this.player.steel) {
        this.warning = 'You don\'t have enough steel';
        return;
      }

      const totalSpentAmt =
        (DEFAULT_FLOATERS_VALUE * htp.floaters) +
        (DEFAULT_MICROBES_VALUE * htp.microbes) +
        (DEFAULT_GRAPHENE_VALUE * htp.graphene) +
        (DEFAULT_PLANT_VALUE * htp.plants) +
        (DEFAULT_SPIRE_SCIENCE_VALUE * htp.spireScience) +
        htp.asteroids +
        htp.science +
        htp.heat +
        htp.megaCredits +
        (htp.steel * this.player.steelValue) +
        (htp.titanium * this.player.titaniumValue);

      if (totalSpentAmt < this.cost) {
        this.warning = 'Haven\'t spent enough';
        return;
      }

      if (totalSpentAmt > this.cost) {
        const diff = totalSpentAmt - this.cost;
        if (htp.titanium && diff >= this.player.titaniumValue) {
          this.warning = 'You cannot overspend titanium';
          return;
        }
        if (htp.plants && diff >= DEFAULT_PLANT_VALUE) {
          this.warning = 'You cannot overspend plants';
          return;
        }
        if (htp.steel && diff >= this.player.steelValue) {
          this.warning = 'You cannot overspend steel';
          return;
        }
        if (htp.floaters && diff >= DEFAULT_FLOATERS_VALUE) {
          this.warning = 'You cannot overspend floaters';
          return;
        }
        if (htp.microbes && diff >= DEFAULT_MICROBES_VALUE) {
          this.warning = 'You cannot overspend microbes';
          return;
        }
        if (htp.science && diff >= 1) {
          this.warning = 'You cannot overspend science resources';
          return;
        }
        if (htp.spireScience && diff >= DEFAULT_SPIRE_SCIENCE_VALUE) {
          this.warning = 'You cannot overspend science resources';
          return;
        }
        if (htp.asteroids && diff >= 1) {
          this.warning = 'You cannot overspend asteroid resources';
          return;
        }
        if (htp.graphene && diff >= DEFAULT_GRAPHENE_VALUE) {
          this.warning = 'You cannot overspend graphene resources';
          return;
        }
        if (htp.heat && diff >= 1) {
          this.warning = 'You cannot overspend heat';
          return;
        }
        if (htp.megaCredits && diff >= 1) {
          this.warning = 'You cannot overspend M€';
          return;
        }
      }

      if (htp.megaCredits > this.player.megaCredits - this.card.reserveUnits.megacredits) {
        this.warning = 'Must save enough M€ for Reds';
        return;
      }

      const showAlert = PreferencesManager.load('show_alerts') === '1';

      if (totalSpentAmt > this.cost && showAlert) {
        const diff = totalSpentAmt - this.cost;

        if (confirm('Warning: You are overpaying by ' + diff + ' M€')) {
          this.onsave([[
            this.card.name,
            JSON.stringify(htp),
          ]]);
        } else {
          this.warning = 'Please adjust payment amount';
          return;
        }
      } else {
        this.onsave([[
          this.card.name,
          JSON.stringify(htp),
        ]]);
      }
    },
    robotCard(card: CardModel): CardModel | undefined {
      return this.player.selfReplicatingRobotsCards?.find((r) => r.name === card.name);
    },
  },
  template: `<div class="payments_cont">

  <div v-if="showtitle === true">{{ $t(playerinput.title) }}</div>

  <label v-for="availableCard in cards" class="payments_cards">
    <input class="hidden" type="radio" v-model="cardName" v-on:change="cardChanged()" :value="availableCard.name" />
    <Card class="cardbox" :card="availableCard" :robotCard="robotCard(availableCard)"/>
  </label>

  <section v-trim-whitespace>
    <div v-if="hasCardWarning()" class="card-warning">{{ $t(card.warning) }}</div>

    <h3 class="payments_title" v-i18n>How to pay?</h3>

    <div class="payments_type input-group" v-if="canUsePlants()">
      <i class="resource_icon resource_icon--plants payments_type_icon" title="Pay by Plants"></i>
      <Button type="minus" :onClick="_=>reduceValue('plants', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="plants" />
      <Button type="plus" :onClick="_=>addValue('plants', 1, this.available.plants)" />
      <Button type="max" :onClick="_=>setMaxValue('plants', this.available.plants)" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="canUseSteel()">
      <i class="resource_icon resource_icon--steel payments_type_icon" title="Pay by Steel"></i>
      <Button type="minus" :onClick="_=>reduceValue('steel', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="steel" />
      <Button type="plus" :onClick="_=>addValue('steel', 1, this.available.steel)" />
      <Button type="max" :onClick="_=>setMaxValue('steel', this.available.steel)" title="MAX" />
    </div>
    <div v-if="showReserveSteelWarning()" class="card-warning" v-i18n>
    (Some steel is unavailable here in reserve for the project card.)
    </div>

    <div class="payments_type input-group" v-if="canUseSpireScience()">
      <i class="resource_icon resource_icon--science payments_type_icon" :title="$t('Pay by Science')"></i>
      <Button type="minus" :onClick="_=>reduceValue('spireScience', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="spireScience" />
      <Button type="plus" :onClick="_=>addValue('spireScience', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('spireScience')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="canUseAsteroids()">
      <i class="resource_icon resource_icon--asteroid payments_type_icon" :title="$t('Pay by Asteroids')"></i>
      <Button type="minus" :onClick="_=>reduceValue('asteroids', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="asteroids" />
      <Button type="plus" :onClick="_=>addValue('asteroids', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('asteroids')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="canUseGraphene()">
      <i class="resource_icon resource_icon--graphene payments_type_icon" :title="$t('Pay by Graphene')"></i>
      <Button type="minus" :onClick="_=>reduceValue('graphene', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="graphene" />
      <Button type="plus" :onClick="_=>addValue('graphene', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('graphene')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="canUseTitanium()">
      <i class="resource_icon resource_icon--titanium payments_type_icon" :title="$t('Pay by Titanium')"></i>
      <Button type="minus" :onClick="_=>reduceValue('titanium', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="titanium" />
      <Button type="plus" :onClick="_=>addValue('titanium', 1, this.available.titanium)" />
      <Button type="max" :onClick="_=>setMaxValue('titanium', this.available.titanium)" title="MAX" />
    </div>
    <div v-if="showReserveTitaniumWarning()" class="card-warning" v-i18n>
    (Some titanium is unavailable here in reserve for the project card.)
    </div>

    <div class="payments_type input-group" v-if="canUseHeat()">
      <i class="resource_icon resource_icon--heat payments_type_icon" :title="$t('Pay by Heat')"></i>
      <Button type="minus" :onClick="_=>reduceValue('heat', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="heat" />
      <Button type="plus" :onClick="_=>addValue('heat', 1, this.available.heat)" />
      <Button type="max" :onClick="_=>setMaxValue('heat', this.availableHeat())" title="MAX" />
    </div>
    <div v-if="showReserveHeatWarning()" class="card-warning" v-i18n>
    (Some heat is unavailable here in reserve for the project card.)
    </div>

    <div class="payments_type input-group" v-if="canUseMicrobes()">
      <i class="resource_icon resource_icon--microbe payments_type_icon" :title="$t('Pay by Microbes')"></i>
      <Button type="minus" :onClick="_=>reduceValue('microbes', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="microbes" />
      <Button type="plus" :onClick="_=>addValue('microbes', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('microbes')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="canUseFloaters()">
      <i class="resource_icon resource_icon--floater payments_type_icon" :title="$t('Pay by Floaters')"></i>
      <Button type="minus" :onClick="_=>reduceValue('floaters', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="floaters" />
      <Button type="plus" :onClick="_=>addValue('floaters', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('floaters')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="canUseScience()">
      <i class="resource_icon resource_icon--science payments_type_icon" :title="$t('Pay by Science Resources')"></i>
      <Button type="minus" :onClick="_=>reduceValue('science', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="science" />
      <Button type="plus" :onClick="_=>addValue('science', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('science')" title="MAX" />
    </div>

    <div class="payments_type input-group">
      <i class="resource_icon resource_icon--megacredits payments_type_icon" :title="$t('Pay by Megacredits')"></i>
      <Button type="minus" :onClick="_=>reduceValue('megaCredits', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="megaCredits" />
      <Button type="plus" :onClick="_=>addValue('megaCredits', 1)" />
    </div>
    <div v-if="showReserveMegaCreditsWarning()" class="card-warning" v-i18n>
    (Some M€ is unavailable here in reserve for Reds.)
    </div>

    <div v-if="hasWarning()" class="tm-warning">
      <label class="label label-error">{{ $t(warning) }}</label>
    </div>

    <div v-if="showsave === true" class="payments_save">
      <Button size="big" :onClick="saveData" :title="playerinput.buttonLabel" />
    </div>
  </section>
</div>`,
});
