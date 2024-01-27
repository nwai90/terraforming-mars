import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Turmoil} from '../../turmoil/Turmoil';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {SelectPartyToSendDelegate} from '../../inputs/SelectPartyToSendDelegate';
import {PartyName} from '../../turmoil/parties/PartyName';
import {Resources} from '../../Resources';
import {Size} from '../render/Size';
import {Darwin} from './Darwin';

export class Petra extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.PETRA,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L16',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
          b.br;
          b.text('REPLACE', Size.SMALL).delegates(1).colon().megacredits(3).asterix();
          b.br.br;
          b.plus().delegates(3).asterix;
        }),
        description: 'Once per game, replace as many Neutral delegates as possible with your delegates. Gain 3 M€ for each delegate replaced this way. Place 3 Neutral delegates.',
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

    return this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    const game = player.game;
    const turmoil = game.turmoil as Turmoil;

    let playerTotalDelegateCount = turmoil.getDelegatesInReserve(player.id);
    if (turmoil.lobby.has(player.id)) playerTotalDelegateCount += 1;

    const replaceNeutralDelegateTitle = 'Select where to replace a Neutral delegate';
    const neutralDelegateCount = turmoil.parties.map((p) => p.delegates.filter((d) => d === "NEUTRAL").length).reduce((a, c) => a + c, 0);
    const replacedCount = Math.min(neutralDelegateCount, playerTotalDelegateCount);

    // Replace as many neutral delegates as possible
    for (let i = 0; i < replacedCount; i++) {
      game.defer(new DeferredAction(player, () => {
        const partiesWithNeutralDelegates = turmoil.parties.filter((party) => party.delegates.includes("NEUTRAL")).map((party) => party.name);

        return new SelectPartyToSendDelegate(replaceNeutralDelegateTitle, 'Replace Neutral delegate', partiesWithNeutralDelegates, (partyName: PartyName) => {
          const source = turmoil.hasAvailableDelegates(player.id) ? 'reserve' : 'lobby';
          turmoil.replaceDelegateFromParty("NEUTRAL", player.id, source, partyName, game);
          player.totalDelegatesPlaced++;

          const party = turmoil.getPartyByName(partyName);
          turmoil.checkDominantParty(party);

          game.log('${0} replaced Neutral delegate in ${1}', (b) => b.player(player).party(turmoil.getPartyByName(partyName)));
          return undefined;
        });
      }));
    }

    player.addResource(Resources.MEGACREDITS, replacedCount * 3, {log: true});

    // Place 3 Neutral delegates
    const availableParties = turmoil.parties.map((party) => party.name);
    const title = 'Select where to send a Neutral delegate';
    const previousDominantParty = turmoil.dominantParty.name;

    for (let i = 0; i < 3; i++) {
        game.defer(new DeferredAction(player, () => {
        return new SelectPartyToSendDelegate(title, 'Send delegate', availableParties, (partyName: PartyName) => {
          turmoil.sendDelegateToParty('NEUTRAL', partyName, game);
          game.log('${0} sent ${1} Neutral delegate in ${2} area', (b) => b.player(player).number(1).party(turmoil.getPartyByName(partyName)));
          return undefined;
        });
      }));
    }

    game.defer(new DeferredAction(player, () => {
      if (turmoil.dominantParty.name !== previousDominantParty) {
        Darwin.onDominantPartyChange(game);
        game.log('${0} is the new dominant party', (b) => b.string(turmoil.dominantParty.name));
      }
      return undefined;
    }));

    this.isDisabled = true;
    return undefined;
  }
}
