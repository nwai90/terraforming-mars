import { Colony } from "../../../colonies/Colony";
import { ColonyName } from "../../../colonies/ColonyName";
import { ColonyBenefit } from "../../../colonies/ColonyBenefit";

export class Terra extends Colony {
    public name = ColonyName.TERRA;
    public description = 'World Government';
    public buildType = ColonyBenefit.DRAW_EARTH_CARD;
    public tradeType = ColonyBenefit.WGT_RAISE_GLOBAL_PARAMETER;
    public tradeQuantity = [0, 0, 0, 1, 1, 2, 2];
    public colonyBonusType = ColonyBenefit.GAIN_MC_FOR_EARTH_TAGS;
}
