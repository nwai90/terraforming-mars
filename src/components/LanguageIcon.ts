import Vue from 'vue';
import {LANGUAGES2} from '../constants';
import {LanguageSelectionDialog} from './LanguageSelectionDialog';
import {PreferencesManager} from './PreferencesManager';
import {TranslateMixin} from './TranslateMixin';

export const LanguageIcon = Vue.component('language-icon', {
  name: 'LanguageIcon',
  components: {
    'language-selection-dialog': LanguageSelectionDialog,
  },
  data() {
    return {
      languagePanelOpen: false,
    };
  },
  methods: {
    toggleLanguagePanelOpen: function(): void {
      this.languagePanelOpen = !this.languagePanelOpen;
    },
  },
  mixins: [TranslateMixin],
  computed: {
    preferencesManager(): PreferencesManager {
      return PreferencesManager;
    },
    lang(): keyof typeof LANGUAGES2 {
      return (PreferencesManager.load('lang') || 'en') as keyof typeof LANGUAGES2;
    },
    title(): string {
      return LANGUAGES2[this.lang];
    },
  },
  template: `
  <div class="preferences_item preferences_item--language" :title="$t('Language')">
    <div
      class="preferences_icon preferences_icon--language"
      :class="{'preferences_item--is-active': languagePanelOpen}">
      <div :class="'language-icon language-icon--for-sidebar language-icon--' + lang"
      :title="title"
      v-on:click="toggleLanguagePanelOpen"/>
      </div>
    <language-selection-dialog v-show="languagePanelOpen" :preferencesManager="preferencesManager"/>
  </div>
  `,
});
