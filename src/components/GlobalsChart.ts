import Vue from 'vue';
import {Chart, registerables} from 'chart.js';
import {PlayerModel} from '../models/PlayerModel';
import {Color} from '../Color';
import {GlobalParameter} from '../GlobalParameter';

Chart.register(...registerables);
Chart.defaults.font.size = 20;
Chart.defaults.font.family = 'Ubuntu, Sans';
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

export const GlobalsChart = Vue.component('globals-chart', {
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
    getDataSet: function(player: PlayerModel): Array<ChartDataSet> {
      const dataset: Array<ChartDataSet> = [];
      const gpg = player.globalsPerGeneration;

      function getValues(param: GlobalParameter, min: number, max: number): Array<number> {
        return gpg.map((entry) => {
          const val = entry[param] ?? min;
          return 100 * (val - min) / (max - min);
        });
      }

      dataset.push({label: 'Temperature', backgroundColor: ColorStringMap.get(Color.RED) as string, borderColor: ColorStringMap.get(Color.RED) as string, data: getValues(GlobalParameter.TEMPERATURE, -30, 8), fill: false, tension: 0.1, pointRadius: 6});
      dataset.push({label: 'Oxygen', backgroundColor: ColorStringMap.get(Color.GREEN) as string, borderColor: ColorStringMap.get(Color.GREEN) as string, data: getValues(GlobalParameter.OXYGEN, 0, 14), fill: false, tension: 0.1, pointRadius: 6});
      dataset.push({label: 'Oceans', backgroundColor: ColorStringMap.get(Color.BLUE) as string, borderColor: ColorStringMap.get(Color.BLUE) as string, data: getValues(GlobalParameter.OCEANS, 0, 9), fill: false, tension: 0.1, pointRadius: 6});

      if (player.gameOptions.venusNextExtension === true) {
        dataset.push({label: 'Venus', backgroundColor: ColorStringMap.get(Color.YELLOW) as string, borderColor: ColorStringMap.get(Color.YELLOW) as string, data: getValues(GlobalParameter.VENUS, 0, 30), fill: false, tension: 0.1, pointRadius: 6});
      }

      if (player.gameOptions.moonExpansion === true) {
        dataset.push({label: 'Colony Rate', backgroundColor: ColorStringMap.get(Color.ORANGE) as string, borderColor: ColorStringMap.get(Color.ORANGE) as string, data: getValues(GlobalParameter.MOON_COLONY_RATE, 0, 8), fill: false, tension: 0.1, pointRadius: 6});
        dataset.push({label: 'Mining Rate', backgroundColor: ColorStringMap.get(Color.PINK) as string, borderColor: ColorStringMap.get(Color.PINK) as string, data: getValues(GlobalParameter.MOON_MINING_RATE, 0, 8), fill: false, tension: 0.1, pointRadius: 6});
        dataset.push({label: 'Logistics Rate', backgroundColor: ColorStringMap.get(Color.PURPLE) as string, borderColor: ColorStringMap.get(Color.PURPLE) as string, data: getValues(GlobalParameter.MOON_LOGISTICS_RATE, 0, 8), fill: false, tension: 0.1, pointRadius: 6});
      }

      return dataset;
    },
    renderChart: function(): void {
      const ctx = document.getElementById('globalsChart') as HTMLCanvasElement;
      if (ctx !== null) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.getLabels(),
            datasets: this.getDataSet(this.players[0]),
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
                title: {text: '% completed', display: true},
                grid: {
                  color: (ctx) => {
                    return ctx.tick.value % 10 === 0 ? 'lightgray' : 'rgb(90, 90, 90)';
                  },
                },
                beginAtZero: true,
                ticks: {
                  autoSkip: false,
                  stepSize: 5,
                  callback: (value: string | number) => {
                    if (typeof(value) === 'string') return value;
                    return value % 10 === 0 ? value : '';
                  },
                },
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
        <canvas id="globalsChart"></canvas>
      <div></div>
    </div>
    `,
});
