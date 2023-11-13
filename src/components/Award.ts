import Vue from 'vue';
import {AWARD_COSTS} from '../constants';
import {FundedAwardModel} from '../models/FundedAwardModel';
import {PreferencesManager} from './PreferencesManager';
import {ICard} from '../cards/ICard';
import {CardName} from '../CardName';

export const Award = Vue.component('award', {
  props: {
    awards_list: {
      type: Array as () => Array<FundedAwardModel>,
    },
    corporations: {
      type: Array as () => Array<ICard>,
    },
    spectator: {
      type: Boolean,
    },
    show_scores: {
      type: Boolean,
      default: true,
    },
  },
  data: function() {
    const collapse_awards: boolean = PreferencesManager.loadBoolean('collapse_awards');

    return {
      showDescription: false,
      showList: !collapse_awards,
    };
  },
  methods: {
    getNameCss: function(awardName: string): string {
      return (
        'ma-name ma-name--' + awardName.replace(/ /g, '-').toLowerCase()
      );
    },
    shouldShow: function(): boolean {
      return this.showDescription === true;
    },
    shouldShowList: function(): boolean {
      return this.showList;
    },
    toggle: function() {
      this.showDescription = !this.showDescription;
    },
    toggleList: function() {
      this.showList = !this.showList;
      PreferencesManager.save('collapse_awards', !this.showList);
    },
    getClassForAwardTile: function(award: FundedAwardModel) {
      if (award.scores.length > 0) return 'ma-block';
      return 'ma-block ma-block-grayscale';
    },
    getAvailableAwardSpots: function(): Array<number | string> {
      let numFundedAwards = 0;
      this.awards_list.forEach((award)=>{
        if (award.player_name) {
          numFundedAwards++;
        }
      });

      if (this.corporations.some((c) => c.name === CardName.NIRGAL_ENTERPRISES)) {
        if (this.spectator) {
          return Array(this.awards_list.length - numFundedAwards).fill('?');
        } else {
          return Array(this.awards_list.length - numFundedAwards).fill(0);
        }
      }

      return AWARD_COSTS.slice(numFundedAwards);
    },
  },
  template: `
    <div class="awards_cont" v-trim-whitespace>
        <div class="awards">
            <div class="ma-title">
                <a class="ma-clickable awards-padding" href="#" v-on:click.prevent="toggleList()" v-i18n>Awards</a>
                <span v-for="award in awards_list" v-if="award.player_name" class="milestone-award-inline paid" :title="award.player_name">
                    <span v-i18n>{{ award.award.name }}</span>
                    <span class="ma-player-cube"><i :class="'board-cube board-cube--'+award.player_color" /></span>
                </span>
                <span v-for="spotPrice in getAvailableAwardSpots()" class="milestone-award-inline unpaid">
                  <div class="milestone-award-price">{{spotPrice}}</div>
                </span>
            </div>

            <div v-show="shouldShowList()">
                <div title="press to show or hide the description" v-on:click.prevent="toggle()" v-for="award in awards_list" :class=getClassForAwardTile(award)>
                    <div class="ma-player" v-if="award.player_name"><i :title="award.player_name" :class="'board-cube board-cube--'+award.player_color" /></div>
                    <div class="ma-name--awards award-block" :class="getNameCss(award.award.name)" v-i18n>
                        {{award.award.name}}
                        <div v-if="show_scores" class="ma-scores player_home_block--milestones-and-awards-scores">
                            <p v-for="score in [...award.scores].sort(
                                (s1, s2) => s2.playerScore - s1.playerScore
                            )" :class="'ma-score player_bg_color_'+score.playerColor">{{ score.playerScore }}</p>
                        </div>
                    </div>
                    <div v-show="shouldShow()" class="ma-description" v-i18n>{{award.award.description}}</div>
                </div>
            </div>
        </div>
    </div>
    `,
});
