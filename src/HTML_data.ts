import {CardName} from './CardName';

/* eslint-disable no-irregular-whitespace */
export const HTML_DATA: Map<string, string> =
  new Map([
    [CardName.COLONIAL_ONE,`
      <div class="community-icon corporation-icon"></div>

      <div class="contentCorporation">
        <div class="corporationEffectBox hover-hide-res">
            <div class="corporationEffectBoxLabel">ACTION</div>
            <div class="red-arrow"></div> +/- <div class="tile colony"></div> TRACK

            <div class="action2">
                OR <div class="resource fighter"></div>
                <div class="red-arrow"></div>
                <div class="tile trade"></div>
            </div>

            <div class="description effect">
                (Action: Increase or decrease any colony tile track 1 step, or spend 1 fighter resource on this card to trade for free.)
            </div>
        </div>
      </div>

      <div class="colonial-one">Colonial One</div>
      <div class="start-resources">
        <div class="resource money">35</div>
        <div class="tile fleet"></div>
        <div class="resource fighter"></div>
        <div class="resource fighter"></div>
        <div class="resource fighter"></div>
      </div>

      <div class="description">
        (You start with 35 MC and 1 extra trade fleet.<br>Add 3 fighter resources to this card.)
      </div>
`],
  ]);
