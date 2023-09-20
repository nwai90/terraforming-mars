
import Vue from 'vue';
import {HowToPay} from '../inputs/HowToPay';
import {PaymentWidgetMixin} from './PaymentWidgetMixin';
import {PlayerInputModel} from '../models/PlayerInputModel';
import {PlayerModel} from '../models/PlayerModel';
import {PreferencesManager} from './PreferencesManager';
import {Button} from '../components/common/Button';
import {TranslateMixin} from './TranslateMixin';
import {CardName} from '../CardName';
import {DEFAULT_GRAPHENE_VALUE, DEFAULT_PLANT_VALUE, DEFAULT_SPIRE_SCIENCE_VALUE} from '../constants';

interface SelectHowToPayModel {
    cost: number;
    heat: number;
    megaCredits: number;
    steel: number;
    titanium: number;
    microbes: number;
    floaters: number;
    graphene: number;
    asteroids: number;
    plants: number;
    spireScience: number;
    warning: string | undefined;
}

export const SelectHowToPay = Vue.component('select-how-to-pay', {
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
  components: {
    'Button': Button,
  },
  data: function() {
    return {
      cost: 0,
      heat: 0,
      megaCredits: 0,
      steel: 0,
      titanium: 0,
      microbes: 0,
      floaters: 0,
      graphene: 0,
      asteroids: 0,
      plants: 0,
      spireScience: 0,
      warning: undefined,
    } as SelectHowToPayModel;
  },
  mixins: [PaymentWidgetMixin, TranslateMixin],
  mounted: function() {
    const app = this;
    Vue.nextTick(function() {
      app.setInitialCost();
      app.$data.megaCredits = (app as any).getMegaCreditsMax();

      app.setDefaultSteelValue();
      app.setDefaultPlantsValue();
      app.setDefaultGrapheneValue();
      app.setDefaultTitaniumValue();
      app.setDefaultHeatValue();
      app.setDefaultAsteroidsValue();
      app.setDefaultSpireScienceValue();
    });
  },
  methods: {
    hasWarning: function() {
      return this.$data.warning !== undefined;
    },
    setInitialCost: function() {
      this.$data.cost = this.playerinput.amount;
    },
    setDefaultSteelValue: function() {
      // automatically use available steel to pay if not enough M€
      if (!this.canAffordWithMcOnly() && this.canUseSteel()) {
        let requiredSteelQty = Math.ceil(Math.max(this.$data.cost - this.player.megaCredits, 0) / this.player.steelValue);

        if (requiredSteelQty > this.player.steel) {
          this.$data.steel = this.player.steel;
        } else {
          // use as much steel as possible without overpaying by default
          let currentSteelValue = requiredSteelQty * this.player.steelValue;
          while (currentSteelValue <= this.$data.cost - this.player.steelValue && requiredSteelQty < this.player.steel) {
            requiredSteelQty++;
            currentSteelValue = requiredSteelQty * this.player.steelValue;
          }

          this.$data.steel = requiredSteelQty;
        }

        const discountedCost = this.$data.cost - (this.$data.steel * this.player.steelValue);
        this.$data.megaCredits = Math.max(discountedCost, 0);
      } else {
        this.$data.steel = 0;
      }
    },
    setDefaultPlantsValue: function() {
      // automatically use available plants to pay if not enough M€
      if (!this.canAffordWithMcOnly() && this.canUsePlants()) {
        let requiredPlantsQty = Math.ceil(Math.max(this.$data.cost - this.player.megaCredits, 0) / DEFAULT_PLANT_VALUE);

        if (requiredPlantsQty > this.player.plants) {
          this.$data.plants = this.player.plants;
        } else {
          // use as many plants as possible without overpaying by default
          let currentPlantsValue = requiredPlantsQty * DEFAULT_PLANT_VALUE;
          while (currentPlantsValue <= this.$data.cost - DEFAULT_PLANT_VALUE && requiredPlantsQty < this.player.plants) {
            requiredPlantsQty++;
            currentPlantsValue = requiredPlantsQty * DEFAULT_PLANT_VALUE;
          }

          this.$data.plants = requiredPlantsQty;
        }

        const discountedCost = this.$data.cost - (this.$data.steel * this.player.steelValue) - (this.$data.plants * DEFAULT_PLANT_VALUE);
        this.$data.megaCredits = Math.max(discountedCost, 0);
      } else {
        this.$data.plants = 0;
      }
    },
    setDefaultGrapheneValue: function() {
      // automatically use available graphene to pay if not enough M€
      if (!this.canAffordWithMcOnly() && this.canUseGraphene()) {
        let requiredGrapheneQty = Math.ceil(Math.max(this.$data.cost - this.player.megaCredits - (this.$data.steel * this.player.steelValue), 0) / DEFAULT_GRAPHENE_VALUE);

        if (requiredGrapheneQty > this.getAvailableGraphene()) {
          this.$data.graphene = this.getAvailableGraphene();
        } else {
          // use as much graphene as possible without overpaying by default
          let currentGrapheneValue = requiredGrapheneQty * DEFAULT_GRAPHENE_VALUE;
          while (currentGrapheneValue <= this.$data.cost - DEFAULT_GRAPHENE_VALUE && requiredGrapheneQty < this.getAvailableGraphene()) {
            requiredGrapheneQty++;
            currentGrapheneValue = requiredGrapheneQty * DEFAULT_GRAPHENE_VALUE;
          }

          this.$data.graphene = requiredGrapheneQty;
        }

        const discountedCost = this.$data.cost - (this.$data.steel * this.player.steelValue) - (this.$data.plants * DEFAULT_PLANT_VALUE) - (this.$data.graphene * DEFAULT_GRAPHENE_VALUE);
        this.$data.megaCredits = Math.max(discountedCost, 0);
      } else {
        this.$data.graphene = 0;
      }
    },
    setDefaultTitaniumValue: function() {
      // automatically use available titanium to pay if not enough M€
      if (!this.canAffordWithMcOnly() && this.canUseTitanium()) {
        let requiredTitaniumQty = Math.ceil(Math.max(this.$data.cost - this.player.megaCredits - (this.$data.steel * this.player.steelValue) - (this.$data.graphene * DEFAULT_GRAPHENE_VALUE), 0) / this.player.titaniumValue);

        if (requiredTitaniumQty > this.player.titanium) {
          this.$data.titanium = this.player.titanium;
        } else {
          // use as much titanium as possible without overpaying by default
          let currentTitaniumValue = requiredTitaniumQty * this.player.titaniumValue;
          while (currentTitaniumValue <= this.$data.cost - this.player.titaniumValue && requiredTitaniumQty < this.player.titanium) {
            requiredTitaniumQty++;
            currentTitaniumValue = requiredTitaniumQty * this.player.titaniumValue;
          }

          this.$data.titanium = requiredTitaniumQty;
        }

        const discountedCost = this.$data.cost - (this.$data.steel * this.player.steelValue) - (this.$data.plants * DEFAULT_PLANT_VALUE) - (this.$data.graphene * DEFAULT_GRAPHENE_VALUE) - (this.$data.titanium * this.player.titaniumValue);
        this.$data.megaCredits = Math.max(discountedCost, 0);
      } else {
        this.$data.titanium = 0;
      }
    },
    setDefaultHeatValue: function() {
      // automatically use available heat for Helion if not enough M€
      if (!this.canAffordWithMcOnly() && this.canUseHeat()) {
        this.$data.heat = Math.max(this.$data.cost - this.player.megaCredits - (this.$data.steel * this.player.steelValue) - (this.$data.graphene * DEFAULT_GRAPHENE_VALUE) - (this.$data.titanium * this.player.titaniumValue), 0);
      } else {
        this.$data.heat = 0;
      }
      const discountedCost = this.$data.cost - (this.$data.steel * this.player.steelValue) - (this.$data.plants * DEFAULT_PLANT_VALUE) - (this.$data.graphene * DEFAULT_GRAPHENE_VALUE) - (this.$data.titanium * this.player.titaniumValue) - this.$data.heat;
      this.$data.megaCredits = Math.max(discountedCost, 0);
    },
    setDefaultAsteroidsValue: function() {
      // automatically use available asteroids if not enough M€
      if (!this.canAffordWithMcOnly() && this.canUseAsteroids()) {
        this.$data.asteroids = Math.max(this.$data.cost - this.player.megaCredits - (this.$data.steel * this.player.steelValue) - (this.$data.graphene * DEFAULT_GRAPHENE_VALUE) - (this.$data.titanium * this.player.titaniumValue) - this.$data.heat, 0);
      } else {
        this.$data.asteroids = 0;
      }
      const discountedCost = this.$data.cost - (this.$data.steel * this.player.steelValue) - (this.$data.plants * DEFAULT_PLANT_VALUE) - (this.$data.graphene * DEFAULT_GRAPHENE_VALUE) - (this.$data.titanium * this.player.titaniumValue) - this.$data.heat - this.$data.asteroids;
      this.$data.megaCredits = Math.max(discountedCost, 0);
    },
    setDefaultSpireScienceValue: function() {
      // automatically use available Spire science resources if not enough M€
      if (!this.canAffordWithMcOnly() && this.canUseSpireScience()) {
        let requiredSpireScienceQty = Math.ceil(Math.max(this.$data.cost - this.player.megaCredits - (this.$data.steel * this.player.steelValue)- (this.$data.graphene * DEFAULT_GRAPHENE_VALUE) - (this.$data.titanium * this.player.titaniumValue) - this.$data.heat - this.$data.asteroids, 0) / DEFAULT_SPIRE_SCIENCE_VALUE);

        if (requiredSpireScienceQty > this.getAvailableSpireScience()) {
          this.$data.spireScience = this.getAvailableSpireScience();
        } else {
          // use as much science as possible without overpaying by default
          let currentSpireScienceValue = requiredSpireScienceQty * DEFAULT_SPIRE_SCIENCE_VALUE;
          while (currentSpireScienceValue <= this.$data.cost - DEFAULT_SPIRE_SCIENCE_VALUE && requiredSpireScienceQty < this.getAvailableSpireScience()) {
            requiredSpireScienceQty++;
            currentSpireScienceValue = requiredSpireScienceQty * DEFAULT_SPIRE_SCIENCE_VALUE;
          }

          this.$data.spireScience = requiredSpireScienceQty;
        }

        const discountedCost = this.$data.cost - (this.$data.steel * this.player.steelValue) - (this.$data.plants * DEFAULT_PLANT_VALUE) - (this.$data.graphene * DEFAULT_GRAPHENE_VALUE) - (this.$data.titanium * this.player.titaniumValue) - this.$data.heat - this.$data.asteroids - (this.$data.spireScience * DEFAULT_SPIRE_SCIENCE_VALUE);
        this.$data.megaCredits = Math.max(discountedCost, 0);
      } else {
        this.$data.spireScience = 0;
      }
    },
    canAffordWithMcOnly: function() {
      return this.player.megaCredits >= this.$data.cost;
    },
    getAvailableHeat: function() {
      let availableHeat = this.player.heat;
      const stormcraft = this.player.corporationCards.find((c) => c.name === CardName.STORMCRAFT_INCORPORATED);

      if (stormcraft !== undefined && stormcraft.resources !== undefined) {
        availableHeat += stormcraft.resources * 2;
      }

      return availableHeat;
    },
    getAvailableGraphene: function() {
      let availableGraphene = 0;
      const carbonNanosystems = this.player.playedCards.find((c) => c.name === CardName.CARBON_NANOSYSTEMS);

      if (carbonNanosystems !== undefined && carbonNanosystems.resources !== undefined) {
        availableGraphene = carbonNanosystems.resources;
      }

      return availableGraphene;
    },
    getAvailableAsteroids: function() {
      let availableAsteroids = 0;
      const kuiperCooperative = this.player.corporationCards.find((c) => c.name === CardName.KUIPER_COOPERATIVE);

      if (kuiperCooperative !== undefined && kuiperCooperative.resources !== undefined) {
        availableAsteroids = kuiperCooperative.resources;
      }

      return availableAsteroids;
    },
    getAvailableSpireScience: function() {
      let availableSpireScience = 0;
      const spire = this.player.corporationCards.find((c) => c.name === CardName.SPIRE);

      if (spire !== undefined && spire.resources !== undefined) {
        availableSpireScience = spire.resources;
      }

      return availableSpireScience;
    },
    canUseHeat: function() {
      return this.playerinput.canUseHeat && this.getAvailableHeat() > 0;
    },
    canUsePlants: function() {
      return this.playerinput.canUsePlants && this.player.plants > 0;
    },
    canUseSteel: function() {
      return this.playerinput.canUseSteel && this.player.steel > 0;
    },
    canUseTitanium: function() {
      return this.playerinput.canUseTitanium && this.player.titanium > 0;
    },
    canUseGraphene: function() {
      return this.playerinput.canUseGraphene && this.getAvailableGraphene() > 0;
    },
    canUseAsteroids: function() {
      return this.playerinput.canUseAsteroids && this.getAvailableAsteroids() > 0;
    },
    canUseSpireScience: function() {
      return this.playerinput.canUseSpireScience && this.getAvailableSpireScience() > 0;
    },
    saveData: function() {
      const htp: HowToPay = {
        heat: this.$data.heat,
        megaCredits: this.$data.megaCredits,
        steel: this.$data.steel,
        titanium: this.$data.titanium,
        microbes: 0,
        floaters: 0,
        science: 0,
        graphene: this.$data.graphene,
        asteroids: this.$data.asteroids,
        plants: this.$data.plants,
        spireScience: this.$data.spireScience,
      };

      if (htp.megaCredits > this.player.megaCredits) {
        this.$data.warning = 'You don\'t have that many M€';
        return;
      }
      if (htp.heat > this.getAvailableHeat()) {
        this.$data.warning = 'You don\'t have enough heat';
        return;
      }
      if (htp.titanium > this.player.titanium) {
        this.$data.warning = 'You don\'t have enough titanium';
        return;
      }
      if (htp.plants > this.player.plants) {
        this.$data.warning = 'You don\'t have enough plants';
        return;
      }
      if (htp.steel > this.player.steel) {
        this.$data.warning = 'You don\'t have enough steel';
        return;
      }
      if (htp.graphene > this.getAvailableGraphene()) {
        this.$data.warning = 'You don\'t have enough graphene resources';
        return;
      }
      if (htp.asteroids > this.getAvailableAsteroids()) {
        this.$data.warning = 'You don\'t have enough asteroid resources';
        return;
      }
      if (htp.spireScience > this.getAvailableSpireScience()) {
        this.$data.warning = 'You don\'t have enough science resources';
        return;
      }

      const requiredAmt = this.playerinput.amount || 0;
      const totalSpentAmt = htp.heat + htp.asteroids + htp.megaCredits + (htp.plants * DEFAULT_PLANT_VALUE) + (htp.steel * this.player.steelValue) + (htp.titanium * this.player.titaniumValue) + (htp.microbes * 2) + (htp.floaters * 3) + (htp.graphene * DEFAULT_GRAPHENE_VALUE) + (htp.spireScience * DEFAULT_SPIRE_SCIENCE_VALUE);

      if (requiredAmt > 0 && totalSpentAmt < requiredAmt) {
        this.$data.warning = 'Haven\'t spent enough';
        return;
      }

      if (requiredAmt === 0) {
        htp.heat = 0;
        htp.megaCredits = 0;
      }

      if (requiredAmt > 0 && totalSpentAmt > requiredAmt) {
        const diff = totalSpentAmt - requiredAmt;
        if (htp.titanium && diff >= this.player.titaniumValue) {
          this.$data.warning = 'You cannot overspend titanium';
          return;
        }
        if (htp.plants && diff >= DEFAULT_PLANT_VALUE) {
          this.$data.warning = 'You cannot overspend plants';
          return;
        }
        if (htp.steel && diff >= this.player.steelValue) {
          this.$data.warning = 'You cannot overspend steel';
          return;
        }
        if (htp.heat && diff >= 1) {
          this.$data.warning = 'You cannot overspend heat';
          return;
        }
        if (htp.asteroids && diff >= 1) {
          this.$data.warning = 'You cannot overspend asteroids';
          return;
        }
        if (htp.spireScience && diff >= DEFAULT_SPIRE_SCIENCE_VALUE) {
          this.$data.warning = 'You cannot overspend science';
          return;
        }
        if (htp.graphene && diff >= DEFAULT_GRAPHENE_VALUE) {
          this.$data.warning = 'You cannot overspend graphene resources';
          return;
        }
        if (htp.megaCredits && diff >= 1) {
          this.$data.warning = 'You cannot overspend megaCredits';
          return;
        }
      }

      const showAlert = PreferencesManager.load('show_alerts') === '1';

      if (requiredAmt > 0 && totalSpentAmt > requiredAmt && showAlert) {
        const diff = totalSpentAmt - requiredAmt;

        if (confirm('Warning: You are overpaying by ' + diff + ' M€')) {
          this.onsave([[JSON.stringify(htp)]]);
        } else {
          this.$data.warning = 'Please adjust payment amount';
          return;
        }
      } else {
        this.onsave([[JSON.stringify(htp)]]);
      }
    },
  },
  template: `<div class="payments_cont">
  <section v-trim-whitespace>

    <h3 class="payments_title">{{ $t(playerinput.title) }}</h3>

    <div class="payments_type input-group" v-if="playerinput.canUsePlants">
      <i class="resource_icon resource_icon--plants payments_type_icon" :title="$t('Pay by Plants')"></i>
      <Button type="minus" :onClick="_=>reduceValue('plants', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="plants" />
      <Button type="plus" :onClick="_=>addValue('plants', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('plants')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="playerinput.canUseSteel">
      <i class="resource_icon resource_icon--steel payments_type_icon" :title="$t('Pay by Steel')"></i>
      <Button type="minus" :onClick="_=>reduceValue('steel', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="steel" />
      <Button type="plus" :onClick="_=>addValue('steel', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('steel')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="playerinput.canUseGraphene">
      <i class="resource_icon resource_icon--graphene payments_type_icon" :title="$t('Pay by Graphene')"></i>
      <Button type="minus" :onClick="_=>reduceValue('graphene', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="graphene" />
      <Button type="plus" :onClick="_=>addValue('graphene', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('graphene')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="playerinput.canUseSpireScience">
      <i class="resource_icon resource_icon--science payments_type_icon" :title="$t('Pay by Science')"></i>
      <Button type="minus" :onClick="_=>reduceValue('spireScience', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="spireScience" />
      <Button type="plus" :onClick="_=>addValue('spireScience', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('spireScience')" title="MAX" />
    </div>
    
    <div class="payments_type input-group" v-if="playerinput.canUseAsteroids">
      <i class="resource_icon resource_icon--asteroid payments_type_icon" :title="$t('Pay by Asteroids')"></i>
      <Button type="minus" :onClick="_=>reduceValue('asteroids', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="asteroids" />
      <Button type="plus" :onClick="_=>addValue('asteroids', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('asteroids')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="playerinput.canUseTitanium">
      <i class="resource_icon resource_icon--titanium payments_type_icon" :title="$t('Pay by Titanium')"></i>
      <Button type="minus" :onClick="_=>reduceValue('titanium', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="titanium" />
      <Button type="plus" :onClick="_=>addValue('titanium', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('titanium')" title="MAX" />
    </div>

    <div class="payments_type input-group" v-if="playerinput.canUseHeat">
      <i class="resource_icon resource_icon--heat payments_type_icon" :title="$t('Pay by Heat')"></i>
      <Button type="minus" :onClick="_=>reduceValue('heat', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="heat" />
      <Button type="plus" :onClick="_=>addValue('heat', 1)" />
      <Button type="max" :onClick="_=>setMaxValue('heat', this.getAvailableHeat())" title="MAX" />
    </div>

    <div class="payments_type input-group">
      <i class="resource_icon resource_icon--megacredits payments_type_icon" :title="$t('Pay by Megacredits')"></i>
      <Button type="minus" :onClick="_=>reduceValue('megaCredits', 1)" />
      <input class="form-input form-inline payments_input" v-model.number="megaCredits" />
      <Button type="plus" :onClick="_=>addValue('megaCredits', 1)" />
    </div>

    <div v-if="hasWarning()" class="tm-warning">
      <label class="label label-error">{{ $t(warning) }}</label>
    </div>

    <div v-if="showsave === true" class="payments_save">
      <Button size="big" :onClick="saveData" :title="$t(playerinput.buttonLabel)" />
    </div>

  </section>
</div>`,
});

