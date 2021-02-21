import Vue from 'vue';
import {PartyName} from '../turmoil/parties/PartyName';
import {$t} from '../directives/i18n';
import {PoliticalAgendasModel, TurmoilModel} from '../models/TurmoilModel';
import {BonusId} from '../turmoil/Bonus';
import {PolicyId} from '../turmoil/Policy';

const AGENDA_HTML: Map<BonusId | PolicyId, string> = new Map();
{
  AGENDA_HTML.set('mb01',
    `<div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-building party-resource-tag"></div>`);
  AGENDA_HTML.set('mb02',
    `<div class="resource money party-resource">1</div> /
    <div class="tile empty-tile-small"></div>ON MARS`);
  AGENDA_HTML.set('sb01',
    `<div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-science party-resource-tag"></div>`);
  AGENDA_HTML.set('sb02',
    `<div class="resource money party-resource">1</div> / 3
    <div class="resource card card-small"></div>`);
  AGENDA_HTML.set('ub01',
    `<div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-venus party-resource-tag"></div>
    <div class="resource-tag tag-earth party-resource-tag"></div>
    <div class="resource-tag tag-jovian party-resource-tag"></div>`);
  AGENDA_HTML.set('ub02',
    `<div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-space party-resource-tag"></div>`);
  AGENDA_HTML.set('kb01',
    `<div class="resource money party-resource">1</div> /
    <div class="production-box party-production-box">
      <div class="heat production"></div>
    </div>`);
  AGENDA_HTML.set('kb02',
    `<div class="resource heat party-resource"></div> /
    <div class="production-box party-production-box">
      <div class="heat production"></div>
    </div>`);
  AGENDA_HTML.set('rb01',
    `<div class="party-inferior-rating tile party-rating party-tile">&lt;</div> :
  <div class="rating tile party-rating party-tile"></div>`);
  AGENDA_HTML.set('rb02',
    `<div class="party-inferior-rating tile party-rating party-tile">&gt;</div> :
  <div class="rating tile party-rating party-tile red-outline "></div>`);
  AGENDA_HTML.set('gb01',
    `<div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-plant party-resource-tag"></div>
    <div class="resource-tag tag-microbe party-resource-tag"></div>
    <div class="resource-tag tag-animal party-resource-tag"></div>`);
  AGENDA_HTML.set('gb02',
    `<div class="resource money party-resource">2</div> /
    <div class="tile greenery-tile greenery-tile-small"></div>`);

  AGENDA_HTML.set('mfp01',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="steel resource"></span></div>`);
  AGENDA_HTML.set('mfp02',
    `<div class="policy-top-margin"><div class="resource-tag tag-building"></div> : <div class="money resource">2</div></div>`);
  AGENDA_HTML.set('mfp03',
    `<div class="policy-top-margin"><div class="resource steel"></div> : +<div class="resource money">1</div></div>`);
  AGENDA_HTML.set('mfp04',
    `<span class="money resource">4</span>
     <span class="red-arrow-3x"></span>
    <div class="resource card card-with-border policy-card-with-tag"><div class="card-icon tag-building"></div></div>`);
  AGENDA_HTML.set('sp01',
    `<span class="money resource">10</span>
    <span class="red-arrow"></span>
    <span class="card card-with-border resource party-resource"></span>
    <span class="card card-with-border resource party-resource"></span>
    <span class="card card-with-border resource party-resource"></span>`);
  AGENDA_HTML.set('sp02',
    `<span>
    <div class="tile oxygen-tile req-tile-small" style="margin: 10px -5px;"></div>
    <div class="tile ocean-tile req-tile-small"></div>
    <div class="tile temperature-tile req-tile-small"></div>
    : ± 2</span>`);
  AGENDA_HTML.set('sp03', `<span>
    <div class="tile oxygen-tile req-tile-small" style="margin: 10px -5px;"></div>
    <div class="tile ocean-tile req-tile-small"></div>
    <div class="tile temperature-tile req-tile-small"></div>
    : <div class="resource card card-with-border"></div></span>`);
  AGENDA_HTML.set('sp04', `<div class="tags-requisite"><div class="resource-tag tag-science party-resource-tag"></div></div>`);
  AGENDA_HTML.set('up01',
    `<div class="policy-top-margin"><div class="resource titanium"></div> :
    + <div class="resource money">1</div></div>`);
  AGENDA_HTML.set('up02',
    `<div class="policy-top-margin">
    <span class="money resource">4</span>
    <span class="red-arrow-3x"></span>2<span class="titanium resource"></span> / 2<span class="floater resource"></span>
    </div>`);
  AGENDA_HTML.set('up03',
    `<span class="money resource">4</span>
    <span class="red-arrow-3x"></span>
    <div class="resource card card-with-border policy-card-with-tag"><div class="card-icon tag-space"></div></div>`);
  AGENDA_HTML.set('up04', `<div class="policy-top-margin"><div class="resource-tag tag-space"></div> : <div class="money resource">-2</div></div>`);
  AGENDA_HTML.set('kp01',
    `<span class="money resource">10</span>
    <span class="red-arrow-infinity"></span>
    <div class="production-box production-box-size2">
      <div class="energy production"></div>
      <div class="heat production"></div>
    </div>`);
  AGENDA_HTML.set('kp02', `<div class="tile temperature-tile req-tile-small" style="margin-right:5px;"></div> : <span class="money resource">3</span>`);
  AGENDA_HTML.set('kp03',
    `6 <span class="heat resource"></span>
    <span class="red-arrow-infinity"></span>
    <div class="tile temperature-tile"></div>`);
  AGENDA_HTML.set('kp04',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="heat resource"></span><span class="heat resource"></span></div>`);
  AGENDA_HTML.set('rp01',
    `<div class="policy-top-margin">
    <div class="rating tile"></div> :
    <div class="resource money">-3</div>
    </div>`);
  AGENDA_HTML.set('rp02', `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> : <span class="money resource">-3</span></div>`);
  AGENDA_HTML.set('rp03',
    `<span class="money resource">4</span>
    <span class="red-arrow-3x"></span>
    <div class="tile oxygen-tile req-tile-small red-outline" style="margin: 10px -5px;"></div> /
    <div class="tile ocean-tile req-tile-small red-outline"></div> /
    <div class="tile temperature-tile req-tile-small red-outline"></div>`);
  AGENDA_HTML.set('rp04',
    `<div class="tile oxygen-tile req-tile-small" style="margin: 10px -5px;"></div>
    <div class="tile ocean-tile req-tile-small"></div>
    <div class="tile temperature-tile req-tile-small"></div>
    : <div class="production-box production-box-size2" style="margin-left:5px;">
      <div class="production-prefix minus"></div><div class="money production">1</div>
    </div>`);
  AGENDA_HTML.set('gp01', `<div class="tile greenery-tile"></div> : <div class="resource money">4</div>`);
  AGENDA_HTML.set('gp02',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="plant resource"></span></div>`);
  AGENDA_HTML.set('gp03',
    `<div class="policy-top-margin">
    <div class="resource-tag tag-plant party-resource-tag"></div>
    <div class="resource-tag tag-microbe party-resource-tag"></div>
    <div class="resource-tag tag-animal party-resource-tag"></div> : <div class="resource money">2</div>
    </div>`);
  AGENDA_HTML.set('gp04',
    `<div class="policy-top-margin">
    <span class="money resource">5</span>
    <span class="red-arrow-3x"></span>3<span class="plant resource"></span> / 2<span class="microbe resource"></span>
    </div>`);
  AGENDA_HTML.set('spb01',
    `<div class="resource money party-resource">1</div> / <div class="resource-tag tag-diverse party-resource-tag"></div>`);
  AGENDA_HTML.set('spb02',
    `<div class="resource money party-resource">1</div> / <div class="resource diverse"></div>`);
  AGENDA_HTML.set('spp01',
    `<div class="policy-top-margin">
    <div class="tile venus-tile" style="transform: scale(0.8);"></div>: <div class="resource money">2</div>
    </div>`);
  AGENDA_HTML.set('spp02',
    `<div class="policy-top-margin">
    <div class="resource money">10</div>
    <span class="red-arrow"></span>
    <div class="card-resource-trade-fleet"></div>
    </div>`);
  AGENDA_HTML.set('spp03',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div>ON MARS : -
    <span class="resource card card-with-border"></span></div>`);
  AGENDA_HTML.set('spp04',
    `<span class="money resource">4</span>
    <span class="red-arrow-3x"></span>
    <div class="resource card card-with-border policy-card-with-tag"><div class="card-icon tag-planetary"></div></div>`);
  AGENDA_HTML.set('eb01',
    `<div class="resource money party-resource">2</div> / <div class="resource-tag tag-power party-resource-tag"></div>`);
  AGENDA_HTML.set('eb02',
    `<div class="resource money party-resource">1</div> /
    <div class="production-box party-production-box">
        <div class="energy production"></div>
    </div>`);
  AGENDA_HTML.set('ep01',
    `<span class="money resource">X</span>
    <span class="red-arrow"></span>
    <span class="energy resource">X</span>`);
  AGENDA_HTML.set('ep02',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="energy resource"></span></div>`);
  AGENDA_HTML.set('ep03',
    `<div class="policy-top-margin">
        +/- <div class="production-box">
            <div class="energy production"></div>
        </div> : <span class="energy resource"></span>
    </div>`);
  AGENDA_HTML.set('ep04', `<div class="policy-top-margin"><div class="resource-tag tag-power"></div> : <div class="money resource">-3</div></div>`);
  AGENDA_HTML.set('pb01',
    `<div class="resource money party-resource">-1</div> / <div class="resource money party-resource">5</div> over 40`);
  AGENDA_HTML.set('pb02',
    `<div class="resource money party-resource">-2</div> / 8 <div class="resource card card-with-border card-small"></div>`);
  AGENDA_HTML.set('pp01',
    `<div class="policy-top-margin">
    <div class="plate" style="color:black">No Card Discounts</div>
    </div>`);
  AGENDA_HTML.set('pp02',
    `<div class="policy-top-margin">
    <div class="card-vp-questionmark">?</div> : <div class="resource money">-2</div>
    </div>`);
  AGENDA_HTML.set('pp03',
    `<div class="policy-top-margin">
    <span class="red-arrow"></span>
    <div class="resource card card-with-border"></div>
    <div class="resource card card-with-border"></div> *
    </div>`);
  AGENDA_HTML.set('pp04',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="money resource">3</span></div>`);
  AGENDA_HTML.set('bb01',
    `<div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-event party-resource-tag"></div>`);
  AGENDA_HTML.set('bb02',
    `<div style="margin-top:-5px">
    Mark all <div class="resource card card-with-border"><div class="card-tag-blue"></div></div> actions
    </div>`);
  AGENDA_HTML.set('bp01',
    `<div class="policy-top-margin">
    <span class="money resource">3</span>
    <span class="red-arrow-3x"></span>
    <div class="delegate"></div>
    </div>`);
  AGENDA_HTML.set('bp02',
    `<div class="policy-top-margin">
    <div class="trade"></div> : <div class="trade-discount">+1</div>
    </div>`);
  AGENDA_HTML.set('bp03',
    `<div class="policy-top-margin">
    <span class="money resource">3</span>
    <span class="red-arrow-3x"></span>
    <div class="reserve-marker"></div>
    </div>`);
  AGENDA_HTML.set('bp04', `<div class="policy-top-margin"><div class="resource-tag tag-earth"></div> : <div class="money resource">-3</div></div>`);
  AGENDA_HTML.set('tb01',
    `<div class="resource money party-resource">1</div> / <div class="resource card card-small card-with-border"><div class="card-tag-req"></div></div>`);
  AGENDA_HTML.set('tb02',
    `<div class="resource money party-resource">1</div> / <div class="resource-tag tag-none party-resource-tag"></div>`);
  AGENDA_HTML.set('tp01', `<div class="tags-requisite"><div class="resource-tag tag-wild party-resource-tag"></div></div>`);
  AGENDA_HTML.set('tp02',
    `<div class="policy-top-margin">
    <span class="money resource">10</span>
    <span class="red-arrow"></span>
    <div class="influence"></div>
    </div>`);
  AGENDA_HTML.set('tp03',
    `<div class="policy-top-margin">
    <span class="money resource">10</span>
    <span class="red-arrow"></span>
    <div class="resource card card-small card-with-border">
        <div class="card-tag-req"><div class="stretched-x">X</div></div>
    </div>
    </div>`);
  AGENDA_HTML.set('tp04',
    `<div class="policy-top-margin">
    <div class="trade"></div> : +1
    </div>`);
  AGENDA_HTML.set('cb01', `<div class="resource money party-resource">8</div>`);
  AGENDA_HTML.set('cb02', `1 <div class="rating tile party-rating party-tile"></div>`);
  AGENDA_HTML.set('cp01',
    `<div class="policy-top-margin">
    <span class="red-arrow"></span>
    <span class="money resource">6</span>
    </div>`);
  AGENDA_HTML.set('cp02',
    `<div class="policy-top-margin">
    <div class="delegate"></div> : <span class="money resource">+2</span>
    </div>`);
  AGENDA_HTML.set('cp03',
    `<div class="policy-top-margin">
    <span class="red-arrow"></span>
    <div class="trade"></div>
    </div>`);
  AGENDA_HTML.set('cp04', `<div class="policy-top-margin"><div class="resource-tag tag-event"></div> : <div class="money resource">-2</div></div>`);
}

