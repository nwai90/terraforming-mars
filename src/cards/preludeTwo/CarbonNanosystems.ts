import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {ResourceType} from '../../ResourceType';
import {Size} from '../render/Size';

export class CarbonNanosystems extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.CARBON_NANOSYSTEMS,
      tags: [Tags.SCIENCE, Tags.BUILDING],
      cost: 14,
      resourceType: ResourceType.GRAPHENE,

      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.effect(undefined, (eb) => {
            eb.science(1).played.startEffect.graphene(1);
          });
          b.br.br;
          b.effect('When you play a Science tag, including this, add a graphene resource here. When playing a Space or City tag, graphenes may be used as 4 M€ each.', (eb) => {
            eb.space().played.slash().cityTag().played.startEffect.graphene(1).nbsp(Size.TINY).equals().megacredits(4);
          });
        }),
        victoryPoints: 1,
      },
    });
  }

  public resourceCount = 0;

  public play() {
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard): void {
    const qty = card.tags.filter((tag) => tag === Tags.SCIENCE).length;
    player.addResourceTo(this, {qty: qty, log: true});
  }

  public getVictoryPoints() {
    return 1;
  }
}
