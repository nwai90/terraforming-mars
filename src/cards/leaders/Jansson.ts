import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Multiset} from '../../utils/Multiset';

export class Jansson extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.JANSSON,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L10',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().emptyTile().wild(1).asterix();
        }),
        description: 'Once per game, gain all placement bonuses under your tiles.',
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
    const spaces = player.game.board.spaces.filter((space) => space.tile !== undefined && space.player === player);
    
    spaces.forEach((space) => {
      const bonuses = new Multiset(space.bonus);
      bonuses.entries().forEach(([bonus, count]) => {
        player.game.grantSpaceBonus(player, bonus, count);
      });
    });
    
    this.isDisabled = true;

    return undefined;
  }
}
