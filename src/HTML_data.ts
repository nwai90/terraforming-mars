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
    [CardName.ERIS, `
      <div class="community-icon corporation-icon"></div>
      <div class="contentCorporation">
        <div class="corporationEffectBox">
          <div class="corporationEffectBoxLabel">ACTION</div>
          <div class="red-arrow"></div> +<div class="tile hazard"></div> / -<div class="tile hazard red-outline"></div>: <div class="tile rating"></div>
          <div class="description action">
            (Action: Place a new hazard tile adjacent to NO OTHER TILE, OR remove a hazard tile to gain 1 TR.)
          </div>
        </div>
      </div>

      <div class="eris">Eris</div>
      <div class="resource money">46</div>
      <div class="resource card">
        <div class="card-icon icon-ares"></div>
      </div>
      
      <div class="description start-text">
        (You start with 46 MC. As your first action, draw an Ares card.)
      </div>
`],
    [CardName.HYDROGEN_BOMBARDMENT,`
      <div class="content" style="margin-top:30px">
        <div class="production-box"><div class="production titanium"></div></div><br>
        <div class="tile venus-tile"></div>
        <div class="description">
            Increase your titanium production by 1 step. Raise Venus 1 step.
        </div>
      </div>
`],
    [CardName.VITAL_COLONY, `
      <div class="content" style="margin-top:30px">
      <div class="tile colony"></div>
      <div class="colony-placement"></div><br>
      <div class="resource money">-5</div>
        <div class="description">
          Place a colony. Gain its placement bonus a second time. Pay 5 MC.
        </div>
      </div>
`],
    [CardName.STRATEGIC_BASE_PLANNING, `
      <div class="content" style="margin-top:30px">
      <div class="tile colony"></div>
      <div class="tile city-tile"></div><br>
      - <div class="resource money">6</div>
        <div class="description">
          Place a colony. Place a city tile on Mars. Pay 6 MC.
        </div>
      </div>
`],
    [CardName.NITRATE_REDUCERS, `
      <div class="content" style="margin-top:30px">
        <div class="resource card"><div class="card-icon tag-microbe"></div></div>
        <div class="resource card"><div class="card-icon tag-microbe"></div></div>
        <br>
        <div class="production-box ">
            <div class="production money">3</div>
        </div>        
        <div class="description">
          Draw 2 microbe cards from the deck. Increase your MC production 3 steps.
        </div>
      </div>
`],
    [CardName.EXPERIENCED_MARTIANS, `
    <div class="content" style="margin-top:30px">
        <div class="delegate"></div>
        <div class="delegate"></div>
        <br>
        <div class="production-box production-box-size2">
            <div class="plant production"></div>
            <div class="heat production"></div>
        </div>
        <div class="description">
            Place 2 delegates in any one party. Increase your plant and heat production 1 step.
        </div>
    </div>
`],
    [CardName.TRADE_INFRASTRUCTURE, `
    <div class="content" style="margin-top:30px">
        <div class="production-box "><div class="energy production"></div></div>
        <br>
        <div class="energy resource"></div>
        <div class="energy resource"></div>
        <div class="energy resource"></div>
        <div class="tile fleet"></div>
        <div class="description">
            Increase your energy production 1 step. Gain 3 energy. Gain 1 trade fleet.
        </div>
    </div>
`],
    [CardName.GEOTHERMAL_VENT, `
    <div class="content" style="margin-top:30px">
        <div class="tile temperature-tile"></div>
        <div class="tile temperature-tile"></div>
        <br>
        <div class="production-box production-box-size2">
            <div class="heat production"></div>
            <div class="heat production"></div>
        </div>
        <div class="description">
            Raise temperature 2 steps. Increase your heat production 2 steps.
        </div>
    </div>
`],
    [CardName.ACCUMULATED_KNOWLEDGE, `
    <div class="content" style="margin-top:30px">
        <div class="resource card"></div>
        <div class="resource card"></div>
        <div class="resource card"></div>
        <div class="resource card"></div>
        <br>
        - <div class="resource card"></div> + <div class="resource card"></div>
        <div class="description">
            Draw 4 cards. You may discard a card to draw a card.
        </div>
    </div>
`],
    [CardName.BOTANICAL_HARVEST, `
    <div class="content" style="margin-top:30px">
        <div class="tile oxygen-tile"></div>
        <div class="production-box "><div class="plant production"></div></div>
        <br>
        <div class="resource plant"></div>
        <div class="resource plant"></div>
        <div class="resource plant"></div>
        <div class="resource plant"></div>
        <div class="resource plant"></div>
        <div class="description">
            Raise oxygen 1 step. Increase your plant production 1 step. Gain 5 plants.
        </div>
    </div>
`],
    [CardName.MARTIAN_LUMBER_YARD, `
    <div class="content" style="margin-top:30px">
        <div class="production-box production-box-size2">
            <div class="steel production"></div>
            <div class="plant production"></div>
        </div>
        <br>
        <div class="resource steel"></div>
        <div class="resource steel"></div>
        <div class="resource plant"></div>
        <div class="resource plant"></div>
        <div class="resource plant"></div>
        <div class="description">
            Increase your steel and plant production 1 step. Gain 2 steel and 3 plants.
        </div>
    </div>
`],
    [CardName.FORTIFIED_OUTPOST, `
    <div class="content" style="margin-top:30px">
        <div class="tile city-tile"></div>
        <div class="tile greenery-tile"></div>
        <br>
        - <div class="resource money">10</div>
        <div class="description">
            Place a city tile on Mars. Place a greenery tile. Pay 10 MC.
        </div>
    </div>
`],
  ]);
