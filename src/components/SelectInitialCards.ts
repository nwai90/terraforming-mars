
import Vue from 'vue';

import {Button} from './common/Button';
import {CardFinder} from '../CardFinder';
import {CardName} from '../CardName';
import * as constants from '../constants';
import {CorporationCard} from '../cards/corporation/CorporationCard';
import {PlayerInputModel} from '../models/PlayerInputModel';
import {PlayerModel} from '../models/PlayerModel';
import {SelectCard} from './SelectCard';
import {ConfirmDialog} from './common/ConfirmDialog';
import {PreferencesManager} from './PreferencesManager';
import {Colony} from '../components/Colony';

export const SelectInitialCards = Vue.component('select-initial-cards', {
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
    Button,
    'select-card': SelectCard,
    'confirm-dialog': ConfirmDialog,
    Colony,
  },
  data: function() {
    return {
      selectedCards: [] as Array<CardName>,
      selectedCorporation: undefined as CorporationCard | undefined,
      selectedPrelude: [] as Array<CardName>,
      selectedLeaders: [] as Array<CardName>,
    };
  },
  methods: {
    getAfterPreludes: function() {
      let result = 0;
      for (const prelude of this.selectedPrelude) {
        switch (prelude) {
        case CardName.ALLIED_BANKS:
        case CardName.ANTI_DESERTIFICATION_TECHNIQUES:
          result += 3;
          break;
        case CardName.BUSINESS_EMPIRE:
          result -= 6;
          break;
        case CardName.AQUIFER_TURBINES:
        case CardName.STRATEGIC_BASE_PLANNING:
          result -= 3;
          break;
        case CardName.MINING_IMPROVEMENTS:
          result -= 2;
          break;
        case CardName.DONATION:
          result += 21;
          break;
        case CardName.GALILEAN_MINING:
        case CardName.HUGE_ASTEROID:
        case CardName.VITAL_COLONY:
          result -= 5;
          break;
        case CardName.TERRAFORMING_MISSION:
          result -= 12;
          break;
        case CardName.LOAN:
          result += 30;
          break;
        case CardName.MARTIAN_INDUSTRIES:
        case CardName.VALUABLE_GASES:
          result += 6;
          break;
        case CardName.NITROGEN_SHIPMENT:
        case CardName.GAMBLING_HOUSE:
          result += 5;
          break;
        case CardName.SOLAR_BATTERIES:
          result += 7;
          break;
        case CardName.AEROSPACE_MISSION:
          result -= 14;
          break;
        case CardName.FORTIFIED_OUTPOST:
          result -= 10;
          break;
        case CardName.RESEARCH_GRANT:
          result += 8;
          break;
        case CardName.TRADE_ADVANCE:
          result += 2;
          break;
        case CardName.STAKEHOLDERS:
          result += 14;
          break;
        case CardName.EXECUTIVE_ORDER:
          result += 10;
          break;
        case CardName.CORPORATE_ARCHIVES:
          result += 13;
          break;
        case CardName.ESTABLISHED_METHODS:
          result += 30;
          break;
        case CardName.HEAD_START:
          result += this.selectedCards.length * 2;
          break;
        }

        switch (this.selectedCorporation?.name) {
        case CardName.MANUTECH:
          switch (prelude) {
          case CardName.ALLIED_BANKS:
            result += 4;
            break;
          case CardName.BUSINESS_EMPIRE:
            result += 6;
            break;
          case CardName.DOME_FARMING:
          case CardName.SELF_SUFFICIENT_SETTLEMENT:
            result += 2;
            break;
          case CardName.METALS_COMPANY:
          case CardName.RESEARCH_NETWORK:
          case CardName.THARSIS_PROTOTYPE_CITY:
            result += 1;
            break;
          case CardName.NITRATE_REDUCERS:
            result += 3;
            break;
          }
          break;
        case CardName.THARSIS_REPUBLIC:
          switch (prelude) {
          case CardName.SELF_SUFFICIENT_SETTLEMENT:
          case CardName.EARLY_SETTLEMENT:
          case CardName.FORTIFIED_OUTPOST:
            result += 3;
            break;
          }
          break;
        case CardName.PHARMACY_UNION:
          switch (prelude) {
          case CardName.BIOFUELS:
          case CardName.ECOLOGY_EXPERTS:
          case CardName.NITRATE_REDUCERS:
            result -= 4;
            break;
          }
          break;
        case CardName.SPLICE:
          switch (prelude) {
          case CardName.BIOFUELS:
          case CardName.ECOLOGY_EXPERTS:
          case CardName.NITRATE_REDUCERS:
            result += 4;
            break;
          }
          break;
        case CardName.APHRODITE:
          switch (prelude) {
          case CardName.VENUS_FIRST:
            result += 4;
            break;
          case CardName.HYDROGEN_BOMBARDMENT:
            result += 2;
            break;
          }
          break;
        case CardName.APHRODITE:
          switch (prelude) {
          case CardName.VENUS_FIRST:
            result += 4;
            break;
          }
          break;
        case CardName.SAGITTA_FRONTIER_SERVICES:
          const cardFinder = new CardFinder();
          const preludeCard = cardFinder.getProjectCardByName(prelude)!;
          const tagCount = preludeCard.tags.length;

          if (tagCount === 0) {
            result += 4;
          } else if (tagCount === 1) {
            result += 1;
          }

          break;
        }
      }

      return result;
    },
    getOption: function(idx: number) {
      if (this.playerinput.options === undefined || this.playerinput.options[idx] === undefined) {
        throw new Error('invalid input, missing option');
      }
      return this.playerinput.options[idx];
    },
    getProjectCardsOption: function() {
      let optionIndex: number = 1;
      if (this.hasPrelude() && this.hasLeaders()) optionIndex = 3;
      if (this.hasPrelude() && !this.hasLeaders()) optionIndex = 2;
      if (!this.hasPrelude() && this.hasLeaders()) optionIndex = 2;

      return this.getOption(optionIndex);
    },
    getStartingMegacredits: function() {
      if (this.selectedCorporation === undefined) {
        return NaN;
      }

      let starting = this.selectedCorporation.startingMegaCredits;
      let cardCost = this.selectedCorporation.cardCost === undefined ? constants.CARD_COST : this.selectedCorporation.cardCost;

      if (this.player.automaBotCorporation.name === CardName.POLYPHEMOS_BOT) {
        cardCost += 2;
      }

      starting -= this.selectedCards.length * cardCost;
      return starting;
    },
    saveIfConfirmed: function() {
      if (PreferencesManager.load('show_alerts') === '1' && this.selectedCards.length === 0) {
        (this.$refs['confirmation'] as any).show();
      } else {
        this.saveData();
      }
    },
    saveData: function() {
      const result: Array<Array<string>> = [];
      result.push([]);
      if (this.selectedCorporation !== undefined) {
        result[0].push(this.selectedCorporation.name);
      }
      if (this.hasPrelude()) {
        result.push(this.selectedPrelude);
      }
      if (this.hasLeaders()) {
        result.push(this.selectedLeaders);
      }

      const corporationPicked = this.selectedCorporation !== undefined;
      const twoPreludesPicked = !this.hasPrelude() || (this.hasPrelude() && this.selectedPrelude.length === 2);
      const leaderPicked = !this.hasLeaders() || (this.hasLeaders() && this.selectedLeaders.length === 1);

      if (corporationPicked && twoPreludesPicked && leaderPicked) {
        result.push(this.selectedCards);
      }

      this.onsave(result);
    },
    playerCanChooseAridor: function() {
      return this.player.dealtCorporationCards.some((card) => card.name === CardName.ARIDOR);
    },
    hasPrelude: function() {
      return this.playerinput.options !== undefined && this.player.gameOptions.preludeExtension;
    },
    hasLeaders: function() {
      return this.playerinput.options !== undefined && this.player.gameOptions.leadersExpansion;
    },
    cardsChanged: function(cards: Array<CardName>) {
      this.selectedCards = cards;
    },
    corporationChanged: function(cards: Array<CardName>) {
      this.selectedCorporation = new CardFinder().getCorporationCardByName(cards[0]);
    },
    preludesChanged: function(cards: Array<CardName>) {
      this.selectedPrelude = cards;
    },
    leadersChanged: function(cards: Array<CardName>) {
      this.selectedLeaders = cards;
    },
    confirmSelection: function() {
      this.saveData();
    },
  },
  template: `
  <div class="select-initial-cards">
    <confirm-dialog
      message="Continue without buying initial cards?"
      ref="confirmation"
      v-on:accept="confirmSelection" />
    <select-card :player="player" :playerinput="getOption(0)" :showtitle="true" v-on:cardschanged="corporationChanged" />
    <div v-if="playerCanChooseAridor()" class="player_home_colony_cont">
      <div v-i18n>These are the colony tiles Aridor may choose from:</div>
      <div class="discarded-colonies-for-aridor">
        <div class="player_home_colony small_colony" v-for="colony in player.discardedColonies" :key="colony.name">
          <colony :colony="colony"></colony>
        </div>
      </div>
    </div>
    <select-card v-if="hasPrelude()" :player="player" :playerinput="getOption(1)" :showtitle="true" v-on:cardschanged="preludesChanged" />
    <select-card v-if="hasLeaders()" :player="player" :playerinput="getOption(hasPrelude() ? 2 : 1)" :showtitle="true" v-on:cardschanged="leadersChanged" />
    <select-card :player="player" :playerinput="getProjectCardsOption()" :showtitle="true" v-on:cardschanged="cardsChanged" />
    <div v-if="selectedCorporation" v-i18n>Starting Megacredits: <div class="megacredits">{{getStartingMegacredits()}}</div></div>
    <div v-if="selectedCorporation && hasPrelude()" v-i18n>After Preludes: <div class="megacredits">{{getStartingMegacredits() + getAfterPreludes()}}</div></div>
    <Button v-if="showsave" :onClick="saveIfConfirmed" type="submit" :title="playerinput.buttonLabel" />
  </div>`,
});

