import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Turmoil} from '../../turmoil/Turmoil';

export class Petra extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.PETRA,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L16',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().minus().text('ALL').delegates(1).any.plus().delegates(1).asterix();
        }),
        description: 'Once per game, replace all neutral delegates with your delegates from the reserve.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    const turmoil = player.game.turmoil;
    if (turmoil === undefined) return false;

    let delegatesToReplace = turmoil.parties.map((party) => party.getDelegates("NEUTRAL")).reduce((a, b) => a + b, 0);
    if (turmoil.chairman === "NEUTRAL") delegatesToReplace += 1;

    let playerTotalDelegateCount = turmoil.getDelegatesInReserve(player.id);
    if (turmoil.lobby.has(player.id)) playerTotalDelegateCount += 1;

    return playerTotalDelegateCount >= delegatesToReplace && this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    const turmoil = player.game.turmoil as Turmoil;

    // Replace all neutral delegates in parties
    turmoil.parties.forEach((party) => {
      while (party.delegates.includes("NEUTRAL")) {
        const source = turmoil.hasAvailableDelegates(player.id) ? 'reserve' : 'lobby';
        turmoil.replaceDelegateFromParty("NEUTRAL", player.id, source, party.name, player.game);
      }
      turmoil.checkDominantParty(party);
    });

    // Replace chairman if it is neutral
    if (turmoil.chairman === "NEUTRAL") {
      turmoil.chairman = player.id;

      const index = turmoil.delegateReserve.indexOf(player.id);
      if (index > -1) {
        turmoil.delegateReserve.splice(index, 1);
      } else {
        turmoil.lobby.delete(player.id);
      }
    }

    this.isDisabled = true;
    return undefined;
  }
}
