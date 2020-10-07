import Vue from "vue";
import { Card } from "./Card";
import { ALL_PRELUDE_PROJECTS_CARDS, ALL_VENUS_PROJECTS_CARDS, ALL_COLONIES_PROJECTS_CARDS, ALL_TURMOIL_PROJECTS_CARDS, ALL_PROMO_PROJECTS_CARDS, ALL_PROJECT_CARDS, ALL_CORP_ERA_PROJECT_CARDS, ALL_CORPORATION_CARDS, ALL_CORP_ERA_CORPORATION_CARDS, ALL_VENUS_CORPORATIONS, ALL_PRELUDE_CORPORATIONS, ALL_COLONIES_CORPORATIONS, ALL_TURMOIL_CORPORATIONS, ALL_PROMO_CORPORATIONS, ALL_COMMUNITY_CORPORATIONS, ALL_PRELUDE_CARDS, ALL_COMMUNITY_PRELUDE_CARDS, ALL_COMMUNITY_VENUS_PRELUDE_CARDS, ALL_COMMUNITY_COLONY_PRELUDE_CARDS, ALL_COMMUNITY_TURMOIL_PRELUDE_CARDS } from '../Dealer';
import { CardName } from "../CardName";

export const DebugUI = Vue.component("debug-ui", {
    components: {
        Card,
    },
    methods: {
        getAllCards: function () {
            const allItems: Array<CardName> = [
                ...ALL_PRELUDE_PROJECTS_CARDS.map((cf) => cf.cardName),
                ...ALL_VENUS_PROJECTS_CARDS.map((cf) => cf.cardName),
                ...ALL_COLONIES_PROJECTS_CARDS.map((cf) => cf.cardName),
                ...ALL_TURMOIL_PROJECTS_CARDS.map((cf) => cf.cardName),
                ...ALL_PROMO_PROJECTS_CARDS.map((cf) => cf.cardName),
                ...ALL_PROJECT_CARDS.map((cf) => cf.cardName),
                ...ALL_CORP_ERA_PROJECT_CARDS.map((cf) => cf.cardName),
                ...ALL_CORPORATION_CARDS.map((cf) => cf.cardName),
                ...ALL_CORP_ERA_CORPORATION_CARDS.map((cf) => cf.cardName),
                ...ALL_VENUS_CORPORATIONS.map((cf) => cf.cardName),
                ...ALL_PRELUDE_CORPORATIONS.map((cf) => cf.cardName),
                ...ALL_COLONIES_CORPORATIONS.map((cf) => cf.cardName),
                ...ALL_TURMOIL_CORPORATIONS.map((cf) => cf.cardName),
                ...ALL_PROMO_CORPORATIONS.map((cf) => cf.cardName),
                ...ALL_COMMUNITY_CORPORATIONS.map((cf) => cf.cardName),
                ...ALL_PRELUDE_CARDS.map((cf) => cf.cardName),
                ...ALL_COMMUNITY_PRELUDE_CARDS.map((cf) => cf.cardName),
                ...ALL_COMMUNITY_VENUS_PRELUDE_CARDS.map((cf) => cf.cardName),
                ...ALL_COMMUNITY_COLONY_PRELUDE_CARDS.map((cf) => cf.cardName),
                ...ALL_COMMUNITY_TURMOIL_PRELUDE_CARDS.map((cf) => cf.cardName),
            ].sort();
            return allItems;
        }
    },
    template: `
        <div class="debug-ui-container">
            <section class="debug-ui-cards-list">
                <h2>Cards list</h2>
                <div style="display: inline-block; vertical-align: top;" v-for="card in getAllCards()">
                    <Card :card="{'name': card}" />
                </div>
            </section>
        </div>
    `
})