import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {PlayerInput} from '../../PlayerInput';
import {ICardMetadata} from '../ICardMetadata';
import {CardName} from '../../CardName';
import {Tags} from '../Tags';
import {IProjectCard} from '../IProjectCard';
import {Units} from '../../Units';
import {ResourceType} from '../../ResourceType';
import {CardDiscount} from '../ICard';

interface StaticPreludeProperties {
    metadata: ICardMetadata;
    name: CardName;
    tags?: Array<Tags>;
    productionBox?: Units;
    resourceType?: ResourceType;
    cardDiscount?: Array<CardDiscount> | CardDiscount;
}

export abstract class PreludeCard extends Card implements IProjectCard {
  constructor(properties: StaticPreludeProperties) {
    super({
      cardType: CardType.PRELUDE,
      name: properties.name,
      tags: properties.tags,
      metadata: properties.metadata,
      productionBox: properties.productionBox,
      resourceType: properties.resourceType,
      cardDiscount: properties.cardDiscount,
    });
  }
  public abstract play(player: Player): PlayerInput | undefined;

  public canPlay(_player: Player): boolean {
    return true;
  }
}
