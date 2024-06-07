import {ICardMetadata} from './ICardMetadata';
import {CardName} from '../CardName';
import {CardType} from './CardType';
import {IAdjacencyBonus} from '../ares/IAdjacencyBonus';
import {ResourceType} from '../ResourceType';
import {Tags} from './Tags';
import {Player} from '../Player';
import {Units} from '../Units';
import {CardRequirements} from './CardRequirements';
import {CardDiscount, ICard, TRSource} from './ICard';
import {REDS_RULING_POLICY_COST, SOCIETY_ADDITIONAL_CARD_COST} from '../constants';
import {Resources} from '../Resources';
import {IProjectCard} from './IProjectCard';
import {PartyName} from '../turmoil/parties/PartyName';

export interface StaticCardProperties {
  adjacencyBonus?: IAdjacencyBonus;
  cardCost?: number;
  cardType: CardType;
  cost?: number;
  initialActionText?: string;
  metadata: ICardMetadata;
  requirements?: CardRequirements;
  name: CardName;
  resourceType?: ResourceType;
  startingMegaCredits?: number;
  tags?: Array<Tags>;
  productionBox?: Units;
  cardDiscount?: CardDiscount | Array<CardDiscount>;
  reserveUnits?: Units,
  tr?: TRSource,
}

export const staticCardProperties = new Map<CardName, StaticCardProperties>();

export abstract class Card {
  private readonly properties: StaticCardProperties;
  constructor(properties: StaticCardProperties) {
    let staticInstance = staticCardProperties.get(properties.name);
    if (staticInstance === undefined) {
      if (properties.cardType === CardType.CORPORATION && properties.startingMegaCredits === undefined) {
        throw new Error('must define startingMegaCredits for corporation cards');
      }
      if (properties.cost === undefined) {
        if ([CardType.CORPORATION, CardType.PRELUDE, CardType.STANDARD_ACTION, CardType.LEADER].includes(properties.cardType) === false) {
          throw new Error(`${properties.name} must have a cost property`);
        }
      }
      staticCardProperties.set(properties.name, properties);
      staticInstance = properties;
    }
    this.properties = staticInstance;
  }
  public get adjacencyBonus() {
    return this.properties.adjacencyBonus;
  }
  public get cardCost() {
    return this.properties.cardCost;
  }
  public get cardType() {
    return this.properties.cardType;
  }
  public get cost() {
    return this.properties.cost === undefined ? 0 : this.properties.cost;
  }
  public get initialActionText() {
    return this.properties.initialActionText;
  }
  public set initialActionText(value: string | undefined) {
    this.properties.initialActionText = value;
  }
  public get metadata() {
    return this.properties.metadata;
  }
  public get requirements() {
    return this.properties.requirements;
  }
  public get name() {
    return this.properties.name;
  }
  public get resourceType() {
    return this.properties.resourceType;
  }
  public get startingMegaCredits() {
    return this.properties.startingMegaCredits === undefined ? 0 : this.properties.startingMegaCredits;
  }
  public get tags() {
    return this.properties.tags === undefined ? [] : this.properties.tags;
  }
  public get productionBox(): Units {
    return this.properties.productionBox || Units.EMPTY;
  }
  public get cardDiscount() {
    return this.properties.cardDiscount;
  }
  public get reserveUnits(): Units {
    return this.properties.reserveUnits || Units.EMPTY;
  }
  public set reserveUnits(value: Units) {
    this.properties.reserveUnits = value;
  };
  public get tr(): TRSource {
    return this.properties.tr || {};
  }
  public canPlay(player: Player) {
    if (this.properties.requirements === undefined) {
      return true;
    }
    return this.properties.requirements.satisfies(player);
  }

  public static setRedsWarningText(player: Player, trGain: number, card: ICard, upto: boolean = false, actionText: string = 'play this card'): void {
    if (trGain > 0 && player.cardIsInEffect(CardName.ZAN) === false) {
      const redsCost = trGain * REDS_RULING_POLICY_COST;

      if (upto === true) {
        card.warning = `You will lose up to an additional ${redsCost} M€ if you ${actionText} this generation.`;
      } else {
        card.warning = `You will lose an additional ${redsCost} M€ if you ${actionText} this generation.`;
      }
    } else {
      card.warning = undefined;
    }
  }

  public static setRedsActionWarningText(player: Player, trGain: number, card: ICard, redsAreRuling: boolean, actionText: string = 'take this action', uncertain: boolean = false): void {
    if (trGain > 0 && redsAreRuling && player.cardIsInEffect(CardName.ZAN) === false) {
      const redsCost = trGain * REDS_RULING_POLICY_COST;
      const modifier = uncertain ? 'may lose some extra' : `will lose an additional ${redsCost}`;
      card.warning = `You ${modifier} M€ if you ${actionText} this generation.`;
    } else {
      card.warning = undefined;
    }
  }

  public static setUselessActionWarningText(card: ICard, reason: string): void {
    card.warning = `This action may have no benefit as ${reason}.`;
  }

  public static setSocietyWarningText(card: ICard, partyName: PartyName): void {
    if (card.warning === undefined) {
      card.warning = `This card will cost an extra ${SOCIETY_ADDITIONAL_CARD_COST} M€ as ${partyName} party is not in play.`;
    } else {
      // The starting space is intentional, in case this warning comes with Reds warning (for Wildlife Dome and PR Office)
      card.warning += ` This card will cost an extra ${SOCIETY_ADDITIONAL_CARD_COST} M€ as ${partyName} party is not in play.`;
    }
  }

  public static setProductionDecreaseWarningText(card: ICard, resource: Resources, canTargetOthers: boolean): void {
    if (canTargetOthers === false) {
      card.warning = `You will have to decrease your own ${resource} production if you play this card now.`;
    } else {
      card.warning = undefined;
    }
  }

  public static setCannotAffordWarningText(card: ICard, player: Player, qty: number = 1): void {
    if (!player.canAfford(player.cardCost * qty)) {
      card.warning = `You will not be able to buy ${qty} card(s) if you take this action now.`;
    } else {
      card.warning = undefined;
    }
  }

  public static setUnplayablePreludeWarningText(card: IProjectCard, player: Player): void {
    if ((card.canPlay === undefined || card.canPlay(player)) === false) {
      card.warning = "This prelude will be discarded for 15 M€ if you play it now.";
    } else {
      card.warning = undefined;
    }
  }
}
