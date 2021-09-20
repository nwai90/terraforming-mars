import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Turmoil} from '../../turmoil/Turmoil';
import {PartyName} from '../../turmoil/parties/PartyName';
import {DeferredAction} from '../../deferredActions/DeferredAction';

export class Zan extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.ZAN,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L26',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.redsInactive().asterix();
          b.br.br;
          b.opgArrow().text('ALL').delegates(1).colon().nbsp.nbsp.reds();
        }),
        description: 'You are immune to Reds\' ruling policy. Once per game, place all your delegates in Reds.',
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
    const turmoil = Turmoil.getTurmoil(game);
    const reserveDelegates = turmoil.delegateReserve.filter((d) => d === player.id).length;

    for (let i = 0; i < reserveDelegates; i++) {
      game.defer(new DeferredAction(player, () => {
        turmoil.sendDelegateToParty(player.id, PartyName.REDS, game, 'reserve');
        return undefined;
      }));
    }

    if (turmoil.lobby.has(player.id)) {
      game.defer(new DeferredAction(player, () => {
        turmoil.sendDelegateToParty(player.id, PartyName.REDS, game, 'lobby');
        return undefined;
      }));
    }
    
    this.isDisabled = true;
    return undefined;
  }
}
