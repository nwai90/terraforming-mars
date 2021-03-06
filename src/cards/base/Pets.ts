import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ISpace} from '../../boards/ISpace';
import {ResourceType} from '../../ResourceType';
import {CardName} from '../../CardName';
import {DeferredAction, Priority} from '../../deferredActions/DeferredAction';
import {IResourceCard} from '../ICard';
import {Board} from '../../boards/Board';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Size} from '../render/Size';

export class Pets extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.PETS,
      tags: [Tags.EARTH, Tags.ANIMAL],
      cost: 10,
      resourceType: ResourceType.ANIMAL,

      metadata: {
        cardNumber: '172',
        renderData: CardRenderer.builder((b) => {
          b.effect('When any City tile is placed, add an Animal to this card.', (eb) => {
            eb.city(Size.SMALL).any.startEffect.animals(1);
          }).br;
          b.animals(1).br;
          b.text('Animals may not be removed from this card', Size.SMALL, true).br;
          b.vpText('1 VP per 2 Animals here.');
        }),
        description: {text: 'Add 1 Animal to this card.', align: 'left'},
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 2),
      },
    });
  }

  public resourceCount: number = 0;

  public getVictoryPoints(): number {
    return Math.floor(this.resourceCount / 2);
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (Board.isCitySpace(space)) {
      cardOwner.game.defer(
        new DeferredAction(cardOwner, () => {
          cardOwner.addResourceTo(this, {log: true});
          return undefined;
        }),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
      );
    }
  }

  public play(player: Player) {
    player.addResourceTo(this, {log: true});
    return undefined;
  }
}
