import Vue from 'vue';
import {TagCount} from '../TagCount';
import {ITagCount} from '../../ITagCount';
import {PlayerModel} from '../../models/PlayerModel';
import {Tags} from '../../cards/Tags';
import {SpecialTags} from '../../cards/SpecialTags';
import {isTagsViewConcise} from './OverviewSettings';
import {PlayerTagDiscount} from './PlayerTagDiscount';
import {PartyName} from '../../turmoil/parties/PartyName';
import {TurmoilPolicy} from '../../turmoil/TurmoilPolicy';
import {ColonyName} from '../../colonies/ColonyName';
import {CardModel} from '../../models/CardModel';
import {PreferencesManager} from '../PreferencesManager';

type InterfaceTagsType = Tags | SpecialTags | 'all' | 'separator';

const hasDiscount = (tag: InterfaceTagsType, card: CardModel): boolean => {
  if (tag === SpecialTags.COLONY_COUNT || tag === SpecialTags.CITY_COUNT) return false;
  if (card.discount === undefined) {
    return false;
  }
  if (tag === 'all') {
    return card.discount.tag === undefined;
  }
  return card.discount.tag === tag;
};

const getDiscountAmount = (tag: InterfaceTagsType, card: CardModel): number => {
  if (hasDiscount(tag, card)) {
    return card?.discount?.amount || 0;
  }
  return 0;
};

export const PLAYER_INTERFACE_TAGS_ORDER: Array<InterfaceTagsType> = [
  Tags.BUILDING,
  Tags.SPACE,
  Tags.SCIENCE,
  Tags.ENERGY,
  Tags.EARTH,
  Tags.JOVIAN,
  Tags.VENUS,
  Tags.PLANT,
  Tags.MICROBE,
  Tags.ANIMAL,
  Tags.CITY,
  Tags.MOON,
  'separator',
  Tags.EVENT,
  SpecialTags.NONE,
  Tags.WILDCARD,
  SpecialTags.INFLUENCE,
  SpecialTags.CITY_COUNT,
  SpecialTags.COLONY_COUNT,
];

export const checkTagUsed = (tag: InterfaceTagsType, player: PlayerModel) => {
  if (player.gameOptions.coloniesExtension === false && tag === SpecialTags.COLONY_COUNT) {
    return false;
  }
  if (player.turmoil === undefined && tag === SpecialTags.INFLUENCE) {
    return false;
  }
  if (player.gameOptions.venusNextExtension === false && tag === Tags.VENUS) {
    return false;
  }
  if (player.gameOptions.moonExpansion === false && tag === Tags.MOON) {
    return false;
  }
  return true;
};

