import Vue from 'vue';
import {PlayerInfo} from './PlayerInfo';
import {OverviewSettings} from './OverviewSettings';
import {OtherPlayer} from '../OtherPlayer';
import {PlayerModel} from '../../models/PlayerModel';
import {ActionLabel} from './ActionLabel';
import { Phase } from '../../Phase';

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

export const PlayersOverview = Vue.component('players-overview', {
  props: {
    player: {
      type: Object as () => PlayerModel,
    },
  },
  components: {
    'player-info': PlayerInfo,
    'overview-settings': OverviewSettings,
    'other-player': OtherPlayer,
  },
  data: function() {
    return {
      componentKey: 0,
    };
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
      const players = this.player.players;
      let result: Array<PlayerModel> = [];
      let currentPlayerOffset: number = 0;
      const currentPlayerIndex: number = getCurrentPlayerIndex(
        this.player,
        this.player.players,
      );

      // shift the array by putting the player on focus at the tail
      currentPlayerOffset = currentPlayerIndex + 1;
      result = players
        .slice(currentPlayerOffset)
        .concat(players.slice(0, currentPlayerOffset));
      // return all but the focused user
      return result.slice(0, -1);
    },
    getActionLabel(player: PlayerModel): string {
      if (!this.player.draftedPlayers.includes(player.color) && this.player.phase === Phase.DRAFTING) return ActionLabel.DRAFTING;
      if (this.player.phase === Phase.DRAFTING) return ActionLabel.NONE;
      if (this.player.passedPlayers.includes(player.color)) return ActionLabel.PASSED;
      if (player.isActive) return ActionLabel.ACTIVE;

      return ActionLabel.NONE;
    },
  },
  created: function(): void {
    this.$root.$on('updatePlayersOverview', (_e: any) => {
      this.componentKey += 1;
    });
  },
  template: `
        <div class="players-overview" v-if="hasPlayers()" :key="componentKey">
            <overview-settings />
            <div class="other_player" v-if="player.players.length > 1">
                <div v-for="(otherPlayer, index) in getPlayersInOrder()" :key="otherPlayer.id">
                    <other-player v-if="otherPlayer.id !== player.id" :player="otherPlayer" :playerIndex="index"/>
                </div>
            </div>
            <player-info v-for="(p, index) in getPlayersInOrder()" :activePlayer="player" :player="p"  :key="p.id" :firstForGen="getIsFirstForGen(p)" :actionLabel="getActionLabel(p)" :playerIndex="index"/>
            <div v-if="player.players.length > 1" class="player-divider" />
            <player-info :player="getPlayerOnFocus()" :activePlayer="player" :key="player.players.length - 1" :firstForGen="getIsFirstForGen(player)" :actionLabel="getActionLabel(player)" :playerIndex="-1"/>
        </div>
    `,
});
