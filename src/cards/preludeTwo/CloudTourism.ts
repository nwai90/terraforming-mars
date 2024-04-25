import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {ResourceType} from '../../ResourceType';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Resources} from '../../Resources';

export class CloudTourism extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.CLOUD_TOURISM,
      tags: [Tags.JOVIAN, Tags.VENUS],
      cost: 11,
      resourceType: ResourceType.FLOATER,

      metadata: {
        cardNumber: '??',
        description: 'Increase your M€ production 1 step per set of Earth and Venus tags you have.',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 floater to this card.', (eb) => {
            eb.empty().startAction.floaters(1);
          });
          b.br;
          b.vpText('1 VP for every 3 floaters on this card.');
          b.br;
          b.production((pb) => {
            pb.megacredits(1).slash().earth().played.venus(1).played;
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.floaters(1, 3),
      },
    });
  }

  public resourceCount = 0;

  public play(player: Player) {
    const earthTagsInPlay = player.getTagCount(Tags.EARTH);
    const venusTagsInPlay = player.getTagCount(Tags.VENUS) + 1;
    player.addProduction(Resources.MEGACREDITS, Math.min(earthTagsInPlay, venusTagsInPlay), {log: true});

    return undefined;
  }

  public canAct() {
    return true;
  }

  public action(player: Player) {
    player.addResourceTo(this, {log: true});
    return undefined;
  }

  public getVictoryPoints(): number {
    return Math.floor(this.resourceCount / 3);
  }
}
