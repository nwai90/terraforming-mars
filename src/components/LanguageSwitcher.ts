import Vue from 'vue';
import {LANGUAGES} from '../constants';
import {PreferencesManager} from './PreferencesManager';

export const LanguageSwitcher = Vue.component('language-switcher', {
  data: function() {
    return {
      'languages': LANGUAGES,
    };
  },
  methods: {
    switchLanguageTo: function(langId: string) {
      PreferencesManager.save('lang', langId);
      window.location.reload();
    },
  },
  template: `
        <div class="language-switcher">
            <div
                v-for="lang in languages"
                :class="'language-icon language-icon--'+lang.id language-icon-for-switcher"
                :title="lang.title"
                v-on:click="switchLanguageTo(lang.id)">&nbsp;</div>
        </div>
    `,
});
