import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';
import {Tags} from '../../Tags';

export class AlliedResearch extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.ALLIED_RESEARCH,
        tags: [Tags.EARTH, Tags.SCIENCE],
        metadata: {
          cardNumber: 'Y44',
          renderData: CardRenderer.builder((b) => {
            b.preludeBox('action', (ce) => {
              ce.vSpace(Size.LARGE);
              ce.vSpace();
              ce.action('Discard your hand, then draw 5 cards.', (eb) => {
                eb.minus().text('ALL').cards(1).startAction.cards(5).digit;
              });
              ce.vSpace(Size.LARGE);
            });
          }),
        },
      });
    }

    public play() {
      return undefined;
    }

    public canAct() {
      return true;
    }

    public action(player: Player) {
      player.cardsInHand.forEach((card, index) => {
        player.cardsInHand.splice(index, 1);
        player.game.dealer.discard(card);
      });

      player.drawCard(5);

      return undefined;
    }
}

