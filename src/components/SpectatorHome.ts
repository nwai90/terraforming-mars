import Vue from 'vue';

import {SpectatorModel} from '../../src/models/SpectatorModel';
import {SpectatorOverview} from './overview/SpectatorOverview';
import {OtherPlayer} from './OtherPlayer';
import * as raw_settings from '../genfiles/settings.json';
import {Milestone} from './Milestone';
import {Award} from './Award';
import {Sidebar} from './Sidebar';
import {PlayerModel} from '../models/PlayerModel';
import {PreferencesManager} from './PreferencesManager';
import {Board} from './Board';
import {Colony} from './Colony';
import {ScoreChart} from '../components/ScoreChart';
import {mainAppSettings} from './App';

let ui_update_timeout_id: number | undefined;

export interface SpectatorHomeModel {
  spectator_tab: string;
}

export const SpectatorHome = Vue.component('spectator-home', {
  data: function(): SpectatorHomeModel {
    return {
      spectator_tab: PreferencesManager.load('spectator_tab'),
    };
  },
  watch: {
    spectator_tab: function() {
      PreferencesManager.save('spectator_tab', this.spectator_tab);
    },
  },
  props: {
    spectator: {
      type: Object as () => SpectatorModel,
    },
    settings: {
      type: Object as () => typeof raw_settings,
    },
  },
  components: {
    'board': Board,
    'colony': Colony,
    'spectator-overview': SpectatorOverview,
    'other-player': OtherPlayer,
    'milestone': Milestone,
    'award': Award,
    'sidebar': Sidebar,
    'score-chart': ScoreChart,
  },
  methods: {
    getFleetsCountRange: function(player: PlayerModel): Array<number> {
      const fleetsRange: Array<number> = [];
      for (let i = 0; i < player.fleetSize - player.tradesThisGeneration; i++) {
        fleetsRange.push(i);
      }
      return fleetsRange;
    },
    toggleSpectatorTab(newtab: string) {
      this.spectator_tab = newtab;
    },
    getCurrentSpectatorTab(): string {
      return this.spectator_tab === '' ? 'board' : this.spectator_tab;
    },
    getSpectatorHomeClass(spectator: SpectatorModel): string {
      if (spectator.turmoil) return 'spectator-container with-turmoil';
      return 'spectator-container';
    },
    forceRerender() {
      const root = this.$root as unknown as typeof mainAppSettings.methods;
      root.updateSpectator();
    },
  },
  mounted: function() {
    ui_update_timeout_id = window.setInterval(this.forceRerender, 5000);
  },
  beforeDestroy() {
    window.clearInterval(ui_update_timeout_id);
  },
  template: `<div id="spectator-home" :class="getSpectatorHomeClass(spectator)">
    <template>
      <sidebar v-trim-whitespace
        :acting_player="false"
        :player_color="spectator.color"
        :generation="spectator.generation"
        :coloniesCount="spectator.coloniesCount"
        :temperature = "spectator.temperature"
        :oxygen = "spectator.oxygenLevel"
        :oceans = "spectator.oceans"
        :venus = "spectator.venusScaleLevel"
        :turmoil = "spectator.turmoil"
        :moonData="spectator.moon"
        :gameOptions = "spectator.gameOptions"
        :playerNumber = "spectator.players.length"
        :silverCubeVariant = "spectator.silverCubeVariant"
        :temperatureSilverCubeBonusMC = "spectator.temperatureSilverCubeBonusMC"
        :oceansSilverCubeBonusMC = "spectator.oceansSilverCubeBonusMC"
        :oxygenSilverCubeBonusMC = "spectator.oxygenSilverCubeBonusMC"
        :venusSilverCubeBonusMC = "spectator.venusSilverCubeBonusMC"
        :lastSoloGeneration = "spectator.lastSoloGeneration">
          <div class="deck-size">{{ spectator.deckSize }}</div>
      </sidebar>
      <div class="spectator-column_info">
        <div class="row_log">
          <div class="player_home_block--log player_home_block--hide_log spectator_log_block">
            <log-panel :id="spectator.id" :players="spectator.players" :generation="spectator.generation" :lastSoloGeneration="spectator.lastSoloGeneration" :color="'black'"></log-panel>
          </div>
        </div>
        <div class="row_player_boards">
          <spectator-overview class="player_home_block--players" :player="spectator" v-trim-whitespace id="shortkey-playersoverview"/>
        </div>
      </div>
      <div class="column_main">
        <div class="help-container">
          <div class="help-tabs">
            <input type="radio" name="spectator-tab" id="radio-board">
            <label for="radio-board" v-on:click="toggleSpectatorTab('board')">
                <span v-i18n>Board</span>
            </label>

            <template v-if="spectator.players.length > 1">
              <input type="radio" name="spectator-tab" id="radio-milestones-awards">
              <label for="radio-milestones-awards" v-on:click="toggleSpectatorTab('milestonesawards')">
                  <span v-i18n>Milestones & Awards</span>
              </label>
            </template>

            <template v-if="spectator.colonies.length > 0">
              <input type="radio" name="spectator-tab" id="radio-colonies">
              <label for="radio-colonies" v-on:click="toggleSpectatorTab('colonies')">
                  <span v-i18n>Colonies</span>
              </label>
            </template>

            <template v-if="spectator.turmoil">
              <input type="radio" name="spectator-tab" id="radio-turmoil">
              <label for="radio-turmoil" v-on:click="toggleSpectatorTab('turmoil')">
                  <span v-i18n>Turmoil</span>
              </label>
            </template>

            <template v-if="spectator.players.length > 1">
              <input type="radio" name="spectator-tab" id="radio-scorechart">
              <label for="radio-scorechart" v-on:click="toggleSpectatorTab('scorechart')">
                  <span v-i18n>Scores</span>
              </label>
            </template>
          </div>
        </div>
        <div class="other_player" v-if="spectator.players.length > 1">
          <div v-for="(otherPlayer, index) in spectator.players" :key="otherPlayer.id">
            <other-player v-if="otherPlayer.id !== spectator.id" :player="otherPlayer" :playerIndex="index"/>
          </div>
        </div>
        <div class="player_home_block">
          <a name="board" class="player_home_anchor"></a>
          <div v-if="getCurrentSpectatorTab() === 'board' || getCurrentSpectatorTab() === ''">
            <board
            :spaces="spectator.spaces"
            :venusNextExtension="spectator.gameOptions.venusNextExtension"
            :venusScaleLevel="spectator.venusScaleLevel"
            :boardName ="spectator.gameOptions.boardName"
            :oceans_count="spectator.oceans"
            :oxygen_level="spectator.oxygenLevel"
            :temperature="spectator.temperature"
            :shouldNotify="false"
            :aresExtension="spectator.gameOptions.aresExtension"
            :aresData="spectator.aresData"
            id="shortkey-board""></board>
          </div>
          
          <turmoil v-if="spectator.turmoil && getCurrentSpectatorTab() === 'turmoil'" :turmoil="spectator.turmoil"></turmoil>

          <div v-if="spectator.players.length > 1 && getCurrentSpectatorTab() === 'scorechart'">
            <score-chart :players="spectator.players" :generation="spectator.generation" :animation="false"></score-chart>
          </div>
          
          <div v-if="spectator.players.length > 1 && getCurrentSpectatorTab() === 'milestonesawards'" class="player_home_block--milestones-and-awards">
              <milestone :milestones_list="spectator.milestones" />
              <award :awards_list="spectator.awards" />
          </div>
          <div v-if="spectator.colonies.length > 0 && getCurrentSpectatorTab() === 'colonies'" class="player_home_block" ref="colonies" id="shortkey-colonies">
            <a name="colonies" class="player_home_anchor"></a>
            <dynamic-title title="Colonies" :color="spectator.color"/>
            <div class="colonies-fleets-cont">
                <div class="colonies-player-fleets" v-for="colonyPlayer in spectator.players">
                    <div :class="'colonies-fleet colonies-fleet-'+ colonyPlayer.color" v-for="idx in getFleetsCountRange(colonyPlayer)"></div>
                </div>
            </div>
            <div class="player_home_colony_cont">
                <div class="player_home_colony" v-for="colony in spectator.colonies" :key="colony.name">
                    <colony :colony="colony"></colony>
                </div>
            </div>
          </div>
        </div>
      
      </div>
    </template>
  </div>`,
});
