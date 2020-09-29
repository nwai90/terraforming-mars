import Vue from "vue";
import { TagCount } from "../TagCount";
import { ITagCount } from "../../ITagCount";
import { Tags } from "../../cards/Tags";
import { SpecialTags } from "../../cards/SpecialTags";

export const PlayerTags = Vue.component("player-tags", {
    props: ["player", "isActivePlayer"],
    components: {
        "tag-count": TagCount,
    },

    methods: {
        showColonyCount: function (): boolean {
            return this.player.coloniesExtension;
        },
        showInfluence: function (): boolean {
            return this.player.turmoil;
        },
        getCardCount: function (): number {
            if (this.player.cardsInHandNbr) {
                return this.player.cardsInHandNbr;
            }
            return 0;
        },
        getTR: function (): number {
            return this.player.terraformRating;
        },
        getVpCount: function (): number {
            return this.player.victoryPointsBreakdown.total;
        },
        hideVpCount: function (): boolean {
            return !this.player.showOtherPlayersVP && !this.isActivePlayer;
        },
        getTagCount(tagName: Tags | SpecialTags): number {
            if (tagName === SpecialTags.COLONY_COUNT && this.showColonyCount())
                return this.player.coloniesCount || 0;
            if (tagName === SpecialTags.INFLUENCE && this.showInfluence())
                return this.player.influence || 0;
            if (tagName === SpecialTags.CITY_COUNT)
                return this.player.citiesCount || 0;
            if (tagName === SpecialTags.NONE)
                return this.player.noTagsCount || 0;
            const basicTagFound = this.player.tags.find(
                (tag: ITagCount) => tag.tag === tagName
            );

            if (basicTagFound !== undefined) {
                return basicTagFound.count;
            }

            return 0;
        },
    },
    template: `
        <div class="player-tags">
            <div class="player-tags-main">
                <tag-count :tag="'vp'" :count="getVpCount()" :size="'big'" :type="'main'" :hideCount="hideVpCount()" />
                <tag-count :tag="'tr'" :count="getTR()" :size="'big'" :type="'main'"/>
                <tag-count :tag="'cards'" :count="getCardCount()" :size="'big'" :type="'main'"/>
            </div>
            <div class="player-tags-secondary">
                <tag-count v-for="tag in player.tags" :tag="tag.tag" :count="tag.count" :size="'big'" :type="'secondary'"/>
            </div>
        </div>
    `,
});
