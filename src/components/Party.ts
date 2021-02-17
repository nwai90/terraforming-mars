import Vue from 'vue';
import {PartyName} from '../turmoil/parties/PartyName';

export const Party = Vue.component('party', {
  props: {
    partyName: {
      type: Object as () => PartyName,
    },
  },
  data: function() {
    return {
    };
  },
  methods: {
    partyNameToCss: function(party: PartyName | undefined): string {
      if (party === undefined) {
        console.warn('no party provided');
        return '';
      }
      return party.toLowerCase().split(' ').join('_');
    },
  },
  template: `
    <div class="party-container">
      <div :class="'party-box party-background--' + partyNameToCss(partyName)">
        <div :class="'board-party board-party--' + partyNameToCss(partyName)">

          <div :class="'party-name party-name--'+partyNameToCss(partyName)" v-i18n>{{partyName}}</div>

        </div>
      </div>
    </div>
    `,
});
