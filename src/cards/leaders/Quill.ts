import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {AltSecondaryTag} from '../render/CardRenderItem';
import {ResourceType} from '../../ResourceType';

export class Quill extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.QUILL,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L17',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().cards(1).secondaryTag(AltSecondaryTag.FLOATER).colon().nbsp;
          b.plus().floaters(2).asterix();
        }),
        description: 'Once per game, add 2 floaters to each of your cards that collect floaters.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    const resourceCards = player.getResourceCards(ResourceType.FLOATER);
    resourceCards.forEach((card) => player.addResourceTo(card, {qty: 2, log: true}));
    this.isDisabled = true;
    return undefined;
  }
}
