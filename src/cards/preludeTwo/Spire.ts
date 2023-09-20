import {Player} from '../../Player';
import {CorporationCard} from '../corporation/CorporationCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {IProjectCard} from '../IProjectCard';
import {Size} from '../render/Size';
import {Tags} from '../Tags';
import {DiscardCards} from '../../deferredActions/DiscardCards';
import {ResourceType} from '../../ResourceType';

export class Spire extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.SPIRE,
      tags: [Tags.CITY, Tags.EARTH],
      startingMegaCredits: 44,
      resourceType: ResourceType.SCIENCE,
      initialActionText: 'Draw 4 cards, then discard 3 cards',

      metadata: {
        cardNumber: '??',
        description: 'You start with 44 M€. As your first action, draw 4 cards, then discard 3 cards.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(44).nbsp(Size.SMALL).plus().cards(4).digit.minus().cards(3).digit;
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.diverseTag(2).asterix().startEffect.science(1);
            });
            ce.vSpace(Size.SMALL);
            ce.effect('When you play a card with at least 2 tags, including this, add 1 science resource here. Science resources here may be used as 2 M€ each for standard projects.', (eb) => {
              eb.plate('Standard projects', Size.SMALL).startEffect.science(1).equals().megacredits(2);
            });
          });
        }),
      },
    });
  }

  public resourceCount = 0;

  public play(player: Player) {
    this.onCorpCardPlayed(player, this);
    return undefined;
  }

  public initialAction(player: Player) {
    player.drawCard(4);
    player.game.defer(new DiscardCards(player, 3));
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    return this._onCardPlayed(player, card);
  }

  public onCorpCardPlayed(player: Player, card: CorporationCard) {
    return this._onCardPlayed(player, card);
  }

  public _onCardPlayed(player: Player, card: IProjectCard | CorporationCard) {
    if (!player.isCorporation(this.name)) return undefined;

    const count = card.tags.length + (card.cardType === CardType.EVENT ? 1 : 0);

    if (count >= 2) {
      player.addResourceTo(this, {log: true});
    }

    return undefined;
  }
}
