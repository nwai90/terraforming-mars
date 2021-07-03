import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Resources} from '../../Resources';

export class Ulrich extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.ULRICH,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L21',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().oceans(1).colon().megacredits(3).slash().megacredits(9).asterix();
        }),
        description: 'Once per game, gain 3 M€ for each ocean placed. If all oceans are aleady placed, gain only 9 M€.',
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
    const game = player.game;

    if (game.noOceansAvailable()) {
      player.addResource(Resources.MEGACREDITS, 9);
    } else {
      const oceansPlaced = game.board.getOceansOnBoard();
      player.addResource(Resources.MEGACREDITS, oceansPlaced * 3);
    }

    this.isDisabled = true;
    return undefined;
  }
}
