import Vue from 'vue';
import {Button} from '../components/common/Button';
import {PlayerInputModel} from '../models/PlayerInputModel';
import {Party} from '../components/Party';
import {TranslateMixin} from './TranslateMixin';

export const SelectPartyToSendDelegate = Vue.component('select-party-to-send-delegate', {
  props: {
    playerinput: {
      type: Object as () => PlayerInputModel,
    },
    onsave: {
      type: Function as unknown as () => (out: Array<Array<string>>) => void,
    },
    showsave: {
      type: Boolean,
    },
    showtitle: {
      type: Boolean,
    },
  },
  mixins: [TranslateMixin],
  data: function() {
    return {
      selectedParty: undefined as string | undefined,
    };
  },
  components: {
    'Button': Button,
    'Party': Party,
  },
  methods: {
    saveData: function() {
      const result: string[][] = [];
      result.push([]);
      if (this.selectedParty !== undefined) {
        result[0].push(this.selectedParty);
      }
      this.onsave(result);
    },
  },
  template: `
    <div class="wf-component wf-component--select-party">
        <div v-if="showtitle === true" class="nofloat wf-component-title">{{ $t(playerinput.title) }}</div>
        <div class="wf-component--list-party">
          <label v-for="party in playerinput.turmoil.parties" :key="party.name">
              <input type="radio" v-model="selectedParty" :value="party.name" />
              <party :party="party"></party>
          </label>
        </div>
        <div v-if="showsave === true" class="nofloat">
            <Button :onClick="saveData" :title="playerinput.buttonLabel" /> 
        </div>
    </div>
    `,
});

