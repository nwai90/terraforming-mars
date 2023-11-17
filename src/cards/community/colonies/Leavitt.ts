import {Colony} from '../../../colonies/Colony';
import {ColonyName} from '../../../colonies/ColonyName';
import {ColonyBenefit} from '../../../colonies/ColonyBenefit';

export class Leavitt extends Colony {
    public name = ColonyName.LEAVITT;
    public description = 'Science';
    public buildType = ColonyBenefit.GAIN_SCIENCE_TAG;
    public tradeType = ColonyBenefit.DRAW_CARDS_AND_KEEP_ONE;
    public tradeQuantity = [1, 2, 3, 4, 5, 6, 7];
    public colonyBonusType = ColonyBenefit.DRAW_CARDS_AND_BUY_ONE;
    // For Productive Outpost, collect payment only after other bonuses have been collected
    public priority = 2;
    public details = [
      'Gain 1 Science tag',
      'Draw n cards and keep 1',
      'Reveal and buy or discard\nthe top card of the deck',
    ];
}
