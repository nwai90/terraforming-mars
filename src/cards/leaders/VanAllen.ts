import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Game} from '../../Game';
import {Resources} from '../../Resources';

export class VanAllen extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.VAN_ALLEN,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L22',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.text('MILESTONES: ').megacredits(0).megacredits(3).asterix();
          b.br.br;
        }),
        description: 'You may claim milestones for free (you must still meet the requirements). When any milestone is claimed, gain 3 M€.',
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(): boolean {
   return false;
  }

  public action(): PlayerInput | undefined {
    return undefined;
  }

  public static onMilestoneClaimed(game: Game) {
    const owner = game.getPlayers().find((player) => player.cardIsInEffect(CardName.VAN_ALLEN));
    if (owner === undefined) return;

    owner.addResource(Resources.MEGACREDITS, 3, {log: true});
    return undefined;
  }
}
