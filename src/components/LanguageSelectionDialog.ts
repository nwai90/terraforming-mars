import Vue from 'vue';
import {LANGUAGES} from '../constants';
import {PreferencesManager} from './PreferencesManager';

export const LanguageSelectionDialog = Vue.component('language-selection-dialog', {
  name: 'LanguageSelectionDialog',
  props: {
    preferencesManager: {
      type: Object as () => PreferencesManager,
    },
  },
  methods: {
    switchLanguageTo(langId: string) {
      PreferencesManager.save('lang', langId);
      window.location.reload();
    },
  },
  computed: {
    LANGUAGES(): typeof LANGUAGES {
      return LANGUAGES;
    },
  },
  template: `
<div class="preferences_panel">
    <div class="preferences_panel_item form-group">
      <div class="preferences_panel_langs">
        <label class="form-radio" v-for="lang in LANGUAGES" :key="lang.id">
          <div
            :key="lang.id"
            :class="'language-icon language-icon--' + lang.id"
            :title="lang.title"
            @click="switchLanguageTo(lang.id)"
            style="vertical-align:sub;"
          />
          {{ lang.title }}
        </label>
      </div>
    </div>
  </div>
  `,
});
