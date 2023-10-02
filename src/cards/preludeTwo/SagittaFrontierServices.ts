import {Player} from '../../Player';
import {CorporationCard} from '../corporation/CorporationCard';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {IProjectCard} from '../IProjectCard';
import {AltSecondaryTag} from '../render/CardRenderItem';
import {Size} from '../render/Size';
import {DeferredAction, Priority} from '../../deferredActions/DeferredAction';

export class SagittaFrontierServices extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.SAGITTA_FRONTIER_SERVICES,
      startingMegaCredits: 28,

      metadata: {
        cardNumber: '??',
        description: 'You start with 28 M€. Increase your energy production 1 step and M€ production 2 steps. Draw a card with no tags.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(28).production((pb) => pb.energy(1).megacredits(2));
          b.cards(1).secondaryTag(AltSecondaryTag.NONE);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.emptyTag(1, Size.SMALL).startEffect.megacredits(4);
            });
            ce.vSpace(Size.SMALL);
            ce.effect('When you play cards with no tags, including this, gain 4 M€. When you play cards with EXACTLY 1 TAG, gain 1 M€.', (eb) => {
              eb.blankTag(1, Size.SMALL).played.asterix().startEffect.megacredits(1);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    player.addProduction(Resources.MEGACREDITS, 2);
    this.onCorpCardPlayed(player, this);

    player.drawCard(1, {include: (card) => card.tags.length === 0 && card.cardType !== CardType.EVENT});

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

    const game = player.game;
    const count = card.tags.length + (card.cardType === CardType.EVENT ? 1 : 0);

    if (count === 0) {
      game.defer(new DeferredAction(player,() => {
        player.addResource(Resources.MEGACREDITS, 4);
        game.log('${0} gained 4 M€ for playing a card with no tags.', (b) => b.player(player));
        return undefined;
      }), Priority.GAIN_RESOURCE_OR_PRODUCTION);
    } else if (count === 1) {
      game.defer(new DeferredAction(player,() => {
        player.addResource(Resources.MEGACREDITS, 1);
        game.log('${0} gained 1 M€ for playing a card with exactly 1 tag.', (b) => b.player(player));
        return undefined;
      }), Priority.GAIN_RESOURCE_OR_PRODUCTION);
    }

    return undefined;
  }
}
