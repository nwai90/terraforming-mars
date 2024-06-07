import {Message} from '../Message';
import {CardType} from '../cards/CardType';
import {ResourceType} from '../ResourceType';
import {Units} from '../Units';
import {CardName} from '../CardName';
import {Resources} from '../Resources';
import {CardDiscount} from '../cards/ICard';

export interface CardModel {
    name: CardName;
    resources: number | undefined;
    resourceType: ResourceType | undefined;
    calculatedCost?: number;
    mustSpendAtMost?: number;
    discount?: CardDiscount | Array<CardDiscount>,
    cardType: CardType;
    isDisabled: boolean;
    warning?: string | Message;
    reserveUnits: Readonly<Units>;
    bonusResource?: Resources | undefined;
}
