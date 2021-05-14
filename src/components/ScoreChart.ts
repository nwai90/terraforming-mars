import Vue from 'vue';
import {Chart, registerables} from 'chart.js';
import {PlayerModel} from '../models/PlayerModel';
import {Color} from '../Color';

Chart.register(...registerables);
Chart.defaults.font.size = 20;
Chart.defaults.color = 'rgb(240, 240, 240)';

const ColorStringMap = new Map([
  [Color.RED, 'rgb(153, 17, 0)'],
  [Color.YELLOW, 'rgb(170, 170, 0)'],
  [Color.GREEN, 'rgb(0, 153, 0)'],
  [Color.BLACK, 'rgb(170, 170, 170)'],
  [Color.BLUE, 'rgb(0, 102, 255)'],
  [Color.PURPLE, 'rgb(140, 0, 255)'],
  [Color.ORANGE, 'rgb(236, 113, 12)'],
  [Color.PINK, 'rgb(245, 116, 187)'],
]);

interface ChartDataSet {
  label: string,
  data: Array<number>,
  fill: boolean,
  backgroundColor: string,
  borderColor: string,
  tension: number,
  pointRadius: number,
}

export const ScoreChart = Vue.component('score-chart', {
  data: function() {
    return {};
  },
  props: {
    players: {
      type: Array as () => Array<PlayerModel>,
    },
    generation: {
      type: Number,
    },
    animation: {
      type: Boolean,
    },
  },
  methods: {
    getLabels: function(): Array<number> {
      return Array.from({length: this.generation}, (_, index) => index + 1);
    },
    getOnePlayerDataSet: function(player: PlayerModel): ChartDataSet {
      return {
        label: player.name,
        data: player.endGenerationScores,
        fill: false,
        backgroundColor: ColorStringMap.get(player.color) as string,
        borderColor: ColorStringMap.get(player.color) as string,
        tension: 0.1,
        pointRadius: 6,
      };
    },
    getAllPlayerDataSet: function(): Array<ChartDataSet> {
      return this.players.map((player) => this.getOnePlayerDataSet(player));
    },
    renderChart: function(): void {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      if (ctx !== null) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.getLabels(),
            datasets: this.getAllPlayerDataSet(),
          },
          options: {
            animation: {
              duration: this.animation ? 1000 : 0,
              easing: 'linear',
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                title: {text: 'Victory Points', display: true},
                grid: {color: 'rgb(90, 90, 90'},
                beginAtZero: true,
              },
              x: {
                title: {text: 'Generation', display: true},
                offset: true,
              },
            },
          },
        });
      }
    },
  },
  mounted() {
    this.renderChart();
  },
  template: `
    <div class="score-chart-container">
      <div></div>
        <canvas id="myChart"></canvas>
      <div></div>
    </div>
    `,
});
