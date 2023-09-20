import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {Tags} from '../Tags';
import {Size} from '../render/Size';

export class SolarLogistics extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.SOLAR_LOGISTICS,
      tags: [Tags.EARTH, Tags.SPACE],
      cost: 20,

      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.effect(undefined, (eb) => {
            eb.earth().played.startEffect.megacredits(-2);
          });
          b.br;
          b.effect('When you play an Earth tag, you pay 2 M€ less for it. When any player plays a Space event, you draw a card.', (eb) => {
            eb.space().played.any.nbsp(Size.SMALL).event().played.any.startEffect.cards(1);
          });
          b.br.br;
          b.titanium(2).text('(Gain 2 titanium.)', Size.DESCRIPTION, false, false);
        }),
        victoryPoints: 1,
      },
    });
  }

  public play(player: Player) {
    player.addResource(Resources.TITANIUM, 2);
    return undefined;
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    return card.tags.filter((tag) => tag === Tags.EARTH).length * 2;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    const owner = player.game.getCardPlayer(this.name);

    if (card.cardType === CardType.EVENT && card.tags.includes(Tags.SPACE)) {
      owner.drawCard(1);
    }
  }

  public getVictoryPoints(): number {
    return 1;
  }
}
