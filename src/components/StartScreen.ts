import Vue from 'vue';
import {LanguageSwitcher} from './LanguageSwitcher';

import * as raw_settings from '../genfiles/settings.json';

export const StartScreen = Vue.component('start-screen', {
  props: {
    version: {
      type: String as () => typeof raw_settings.version,
    },
  },
  components: {
    LanguageSwitcher,
  },
  methods: {
    getAppVersion(): string {
      const versionParts = this.version.split(' ');
      return versionParts[0];
    },
    getAppDate(): string {
      const versionParts = this.version.split(' ');
      if (versionParts.length > 1) {
        return versionParts.slice(1).join(' ');
      }
      return '';
    },
  },
  template: `
<div class="start-screen">
  <div v-i18n class="start-screen-links">
    <div class="start-screen-header start-screen-link--title">
      <div class="start-screen-title-top">TERRAFORMING</div>
      <div class="start-screen-title-bottom">MARS</div>
    </div>
    <a class="start-screen-link start-screen-link--new-game" href="/new-game" v-i18n>New game</a>
    <a class="start-screen-link start-screen-link--how-to-play" href="https://github.com/terraforming-mars/terraforming-mars/wiki/Rulebooks" target="_blank" v-i18n>How to Play</a>
    <a class="start-screen-link start-screen-link--cards-list" href="/cards" target="_blank" v-i18n>Cards list</a>
    <a class="start-screen-link start-screen-link--board-game" href="https://boardgamegeek.com/boardgame/167791/terraforming-mars" target="_blank" v-i18n>Board game</a>
    <a class="start-screen-link start-screen-link--about" href="https://www.notion.so/Community-Add-ons-98a78a03dc6b4006926bf14e046309c8" target="_blank" v-i18n>Documentation</a>
    <a class="start-screen-link start-screen-link--bmac" href="https://buymeacoffee.com/memories90" target="_blank" v-i18n>Support the server</a>
    <a class="start-screen-link start-screen-link--chat" href="https://discord.gg/SGeHJ5pSuX" target="_blank" v-i18n>Join us on Discord</a>
    <div class="start-screen-footer start-screen-link--languages">
      <language-switcher />
      <div class="start-screen-version-cont">
        <div class="nowrap start-screen-date"><span v-i18n>deployed</span>: {{getAppDate()}}</div>
        <div class="nowrap start-screen-version"><span v-i18n>version</span>: {{getAppVersion()}}</div>
      </div>

      <div class="source-code">
        <div>
            <a href="https://github.com/nwai90/terraforming-mars" target="_blank" class="source-code-text">
                <img src="/assets/misc/github.png" class="source-code-img">
                source code
            </a>
        </div>
        <div>
            <a href="https://www.buymeacoffee.com/memories90" target="_blank">
                <img src="/assets/misc/bmac.png" class="bmac">
            </a>
        </div>
        </div>
    </div>
  </div>
</div>`,
});
