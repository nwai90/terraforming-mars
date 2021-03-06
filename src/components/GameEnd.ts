import Vue from 'vue';
import {PlayerModel} from '../models/PlayerModel';
import {Board} from './Board';
import {LogPanel} from './LogPanel';
import {Button} from '../components/common/Button';
import {playerColorClass} from '../utils/utils';
import {Timer} from '../Timer';
import {ScoreChart} from '../components/ScoreChart';
import {MoonBoard} from './moon/MoonBoard';

import * as htmlToImage from 'html-to-image';

import * as constants from '../constants';

export const GameEnd = Vue.component('game-end', {
  props: {
    player: {
      type: Object as () => PlayerModel,
    },
  },
  data: function() {
    return {
      constants,
    };
  },
  components: {
    'board': Board,
    'log-panel': LogPanel,
    'Button': Button,
    'score-chart': ScoreChart,
    'moonboard': MoonBoard,
  },
  methods: {
    getEndGamePlayerRowColorClass: function(color: string): string {
      return playerColorClass(color.toLowerCase(), 'bg_transparent');
    },
    getTimer: function(p: PlayerModel): string {
      return Timer.toString(p.timer);
    },
    getSortedPlayers: function() {
      this.player.players.sort(function(a:PlayerModel, b:PlayerModel) {
        if (a.victoryPointsBreakdown.total < b.victoryPointsBreakdown.total) return -1;
        if (a.victoryPointsBreakdown.total > b.victoryPointsBreakdown.total) return 1;
        if (a.megaCredits < b.megaCredits) return -1;
        if (a.megaCredits > b.megaCredits) return 1;
        return 0;
      });
      return this.player.players.reverse();
    },
    getWinners: function() {
      const sortedPlayers = this.getSortedPlayers();
      const firstWinner = sortedPlayers[0];
      const winners: PlayerModel[] = [firstWinner];
      for (let i = 1; i < sortedPlayers.length; i++) {
        if (sortedPlayers[i].victoryPointsBreakdown.total === firstWinner.victoryPointsBreakdown.total &&
                    sortedPlayers[i].megaCredits === firstWinner.megaCredits) {
          winners.push(sortedPlayers[i]);
        }
      }
      return winners;
    },
    isSoloGame: function(): boolean {
      return this.player.players.length === 1;
    },
    getStartTR: function(): number {
      return this.isSoloGame() ? 14 : 20;
    },
    getPointsEarned: function(player: PlayerModel): number {
      const totalPoints : number = player.victoryPointsBreakdown.total;
      const startTR : number = this.getStartTR();

      if (player.turmoil) {
        return totalPoints - startTR + (this.player.generation - 1) / 2;
      }

      return totalPoints - startTR;
    },
    getEfficiencyScore: function(player: PlayerModel): string {
      const startTR : number = this.getStartTR();
      const avgMcPerGeneration : number = startTR + 25;

      const dummyPlayerScore : number = startTR + (80 + avgMcPerGeneration * (this.player.generation - 1)) / 8.5;
      const playerScore = this.getPointsEarned(player);
      let value : number;

      if (playerScore < dummyPlayerScore) {
        value = (dummyPlayerScore - playerScore) / -dummyPlayerScore;
        return value.toFixed(2).toString();
      }

      value = (playerScore - dummyPlayerScore) / dummyPlayerScore;
      return '+' + value.toFixed(2).toString();
    },
    captureTable: function(elementID: string): void {
      const tableElement = document.getElementById(elementID);
      if (tableElement !== null) {
        tableElement.querySelectorAll('text').forEach((tag) => (tag.style.fontFamily = 'Prototype'));
        htmlToImage.toJpeg(tableElement, {quality: 0.95, width: 1500}).then(function(dataUrl) {
          const link = document.createElement('a');
          link.download = 'Terraforming_Mars_Game_Result.jpeg';
          link.href = dataUrl;
          link.click();
        });
      }
    },
  },
  template: `
        <div id="game-end" class="game_end_cont">
            <h1>{{ constants.APP_NAME }} - Game finished!</h1>
            <div class="game_end">
                <div v-if="isSoloGame()">
                    <div v-if="player.isSoloModeWin">
                        <div class="game_end_success">
                            <h2 v-i18n>You win!</h2>
                            <div class="game_end_solo_img">
                                <img src="/assets/misc/solo_win.png" />
                            </div>
                            <div class="game_end_notice" v-i18n>
                                But it isn't the reason to stop making Mars better.
                            </div>
                            <ul class="game_end_list">
                                <li v-i18n>Try to win with expansions enabled</li>
                                <li v-i18n>Try to win before the last generation comes</li>
                                <li><span v-i18n>Can you get</span> {{ player.victoryPointsBreakdown.total + 10 }}<span v-i18n>+ Victory Points?</span></li>
                            </ul>
                        </div>
                    </div>
                    <div v-else>
                        <div class="game_end_fail">
                            <h2 v-i18n>Sorry, you lose.</h2>
                            <div class="game_end_notice" v-i18n>
                                Next time you will get more luck!<br>
                                Also, take into account these small hints to win:
                            </div>
                            <ul class="game_end_list" v-i18n>
                                <li>Concentrate more on Global parameters, not on Victory Points</li>
                                <li>Don't be greedy on cards selection</li>
                                <li>Try to increase Heat production, not Megacredits</li>
                                <li>Try to start with Beginner corporation</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="game_end_go_home">
                    <a href="/" v-i18n>
                        <Button size="big" type="back" />
                        Go to main page
                    </a>
                </div>
                <div v-if="!isSoloGame() || player.isSoloModeWin" class="game-end-winer-announcement">
                    <span v-for="p in getWinners()"><span :class="'log-player ' + getEndGamePlayerRowColorClass(p.color)">{{ p.name }}</span></span> won!
                </div>

                <Button title="Save game result as image" size="tiny" class="save-image-button" :onClick="_=>captureTable('game-result')"/>

                <div class="game_end_victory_points" id="game-result">
                    <h2 v-i18n>Victory points breakdown after<span> {{player.generation}} </span>generations</h2>
                    <table class="table game_end_table">
                        <thead>
                            <tr v-i18n>
                                <th><div class="card-delegate"></div></th>
                                <th><div class="tr"></div></th>
                                <th><div class="table-milestones-tile"" title="Milestones points"></div></th>
                                <th><div class="table-awards-tile"" title="Awards points"></div></th>
                                <th><div class="table-forest-tile"></div></th>
                                <th><div class="table-city-tile"></div></th>
                                <th v-if="player.moon !== undefined"><div class="table-moon-road"></div></th>
                                <th v-if="player.moon !== undefined"><div class="table-moon-colony"></div></th>
                                <th v-if="player.moon !== undefined"><div class="table-moon-mine"></div></th>
                                <th><div class="vp">VP</div></th>
                                <th v-if="player.gameOptions.escapeVelocityMode" class="clock-icon tooltip tooltip-top" data-tooltip="Escape Velocity penalty">&#x23F3;</th>
                                <th class="game-end-total"><div class="game-end-total-column">Total</div></th>
                                <th><div class="mc-icon"></div></th>
                                <th v-if="player.gameOptions.showTimers" class="game-end-clock">&#x1F551;</th>
                                <th><div class="table-red-arrow tooltip tooltip-top" data-tooltip="Actions taken this game"></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in getSortedPlayers()" :class="getEndGamePlayerRowColorClass(p.color)">
                                <td>
                                  <a :href="'/player?id='+p.id+'&noredirect'">{{ p.name }}</a>
                                  <div class="column-corporation">{{ p.corporationCard === undefined ? "" : p.corporationCard.name }}</div>
                                </td>
                                <td>{{ p.victoryPointsBreakdown.terraformRating }}</td>
                                <td>{{ p.victoryPointsBreakdown.milestones }}</td>
                                <td>{{ p.victoryPointsBreakdown.awards }}</td>
                                <td>{{ p.victoryPointsBreakdown.greenery }}</td>
                                <td>{{ p.victoryPointsBreakdown.city }}</td>
                                <td v-if="player.moon !== undefined">{{ p.victoryPointsBreakdown.moonRoads }}</td>
                                <td v-if="player.moon !== undefined">{{ p.victoryPointsBreakdown.moonColonies }}</td>
                                <td v-if="player.moon !== undefined">{{ p.victoryPointsBreakdown.moonMines }}</td>
                                <td>{{ p.victoryPointsBreakdown.victoryPoints }}</td>
                                <td v-if="player.gameOptions.escapeVelocityMode">{{ p.victoryPointsBreakdown.escapeVelocity }}</td>
                                <td class="game-end-total">{{ p.victoryPointsBreakdown.total }}</td>
                                <td>{{ p.megaCredits }}</td>
                                <td v-if="player.gameOptions.showTimers">{{ getTimer(p) }}</td>
                                <td><div class="game-end-timer">{{ p.actionsTakenThisGame }}</div></td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <h2 v-i18n>Victory points details</h2>

                    <score-chart :players="player.players" :generation="player.generation" :animation="true"></score-chart>

                    <div class="game-end-flexrow">
                        <div v-for="p in getSortedPlayers()" class="game-end-column">
                            <div class="game-end-winer-scorebreak-player-title">
                                <div :class="'game-end-player ' + getEndGamePlayerRowColorClass(p.color)"><a :href="'/player?id='+p.id+'&noredirect'">{{p.name}}</a></div>
                            </div>
                            <h5 class="efficiency" v-i18n><a href="https://www.notion.so/Variants-32b53050f10a4cfbaea117c34d4f3a03#e2c9ecc0a1cc4a20a2201d429b677aa6" target="_blank">Efficiency</a>: <span>{{ getEfficiencyScore(p) }}</span></h5>
                            <div v-for="v in p.victoryPointsBreakdown.detailsCards">
                              <div class="game-end-column-row">
                                <div class="game-end-column-text">{{v.cardName}}</div>
                                <div class="game-end-column-vp">{{v.victoryPoint}}</div>
                              </div>
                            </div>
                            <div class="game-end-column-row">
                              <div class="game-end-column-vp">&nbsp;</div>
                              <div class="game-end-column-text">&nbsp;</div>
                            </div>
                            <div v-for="v in p.victoryPointsBreakdown.detailsMilestones">
                              <div class="game-end-column-row">
                                <div class="game-end-column-text">{{v.split(':', 2)[0]}}</div>
                                <div class="game-end-column-vp">{{v.split(':', 2)[1]}}</div>
                              </div>
                            </div>
                            <div v-for="v in p.victoryPointsBreakdown.detailsAwards">
                              <div class="game-end-column-row">
                                <div class="game-end-column-text">{{v.split(':', 2)[0]}}</div>
                                <div class="game-end-column-vp">{{v.split(':', 2)[1]}}</div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="game-end-flexrow">
                <div class="game_end_block--board game-end-column">
                    <h2 v-i18n>Final situation on the board</h2>
                    <board
                        :spaces="player.spaces"
                        :venusNextExtension="player.gameOptions.venusNextExtension"
                        :venusScaleLevel="player.venusScaleLevel"
                        :aresExtension="player.gameOptions.aresExtension"
                        :boardName ="player.gameOptions.boardName"
                        :oceans_count="player.oceans"
                        :oxygen_level="player.oxygenLevel"
                        :temperature="player.temperature"></board>
                    <moonboard v-if="player.gameOptions.moonExpansion" :model="player.moon"></moonboard>
                </div>
                <div class="game_end_block--log game-end-column">
                  <log-panel :color="player.color" :generation="player.generation" :id="player.id" :lastSoloGeneration="player.lastSoloGeneration" :players="player.players"></log-panel>
                </div>
              </div>
            </div>
        </div>
    `,
});