export const PlayerTags = Vue.component('player-tags', {
  props: {
    player: {
      type: Object as () => PlayerModel,
    },
    isActivePlayer: {
      type: Boolean,
    },
    hideZeroTags: {
      type: Boolean,
    },
  },
  components: {
    'tag-count': TagCount,
    PlayerTagDiscount,
  },
  methods: {
    showColonyCount: function(): boolean {
      return this.player.gameOptions.coloniesExtension;
    },
    showInfluence: function(): boolean {
      return this.player.turmoil !== undefined;
    },
    showVenus: function(): boolean {
      return this.player.gameOptions.venusNextExtension;
    },
    showMoon: function(): boolean {
      return this.player.gameOptions.moonExpansion;
    },
    getTagsPlaceholders: function(): Array<InterfaceTagsType> {
      const tags = PLAYER_INTERFACE_TAGS_ORDER;
      return tags.filter((tag) => {
        return checkTagUsed(tag, this.player);
      });
    },
    getCardCount: function(): number {
      if (this.player.cardsInHandNbr) {
        return this.player.cardsInHandNbr;
      }
      return 0;
    },
    getTR: function(): number {
      return this.player.terraformRating;
    },
    getVpCount: function(): number {
      return this.player.victoryPointsBreakdown.total;
    },
    showShortTags: function(): boolean {
      if (this.hideZeroTags === true) return true;
      return isTagsViewConcise(this.$root);
    },
    hasTagDiscount: function(tag: InterfaceTagsType): boolean {
      for (const card of [...this.player.playedCards, this.player.corporationCard]) {
        if (card !== undefined) {
          if (hasDiscount(tag, card)) {
            return true;
          }
        }
      }

      const turmoil = this.player.turmoil;
      if (tag === Tags.SPACE &&
        turmoil && turmoil.ruling === PartyName.UNITY &&
        turmoil.politicalAgendas?.currentAgenda.policyId === TurmoilPolicy.UNITY_POLICY_4) {
        return true;
      }
      if (tag === Tags.ENERGY &&
        turmoil && turmoil.ruling === PartyName.EMPOWER &&
        turmoil.politicalAgendas?.currentAgenda.policyId === TurmoilPolicy.EMPOWER_POLICY_4) {
        return true;
      }
      if (tag === Tags.EVENT &&
        turmoil && turmoil.ruling === PartyName.CENTRISTS &&
        turmoil.politicalAgendas?.currentAgenda.policyId === TurmoilPolicy.CENTRISTS_POLICY_4) {
        return true;
      }
      if (tag === Tags.EARTH &&
        turmoil && turmoil.ruling === PartyName.BUREAUCRATS &&
        turmoil.politicalAgendas?.currentAgenda.policyId === TurmoilPolicy.BUREAUCRATS_POLICY_4) {
        return true;
      }

      const iapetusColony = this.player.colonies.find((colony) => colony.name === ColonyName.IAPETUS);
      if (tag === 'all' &&
        iapetusColony !== undefined &&
        iapetusColony.visitor !== undefined &&
        iapetusColony.colonies.includes(this.player.color)) {
        return true;
      }

      return false;
    },
    getTagDiscountAmount: function(tag: InterfaceTagsType): number {
      let discount = 0;
      for (const card of [...this.player.playedCards, this.player.corporationCard]) {
        if (card !== undefined) {
          discount += getDiscountAmount(tag, card);
        }
      }

      if (tag === Tags.SPACE && this.player.turmoil?.ruling === PartyName.UNITY) {
        if (this.player.turmoil.politicalAgendas?.currentAgenda.policyId === TurmoilPolicy.UNITY_POLICY_4) discount += 2;
      }

      if (tag === Tags.ENERGY && this.player.turmoil?.ruling === PartyName.EMPOWER) {
        if (this.player.turmoil.politicalAgendas?.currentAgenda.policyId === TurmoilPolicy.EMPOWER_POLICY_4) discount += 3;
      }

      if (tag === Tags.EVENT && this.player.turmoil?.ruling === PartyName.CENTRISTS) {
        if (this.player.turmoil.politicalAgendas?.currentAgenda.policyId === TurmoilPolicy.CENTRISTS_POLICY_4) discount += 2;
      }

      if (tag === Tags.EARTH && this.player.turmoil?.ruling === PartyName.BUREAUCRATS) {
        if (this.player.turmoil.politicalAgendas?.currentAgenda.policyId === TurmoilPolicy.BUREAUCRATS_POLICY_4) discount += 3;
      }

      const iapetusColony = this.player.colonies.find((colony) => colony.name === ColonyName.IAPETUS);
      if (tag === 'all' && iapetusColony !== undefined && iapetusColony.visitor !== undefined) {
        discount += iapetusColony.colonies.filter((owner) => owner === this.player.color).length;
      }

      return discount;
    },
    getTagCount: function(tagName: InterfaceTagsType): number {
      if (tagName === SpecialTags.COLONY_COUNT && this.showColonyCount()) {
        return this.player.coloniesCount || 0;
      }
      if (tagName === SpecialTags.INFLUENCE && this.showInfluence()) {
        return this.player.influence || 0;
      }
      if (tagName === SpecialTags.CITY_COUNT) {
        return this.player.citiesCount || 0;
      }
      if (tagName === SpecialTags.NONE) {
        return this.player.noTagsCount || 0;
      }
      const basicTagFound = this.player.tags.find(
        (tag: ITagCount) => tag.tag === tagName,
      );

      if (basicTagFound !== undefined) {
        return basicTagFound.count;
      }

      return 0;
    },
    getAvailableBlueActionCount: function(): number {
      return this.player.availableBlueCardActionCount;
    },
    isLearnerModeOff: function(): boolean {
      return PreferencesManager.loadBooleanValue('learner_mode') === false;
    },
  },
  template: `
        <div class="player-tags">
            <div class="player-tags-main">
                <tag-count :tag="'vp'" :count="getVpCount()" :size="'big'" :type="'main'" />
                <tag-count :tag="'tr'" :count="getTR()" :size="'big'" :type="'main'"/>

                <div v-if="isLearnerModeOff()" class="tag-display tooltip tooltip-top" data-tooltip="The number of available active card actions">
                    <div class="tag-count tag-action-card">
                    <div class="blue-stripe"></div>
                    <div class="red-arrow"></div>
                    </div>
                    <span class="tag-count-display">{{ getAvailableBlueActionCount() }}</span>
                </div>

                <div class="tag-and-discount">
                  <PlayerTagDiscount v-if="hasTagDiscount('all')" :amount="getTagDiscountAmount('all')" :color="player.color" />
                  <tag-count :tag="'cards'" :count="getCardCount()" :size="'big'" :type="'main'"/>
                </div>
            </div>
            <div class="player-tags-secondary">
                <template v-if="showShortTags()">
                  <div class="tag-count-container" v-for="tag in player.tags">
                    <div class="tag-and-discount" :key="tag.tag">
                      <PlayerTagDiscount v-if="hasTagDiscount(tag.tag)" :amount="getTagDiscountAmount(tag.tag)" :color="player.color" />
                      <tag-count :tag="tag.tag" :count="tag.count" :size="'big'" :type="'secondary'"/>
                    </div>
                  </div>
                </template>
                <template v-else>
                    <div class="tag-count-container" v-for="tagName in getTagsPlaceholders()" :key="tagName">
                      <div class="tag-and-discount" v-if="tagName !== 'separator'">
                        <PlayerTagDiscount v-if="hasTagDiscount(tagName)" :color="player.color" :amount="getTagDiscountAmount(tagName)"/>
                        <tag-count :tag="tagName" :count="getTagCount(tagName)" :size="'big'" :type="'secondary'"/>
                      </div>
                      <div v-else class="tag-separator"></div>
                    </div>
                </template>
            </div>
        </div>
    `,
});