export const Turmoil = Vue.component('turmoil', {
  props: {
    turmoil: {
      type: Object as () => TurmoilModel,
    },
  },
  methods: {
    partyNameToCss: function(party: PartyName | undefined): string {
      if (party === undefined) {
        console.warn('no party provided');
        return '';
      }
      return party.toLowerCase().split(' ').join('_');
    },
    getBonus: function(party: PartyName, politicalAgendas: PoliticalAgendasModel | undefined): string {
      let bonusId: BonusId | undefined = undefined;
      if (politicalAgendas?.staticAgendas !== undefined) {
        const staticAgendas = politicalAgendas.staticAgendas;
        switch (party) {
        case PartyName.MARS:
          bonusId = staticAgendas.marsFirst?.bonusId;
          break;
        case PartyName.SCIENTISTS:
          bonusId = staticAgendas.scientists?.bonusId;
          break;
        case PartyName.UNITY:
          bonusId = staticAgendas.unity?.bonusId;
          break;
        case PartyName.KELVINISTS:
          bonusId = staticAgendas.kelvinists?.bonusId;
          break;
        case PartyName.REDS:
          bonusId = staticAgendas.reds?.bonusId;
          break;
        case PartyName.GREENS:
          bonusId = staticAgendas.greens?.bonusId;
          break;
        case PartyName.SPOME:
          bonusId = staticAgendas.spome?.bonusId;
          break;
        case PartyName.EMPOWER:
          bonusId = staticAgendas.empower?.bonusId;
          break;
        case PartyName.POPULISTS:
          bonusId = staticAgendas.populists?.bonusId;
          break;
        case PartyName.BUREAUCRATS:
          bonusId = staticAgendas.bureaucrats?.bonusId;
          break;
        case PartyName.TRANSHUMANS:
          bonusId = staticAgendas.transhumans?.bonusId;
          break;
        case PartyName.CENTRISTS:
          bonusId = staticAgendas.centrists?.bonusId;
          break;
        }
      }
      if (bonusId !== undefined) {
        const bonus = AGENDA_HTML.get(bonusId);
        return bonus || `No ruling Bonus`;
      }
      return `No ruling Bonus`;
    },
    getPolicy: function(party: PartyName | undefined, politicalAgendas: PoliticalAgendasModel | undefined, useCurrentAgenda: boolean = false) {
      let policyId: PolicyId | undefined = undefined;
      if (useCurrentAgenda) {
        policyId = politicalAgendas?.currentAgenda.policyId;
      } else {
        if (politicalAgendas?.staticAgendas !== undefined) {
          const staticAgendas = politicalAgendas.staticAgendas;
          switch (party) {
          case PartyName.MARS:
            policyId = staticAgendas.marsFirst?.policyId;
            break;
          case PartyName.SCIENTISTS:
            policyId = staticAgendas.scientists?.policyId;
            break;
          case PartyName.UNITY:
            policyId = staticAgendas.unity?.policyId;
            break;
          case PartyName.KELVINISTS:
            policyId = staticAgendas.kelvinists?.policyId;
            break;
          case PartyName.REDS:
            policyId = staticAgendas.reds?.policyId;
            break;
          case PartyName.GREENS:
            policyId = staticAgendas.greens?.policyId;
            break;
          case PartyName.SPOME:
            policyId = staticAgendas.spome?.policyId;
            break;
          case PartyName.EMPOWER:
            policyId = staticAgendas.empower?.policyId;
            break;
          case PartyName.POPULISTS:
            policyId = staticAgendas.populists?.policyId;
            break;
          case PartyName.BUREAUCRATS:
            policyId = staticAgendas.bureaucrats?.policyId;
            break;
          case PartyName.TRANSHUMANS:
            policyId = staticAgendas.transhumans?.policyId;
            break;
          case PartyName.CENTRISTS:
            policyId = staticAgendas.centrists?.policyId;
            break;
          }
        }
      }

      if (policyId !== undefined) {
        const policy = AGENDA_HTML.get(policyId);
        return policy || `No ruling Policy`;
      }
      return '<p>' + $t('No ruling Policy') + '</p>';
    },
    toggleMe: function() {
      const currentState: boolean = this.isVisible();
      (this.$root as any).setVisibilityState('turmoil_parties', ! currentState);
    },
    isVisible: function() {
      return (this.$root as any).getVisibilityState('turmoil_parties');
    },
  },
  template: `
    <div class="turmoil" v-trim-whitespace>
      <div class="events-board">
          <div v-if="turmoil.distant" class="global-event">
            <div class="event-party event-party--top" :class="'event-party--'+partyNameToCss(turmoil.distant.revealed)" v-i18n>{{ turmoil.distant.revealed }}</div>
            <div class="event-party event-party--bottom" :class="'event-party--'+partyNameToCss(turmoil.distant.current)" v-i18n>{{ turmoil.distant.current }}</div>
            <div class="event-content"><div class="event-text" v-i18n>{{ turmoil.distant.description }}</div></div>
          </div>
          <div v-if="turmoil.coming" class="global-event global-event--coming">
            <div class="event-party event-party--top" :class="'event-party--'+partyNameToCss(turmoil.coming.revealed)" v-i18n>{{ turmoil.coming.revealed }}</div>
            <div class="event-party event-party--bottom" :class="'event-party--'+partyNameToCss(turmoil.coming.current)" v-i18n>{{ turmoil.coming.current }}</div>
            <div class="event-content" v-i18n>{{ turmoil.coming.description }}</div>
          </div>
          <div v-if="turmoil.current" class="global-event global-event--current">
            <div class="event-party event-party--top" :class="'event-party--'+partyNameToCss(turmoil.current.revealed)" v-i18n>{{ turmoil.current.revealed }}</div>
            <div class="event-party event-party--bottom" :class="'event-party--'+partyNameToCss(turmoil.current.current)" v-i18n>{{ turmoil.current.current }}</div>
            <div class="event-content" v-i18n>{{ turmoil.current.description }}</div>
          </div>
      </div>

      <div class="turmoil-board">
        <div class="turmoil-header">
          <div class="turmoil-lobby">
            <div class="lobby-spot" v-for="n in 5" :key="n">
                <div v-if="turmoil.lobby.length >= n" :class="'player-token '+turmoil.lobby[n-1]"></div>
            </div>
          </div>
          <div class="dominant-party-name">
            <div :class="'party-name party-name--'+partyNameToCss(turmoil.ruling)" v-i18n>{{ turmoil.ruling }}</div>
          </div>
          <div class="dominant-party-bonus" v-html="getPolicy(turmoil.ruling, turmoil.politicalAgendas, true)"></div>
          <div class="chairman-spot"><div v-if="turmoil.chairman" :class="'player-token '+turmoil.chairman"></div></div>
          <div class="turmoil-reserve">
              <div class="lobby-spot" v-for="n in turmoil.reserve.length" :key="n">
                <div v-if="turmoil.reserve.length >= n" :class="'player-token '+turmoil.reserve[n-1].color">{{ turmoil.reserve[n-1].number }}</div>
              </div>
          </div>
          <div class="policies">
            <div class="policies-title">
                <a class="policies-clickable" href="#" v-on:click.prevent="toggleMe()" v-i18n>Policies</a>
            </div>
            <div v-show="isVisible()" class='policies-global'>
              <div v-for="party in turmoil.parties" class='policy-block'>
                <div :class="'party-name party-name--'+partyNameToCss(party.name)" v-i18n>{{party.name}}</div>
                <div class="policy-bonus" v-html="getPolicy(party.name, turmoil.politicalAgendas)"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-leaders">
          <div v-for="party in turmoil.parties" :class="['leader-spot', 'leader-spot--'+partyNameToCss(party.name), {'player-token-new-leader': (party.name === turmoil.dominant)}]">
            <div class="delegate-spot">
              <div v-if="party.partyLeader" :class="['player-token', party.partyLeader]"></div>
            </div>
          </div>
        </div>

        <div class="grid-parties">
          <div v-for="party in turmoil.parties" :class="'board-party board-party--'+partyNameToCss(party.name)">
            <div class="grid-delegates">
              <div class="delegate-spot" v-for="n in 6" :key="n">
                <div v-if="party.delegates.length >= n" :class="'player-token '+party.delegates[n-1].color">{{ party.delegates[n-1].number }}</div>
              </div>
            </div>
            <div :class="'party-name party-name--'+partyNameToCss(party.name)" v-i18n>{{party.name}}</div>
            <div class="party-bonus">
              <span v-html="getBonus(party.name, turmoil.politicalAgendas)"></span>
            </div>
          </div>
        </div>

        <div class="turmoil-party-transition-arrow-grid">
          <div class="turmoil-party-transition-arrow"></div>
          <div class="turmoil-party-transition-arrow"></div>
          <div class="turmoil-party-transition-arrow"></div>
          <div class="turmoil-party-transition-arrow"></div>
          <div class="turmoil-party-transition-arrow"></div>
        </div>
      </div>
    </div>
    `,
});
