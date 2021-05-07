import Vue from 'vue';
import {PartyName} from '../turmoil/parties/PartyName';
import {$t} from '../directives/i18n';
import {PoliticalAgendasModel, TurmoilModel} from '../models/TurmoilModel';
import {BonusId} from '../turmoil/Bonus';
import {PolicyId} from '../turmoil/Policy';
import {GlobalEvent} from './GlobalEvent';

const AGENDA_HTML: Map<BonusId | PolicyId, string> = new Map();
{
  AGENDA_HTML.set('mb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each Building tag">
    <div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-building party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('mb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each tile ON MARS">
    <div class="resource money party-resource">1</div> /
    <div class="tile empty-tile-small"></div>ON MARS
    </div>`);
  AGENDA_HTML.set('sb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each Science tag">
    <div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-science party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('sb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for every 3 cards in hand">
    <div class="resource money party-resource">1</div> / 3
    <div class="resource card card-small"></div>
    </div>`);
  AGENDA_HTML.set('ub01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each Venus, Earth and Jovian tag">
    <div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-venus party-resource-tag"></div>
    <div class="resource-tag tag-earth party-resource-tag"></div>
    <div class="resource-tag tag-jovian party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('ub02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each Space tag">
    <div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-space party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('kb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each Heat production">
    <div class="resource money party-resource">1</div> /
    <div class="production-box party-production-box">
      <div class="heat production"></div>
    </div>
    </div>`);
  AGENDA_HTML.set('kb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 heat for each Heat production">
    <div class="resource heat party-resource"></div> /
    <div class="production-box party-production-box">
      <div class="heat production"></div>
    </div>
    </div>`);
  AGENDA_HTML.set('rb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="The player(s) with the lowest TR gains 1 TR">
    <div class="party-inferior-rating tile party-rating party-tile">&lt;</div> :
    <div class="rating tile party-rating party-tile"></div>
    </div>`);
  AGENDA_HTML.set('rb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="The player(s) with the highest TR loses 1 TR">
    <div class="party-inferior-rating tile party-rating party-tile">&gt;</div> :
    <div class="rating tile party-rating party-tile red-outline "></div>
    </div>`);
  AGENDA_HTML.set('gb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each Plant, Microbe and Animal tag">
    <div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-plant party-resource-tag"></div>
    <div class="resource-tag tag-microbe party-resource-tag"></div>
    <div class="resource-tag tag-animal party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('gb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 2 M€ for each Greenery tile">
    <div class="resource money party-resource">2</div> /
    <div class="tile greenery-tile greenery-tile-small"></div>
    </div>`);
  AGENDA_HTML.set('mfp01',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="steel resource"></span></div>
    <div class="bonus-text">When you place a tile ON MARS, gain 1 steel</div>`);
  AGENDA_HTML.set('mfp02',
    `<div class="policy-top-margin"><div class="resource-tag tag-building"></div> : <div class="money resource">2</div></div>
    <div class="bonus-text">When you play a Building tag, gain 2 M€</div>`);
  AGENDA_HTML.set('mfp03',
    `<div class="policy-top-margin"><div class="resource steel"></div> : +<div class="resource money">1</div></div>
    <div class="bonus-text">Your steel resources are worth 1 M€ extra</div>`);
  AGENDA_HTML.set('mfp04',
    `<span class="money resource">4</span>
    <span class="red-arrow-3x"></span>
    <div class="resource card card-with-border policy-card-with-tag"><div class="card-icon tag-building"></div></div>
    <div class="bonus-text">Spend 4 M€ to draw a Building card</div>`);
  AGENDA_HTML.set('sp01',
    `<span class="money resource">10</span>
    <span class="red-arrow"></span>
    <span class="card card-with-border resource party-resource"></span>
    <span class="card card-with-border resource party-resource"></span>
    <span class="card card-with-border resource party-resource"></span>
    <div class="bonus-text">Pay 10 M€ to draw 3 cards</div>`);
  AGENDA_HTML.set('sp02',
    `<span>
    <div class="tile oxygen-tile req-tile-small" style="margin: 10px -5px;"></div>
    <div class="tile ocean-tile req-tile-small"></div>
    <div class="tile temperature-tile req-tile-small"></div>
    : ± 2</span>
    <div class="bonus-text">Your global requirements are +/- 2 steps</div>`);
  AGENDA_HTML.set('sp03',
    `<span>
    <div class="tile oxygen-tile req-tile-small" style="margin: 10px -10px; transform: scale(0.7)"></div>
    <div class="tile ocean-tile req-tile-small" style="margin: 10px -2px; transform: scale(0.7)"></div>
    <div class="tile temperature-tile req-tile-small" style="margin: 10px -2px; transform: scale(0.7)"></div>
    : +<div class="resource card card-with-border card-mini"></div>-<div class="resource card card-with-border card-mini""></div></span>
    <div class="bonus-text">When you raise a global parameter, draw and discard a card per step raised</div>`);
  AGENDA_HTML.set('sp04',
    `<div class="tags-requisite"><div class="resource-tag tag-science party-resource-tag"></div></div>
    <div class="bonus-text">Cards with Science tag requirements cost 1 less tag to play</div>`);
  AGENDA_HTML.set('up01',
    `<div class="policy-top-margin"><div class="resource titanium"></div> :
    + <div class="resource money">1</div></div>
    <div class="bonus-text">Your titanium resources are worth 1 M€ extra</div>`);
  AGENDA_HTML.set('up02',
    `<div class="policy-top-margin">
    <span class="money resource">4</span>
    <span class="red-arrow-3x"></span>2<span class="titanium resource"></span> / 2<span class="floater resource"></span>
    </div>
    <div class="bonus-text">Spend 4 M€ to gain 2 titanium or add 2 floaters to any card</div>`);
  AGENDA_HTML.set('up03',
    `<span class="money resource">4</span>
    <span class="red-arrow-3x"></span>
    <div class="resource card card-with-border policy-card-with-tag"><div class="card-icon tag-space"></div></div>
    <div class="bonus-text">Spend 4 M€ to draw a Space card</div>`);
  AGENDA_HTML.set('up04',
    `<div class="policy-top-margin"><div class="resource-tag tag-space"></div> : <div class="money resource">-2</div></div>
    <div class="bonus-text">When you play a Space tag, you pay 2 M€ less for it</div>`);
  AGENDA_HTML.set('kp01',
    `<span class="money resource">10</span>
    <span class="red-arrow-infinity"></span>
    <div class="production-box production-box-size2">
      <div class="energy production"></div>
      <div class="heat production"></div>
    </div>
    <div class="bonus-text">Pay 10 M€ to increase your Energy and Heat production 1 step</div>`);
  AGENDA_HTML.set('kp02',
    `<div class="tile temperature-tile req-tile-small" style="margin-right:5px;"></div> : <span class="money resource">3</span>
    <div class="bonus-text">When you raise temperature, gain 3 M€ per step raised</div>`);
  AGENDA_HTML.set('kp03',
    `6 <span class="heat resource"></span>
    <span class="red-arrow-infinity"></span>
    <div class="tile temperature-tile"></div>
    <div class="bonus-text">Convert 6 heat into temperature</div>`);
  AGENDA_HTML.set('kp04',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="heat resource"></span><span class="heat resource"></span></div>
    <div class="bonus-text">When you place a tile, gain 2 heat</div>`);
  AGENDA_HTML.set('rp01',
    `<div class="policy-top-margin">
    <div class="rating tile"></div> :
    <div class="resource money">-3</div>
    </div>
    <div class="bonus-text">When you take an action that raises TR, pay 3 M€ per step raised</div>`);
  AGENDA_HTML.set('rp02',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> : <span class="money resource">-3</span></div>
    <div class="bonus-text">When you place a tile, pay 3 M€ or as much as possible</div>`);
  AGENDA_HTML.set('rp03',
    `<span class="money resource">4</span>
    <span class="red-arrow-3x"></span>
    <div class="tile oxygen-tile req-tile-small red-outline" style="margin: 10px -5px;"></div> /
    <div class="tile ocean-tile req-tile-small red-outline"></div> /
    <div class="tile temperature-tile req-tile-small red-outline"></div>
    <div class="bonus-text">Pay 4 M€ to reduce a non-maxed global parameter 1 step (do not gain any track bonuses)</div>`);
  AGENDA_HTML.set('rp04',
    `<div class="tile oxygen-tile req-tile-small" style="margin: 10px -5px;"></div>
    <div class="tile ocean-tile req-tile-small"></div>
    <div class="tile temperature-tile req-tile-small"></div>
    : <div class="production-box production-box-size2" style="margin-left:5px;">
      <div class="production-prefix minus"></div><div class="money production">1</div>
    </div>
    <div class="bonus-text">When you raise a global parameter, decrease your M€ production 1 step per step raised if possible</div>`);
  AGENDA_HTML.set('gp01',
    `<div class="tile greenery-tile"></div> : <div class="resource money">4</div>
    <div class="bonus-text">When you place a greenery tile, gain 4 M€</div>`);
  AGENDA_HTML.set('gp02',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="plant resource"></span></div>
    <div class="bonus-text">When you place a tile, gain 1 plant</div>`);
  AGENDA_HTML.set('gp03',
    `<div class="policy-top-margin">
    <div class="resource-tag tag-plant party-resource-tag"></div>
    <div class="resource-tag tag-microbe party-resource-tag"></div>
    <div class="resource-tag tag-animal party-resource-tag"></div> : <div class="resource money">2</div>
    </div>
    <div class="bonus-text">When you play an animal, plant or microbe tag, gain 2 M€</div>`);
  AGENDA_HTML.set('gp04',
    `<div class="policy-top-margin">
    <span class="money resource">5</span>
    <span class="red-arrow-3x"></span>3<span class="plant resource"></span> / 2<span class="microbe resource"></span>
    </div>
    <div class="bonus-text">Spend 5 M€ to gain 3 plants or add 2 microbes to any card</div>`);
  AGENDA_HTML.set('spb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each different tag">
    <div class="resource money party-resource">1</div> / <div class="resource-tag tag-diverse party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('spb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each different resource type">
    <div class="resource money party-resource">1</div> / <div class="resource diverse"></div>
    </div>`);
  AGENDA_HTML.set('spp01',
    `<div class="policy-top-margin">
    <div class="tile venus-tile" style="transform: scale(0.8);"></div>: <div class="resource money">2</div>
    </div>
    <div class="bonus-text">When you raise Venus, gain 2 M€ per step raised</div>`);
  AGENDA_HTML.set('spp02',
    `<div class="policy-top-margin">
    <div class="resource money">10</div>
    <span class="red-arrow"></span>
    <div class="trade-fleet"></div>
    </div>
    <div class="bonus-text">Pay 10 M€ to gain a trade fleet</div>`);
  AGENDA_HTML.set('spp03',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div>ON MARS : -
    <span class="resource card card-with-border"></span></div>
    <div class="bonus-text">When you place a tile ON MARS, discard a card if possible</div>`);
  AGENDA_HTML.set('spp04',
    `<div class="policy-top-margin">
    <div class="resource money">10</div>
    <span class="red-arrow"></span>
    <div class="resource card card-with-border policy-card-with-tag"><div class="card-icon tag-planetary"></div></div>
    <div class="resource card card-with-border policy-card-with-tag"><div class="card-icon tag-planetary"></div></div>
    </div>
    <div class="bonus-text">Pay 10 M€ to draw 2 planetary cards</div>
    `);
  AGENDA_HTML.set('eb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 2 M€ for each Power tag">
    <div class="resource money party-resource">2</div> / <div class="resource-tag tag-power party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('eb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each Energy production">
    <div class="resource money party-resource">1</div> /
    <div class="production-box party-production-box">
        <div class="energy production"></div>
    </div>
    </div>`);
  AGENDA_HTML.set('ep01',
    `<span class="money resource">X</span>
    <span class="red-arrow"></span>
    <span class="energy resource">X</span>
    <div class="bonus-text">Spend X M€ to gain X energy</div>`);
  AGENDA_HTML.set('ep02',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="energy resource"></span></div>
    <div class="bonus-text">When you place a tile, gain 1 energy</div>`);
  AGENDA_HTML.set('ep03',
    `<div>
        +/- <div class="production-box">
            <div class="energy production"></div>
        </div> : 2 <span class="energy resource"></span>
    </div>
    <div class="bonus-text">When you gain or lose energy production, gain 2 energy</div>`);
  AGENDA_HTML.set('ep04',
    `<div class="policy-top-margin"><div class="resource-tag tag-power"></div> : <div class="money resource">-3</div></div>
    <div class="bonus-text">When you play a Power tag, you pay 3 M€ less for it</div>`);
  AGENDA_HTML.set('pb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Lose 1 M€ for every 5 M€ over 40">
    <div class="resource money party-resource">-1</div> / <div class="resource money party-resource">5</div> over 40
    </div>`);
  AGENDA_HTML.set('pb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Lose 2 M€ for every 8 cards in hand">
    <div class="resource money party-resource">-2</div> / 8 <div class="resource card card-with-border card-small"></div>
    </div>`);
  AGENDA_HTML.set('pp01',
    `<div class="policy-top-margin">
    <div class="plate" style="color:black;margin-top:10px;margin-bottom:10px">No Card Discounts</div>
    </div>
    <div class="bonus-text">No card discounts are applied this generation</div>`);
  AGENDA_HTML.set('pp02',
    `<div class="policy-top-margin">
    <div class="card-vp-questionmark">?</div> : <div class="resource money">-2</div>
    </div>
    <div class="bonus-text">When you play a card with NON-NEGATIVE VP, lose 2 M€ or as much as possible</div>`);
  AGENDA_HTML.set('pp03',
    `<div>
    <span class="red-arrow"></span>
    <div class="resource card card-with-border"></div>
    <div class="resource card card-with-border"></div> *
    </div>
    <div class="bonus-text">Draw 2 cards if your Terraform Rating was raised this generation</div>`);
  AGENDA_HTML.set('pp04',
    `<div class="policy-top-margin"><div class="tile empty-tile-small"></div> :
    <span class="money resource">3</span></div>
    <div class="bonus-text">When you place a tile, gain 3 M€</div>`);
  AGENDA_HTML.set('bb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each event played">
    <div class="resource money party-resource">1</div> /
    <div class="resource-tag tag-event party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('bb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Mark all card actions as used this generation">
    <div style="margin-top:-5px">
    Mark all <div class="resource card card-with-border"><div class="card-tag-blue"></div></div> actions
    </div>
    </div>`);
  AGENDA_HTML.set('bp01',
    `<div class="policy-top-margin">
    <span class="money resource">3</span>
    <span class="red-arrow-3x"></span>
    <div class="delegate"></div>
    </div>
    <div class="bonus-text">Pay 3 M€ to send a delegate from your reserve into any party</div>`);
  AGENDA_HTML.set('bp02',
    `<div class="policy-top-margin" style="margin-top:15px">
    <div class="trade"></div> : <div class="trade-discount">+1</div>
    </div>
    <div class="bonus-text" style="margin-top:10px">When you trade, you must pay 1 additional resource for it</div>`);
  AGENDA_HTML.set('bp03',
    `<div class="policy-top-margin">
    <span class="money resource">3</span>
    <span class="red-arrow-3x"></span>
    <div class="reserve-marker"></div>
    </div>
    <div class="bonus-text">Pay 3 M€ to place your player marker on a non-reserved area</div>`);
  AGENDA_HTML.set('bp04',
    `<div class="policy-top-margin"><div class="resource-tag tag-earth"></div> : <div class="money resource">-3</div></div>
    <div class="bonus-text">When you play an Earth tag, you pay 3 M€ less for it</div>`);
  AGENDA_HTML.set('tb01',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 M€ for each card with requirements played">
    <div class="resource money party-resource">1</div> / <div class="resource card card-small card-with-border"><div class="card-tag-req"></div></div>
    </div>`);
  AGENDA_HTML.set('tb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 2 M€ for each card with no tags played">
    <div class="resource money party-resource">1</div> / <div class="resource-tag tag-none party-resource-tag"></div>
    </div>`);
  AGENDA_HTML.set('tp01',
    `<div class="policy-top-margin"><div class="resource-tag tag-wild party-resource-tag"></div></div>
    <div class="bonus-text">Gain 1 wild tag for this generation</div>`);
  AGENDA_HTML.set('tp02',
    `<div class="policy-top-margin">
    <span class="money resource">10</span>
    <span class="red-arrow"></span>
    <div class="influence"></div>
    </div>
    <div class="bonus-text">Spend 10 M€ to gain 1 influence</div>`);
  AGENDA_HTML.set('tp03',
    `<div class="policy-top-margin">
    <span class="money resource">10</span>
    <span class="red-arrow-infinity"></span>
    <div class="resource card card-small card-with-border">
        <div class="card-tag-req"><div class="stretched-x">X</div></div>
    </div>
    </div>
    <div class="bonus-text">Spend 10 M€ to play a card from hand, ignoring global requirements</div>`);
  AGENDA_HTML.set('tp04',
    `<div class="policy-top-margin">
    <div class="trade"></div> : +1
    </div>
    <div class="bonus-text">When you trade, you may first increase that Colony Tile track 1 step</div>`);
  AGENDA_HTML.set('cb01', `
    <div class = "tooltip tooltip-bottom" data-tooltip="Gain 8 M€">
    <div class="resource money party-resource">8</div>
    </div>`);
  AGENDA_HTML.set('cb02',
    `<div class = "tooltip tooltip-bottom" data-tooltip="Gain 1 TR">
    1 <div class="rating tile party-rating party-tile"></div>
    </div>`);
  AGENDA_HTML.set('cp01',
    `<div class="policy-top-margin">
    <span class="red-arrow"></span>
    <span class="money resource">6</span>
    </div>
    <div class="bonus-text">Gain 6 M€</div>`);
  AGENDA_HTML.set('cp02',
    `<div class="policy-top-margin">
    <div class="delegate"></div> : <span class="money resource">+2</span>
    </div>
    <div class="bonus-text">Delegates cost 2 M€ more to place</div>`);
  AGENDA_HTML.set('cp03',
    `<div class="policy-top-margin">
    <span class="red-arrow"></span>
    <div class="trade"></div>
    </div>
    <div class="bonus-text" style="margin-top:10px">Trade with any colony tile for free</div>`);
  AGENDA_HTML.set('cp04',
    `<div class="policy-top-margin"><div class="resource-tag tag-event"></div> : <div class="money resource">-2</div></div>
    <div class="bonus-text">When you play an Event card, you pay 2 M€ less for it</div>`);
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
    getPolicy: function(party: PartyName | undefined, politicalAgendas: PoliticalAgendasModel | undefined, useCurrentAgenda: boolean = false, includeDescription: boolean = true) {
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
        let policy = AGENDA_HTML.get(policyId)!;
        if (includeDescription === false) policy = policy.split('<div class="bonus-text">')[0];
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
  components: {
    'global-event': GlobalEvent,
  },
  template: `
    <div class="turmoil" v-trim-whitespace>
      <div class="events-board">
          <global-event v-if="turmoil.distant" :globalEvent="turmoil.distant" type="distant"></global-event>
          <global-event v-if="turmoil.coming" :globalEvent="turmoil.coming" type="coming"></global-event>
          <global-event v-if="turmoil.current" :globalEvent="turmoil.current" type="current"></global-event>
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
          <div class="dominant-party-bonus" v-html="getPolicy(turmoil.ruling, turmoil.politicalAgendas, true, false)"></div>
          <div class="policy-user-cubes">
            <template v-for="n in turmoil.policyActionUsers">
              <div v-if="n.turmoilPolicyActionUsed" :class="'policy-use-marker board-cube--'+n.color"></div>
              <div v-if="n.politicalAgendasActionUsedCount > 0" :class="'policy-use-marker board-cube--'+n.color">{{n.politicalAgendasActionUsedCount}}</div>
            </template>
          </div>
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
