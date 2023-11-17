import {Colony} from '../../../colonies/Colony';
import {ColonyName} from '../../../colonies/ColonyName';
import {ColonyBenefit} from '../../../colonies/ColonyBenefit';
import {ResourceType} from '../../../ResourceType';
import {Resources} from '../../../Resources';

export class Kuiper extends Colony {
    public name = ColonyName.KUIPER;
    public isActive = false;
    public description = 'Asteroids';
    public resourceType = ResourceType.ASTEROID;
    public buildType = ColonyBenefit.ADD_RESOURCES_TO_CARD;
    public buildQuantity = [2, 2, 2];
    public tradeType = ColonyBenefit.ADD_RESOURCES_TO_CARD;
    public tradeQuantity = [0, 1, 1, 2, 2, 3, 3];
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusResource = Resources.MEGACREDITS;
    public colonyBonusQuantity = 3;
    public details = [
      'Add 2 asteroids to ANY card',
      'Add n asteroids to ANY card',
      'Gain 3 M€',
    ];
}
