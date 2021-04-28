import Vue from 'vue';
import {PlayerInfo} from './PlayerInfo';
import {OverviewSettings} from './OverviewSettings';
import {OtherPlayer} from '../OtherPlayer';
import {PlayerModel} from '../../models/PlayerModel';
import {ActionLabel} from './ActionLabel';
import {Phase} from '../../Phase';
import {SpectatorModel} from '../../models/SpectatorModel';

export const getCurrentPlayerIndex = (
  player: PlayerModel,
  players: Array<PlayerModel>,
): number => {
  let currentPlayerIndex: number = 0;
  players.forEach((p: PlayerModel, index: number) => {
    if (p.color === player.color) {
      currentPlayerIndex = index;
    }
  });
  return currentPlayerIndex;
};

export const SpectatorOverview = Vue.component('spectator-overview', {
  props: {
    player: {
      type: Object as () => SpectatorModel,
    },
  },
  components: {
    'player-info': PlayerInfo,
    'overview-settings': OverviewSettings,
    'other-player': OtherPlayer,
  },
  data: function() {
    return {};
  },
  methods: {
    hasPlayers: function(): boolean {
      return this.player.players.length > 0;
    },
    getPlayerOnFocus: function(): PlayerModel {
      return this.player.players.filter(
        (p: PlayerModel) => p.color === this.player.color,
      )[0];
    },
    getIsFirstForGen: function(player: PlayerModel): boolean {
      return getCurrentPlayerIndex(player, this.player.players) === 0;
    },
    getPlayersInOrder: function(): Array<PlayerModel> {
      return this.player.players;
    },
    getActionLabel(player: PlayerModel): string {
      if (this.player.phase === Phase.DRAFTING) {
        if (!this.player.draftedPlayers.includes(player.color)) return ActionLabel.DRAFTING;
        return ActionLabel.NONE;
      }

      if (this.player.phase === Phase.RESEARCH) {
        if (!this.player.researchedPlayers.includes(player.color)) return ActionLabel.RESEARCHING;
        return ActionLabel.NONE;
      }

      if (this.player.passedPlayers.includes(player.color)) return ActionLabel.PASSED;
      if (player.isActive) return ActionLabel.ACTIVE;

      return ActionLabel.NONE;
    },
  },
  template: `
        <div class="players-overview" v-if="hasPlayers()">
            <player-info v-for="(p, index) in getPlayersInOrder()" :activePlayer="player" :player="p"  :key="p.id" :firstForGen="getIsFirstForGen(p)" :actionLabel="getActionLabel(p)" :playerIndex="index"/>
        </div>
    `,
});