import {PartyName} from './parties/PartyName';
import {IParty} from './parties/IParty';
import {MarsFirst} from './parties/MarsFirst';
import {Scientists} from './parties/Scientists';
import {Unity} from './parties/Unity';
import {Kelvinists} from './parties/Kelvinists';
import {Reds} from './parties/Reds';
import {Greens} from './parties/Greens';
import {Player, PlayerId} from '../Player';
import {Game} from '../Game';
import {GlobalEventDealer, getGlobalEventByName} from './globalEvents/GlobalEventDealer';
import {IGlobalEvent} from './globalEvents/IGlobalEvent';
import {ISerializable} from '../ISerializable';
import {SerializedParty, SerializedTurmoil} from './SerializedTurmoil';
import {PLAYER_DELEGATES_COUNT} from '../constants';
import {AgendaStyle, PoliticalAgendasData, PoliticalAgendas} from './PoliticalAgendas';
import {CardName} from '../CardName';
import {Spome} from './parties/Spome';
import {Empower} from './parties/Empower';
import {Populists} from './parties/Populists';
import {Bureaucrats} from './parties/Bureaucrats';
import {Transhumans} from './parties/Transhumans';
import {Centrists} from './parties/Centrists';
import {TurmoilHandler} from './TurmoilHandler';
import {SerializedGlobalEvent} from './globalEvents/SerializedGlobalEventDealer';

export type NeutralPlayer = 'NEUTRAL';

export interface IPartyFactory {
    partyName: PartyName;
    Factory: new () => IParty
}

export const ALL_DEFAULT_PARTIES: Array<IPartyFactory> = [
  {partyName: PartyName.MARS, Factory: MarsFirst},
  {partyName: PartyName.SCIENTISTS, Factory: Scientists},
  {partyName: PartyName.UNITY, Factory: Unity},
  {partyName: PartyName.GREENS, Factory: Greens},
  {partyName: PartyName.REDS, Factory: Reds},
  {partyName: PartyName.KELVINISTS, Factory: Kelvinists},
];

export const ALL_SOCIETY_PARTIES: Array<IPartyFactory> = [
  {partyName: PartyName.SPOME, Factory: Spome},
  {partyName: PartyName.EMPOWER, Factory: Empower},
  {partyName: PartyName.POPULISTS, Factory: Populists},
  {partyName: PartyName.BUREAUCRATS, Factory: Bureaucrats},
  {partyName: PartyName.TRANSHUMANS, Factory: Transhumans},
  {partyName: PartyName.CENTRISTS, Factory: Centrists},
];

const UNINITIALIZED_POLITICAL_AGENDAS_DATA: PoliticalAgendasData = {
  currentAgenda: {
    bonusId: 'none',
    policyId: 'none',
  },
  staticAgendas: undefined,
  agendaStyle: AgendaStyle.STANDARD,
};

export class Turmoil implements ISerializable<SerializedTurmoil> {
    public chairman: undefined | PlayerId | NeutralPlayer = undefined;
    public rulingParty: IParty;
    public dominantParty: IParty;
    public lobby: Set<PlayerId> = new Set<PlayerId>();
    public delegateReserve: Array<PlayerId | NeutralPlayer> = [];
    public parties: Array<IParty> = ALL_DEFAULT_PARTIES.concat(ALL_SOCIETY_PARTIES).map((cf) => new cf.Factory());
    public playersInfluenceBonus: Map<string, number> = new Map<string, number>();
    public readonly globalEventDealer: GlobalEventDealer;
    public distantGlobalEvent: IGlobalEvent | undefined;
    public comingGlobalEvent: IGlobalEvent | undefined;
    public currentGlobalEvent: IGlobalEvent | undefined;
    public politicalAgendasData: PoliticalAgendasData = UNINITIALIZED_POLITICAL_AGENDAS_DATA;
    public globalEventDelegatesRandomisationDone: boolean = false;

    private constructor(
      rulingPartyName: PartyName,
      chairman: PlayerId | 'NEUTRAL',
      dominantPartyName: PartyName,
      globalEventDealer: GlobalEventDealer,
      societyExpansion: boolean,
      randomTurmoil: boolean = false,
      parties: SerializedParty[] | undefined = undefined) {
      this.rulingParty = this.getPartyByName(rulingPartyName);
      this.chairman = chairman;
      this.dominantParty = this.getPartyByName(dominantPartyName);
      this.globalEventDealer = globalEventDealer;

      // Init parties
      if (societyExpansion) {
        if (randomTurmoil) {
          if (parties === undefined) {
            // Randomly choose 6 of 12 parties the first time this is called
            this.parties = ALL_DEFAULT_PARTIES.concat(ALL_SOCIETY_PARTIES).map((cf) => new cf.Factory())
              .map((a) => ({sort: Math.random(), value: a}))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value)
              .slice(0, 6);

            this.rulingParty = this.getPartyByName(this.parties[0].name);
            this.dominantParty = this.getPartyByName(this.parties[0].name);
          } else {
            // Used when deserializing
            this.parties = parties.map((party) => this.getPartyByName(party.name));
            this.rulingParty = this.getPartyByName(rulingPartyName);
            this.dominantParty = this.getPartyByName(dominantPartyName);
          }

        } else {
          this.parties = ALL_SOCIETY_PARTIES.map((cf) => new cf.Factory());
        }
      } else {
        this.parties = ALL_DEFAULT_PARTIES.map((cf) => new cf.Factory());
      }
    }

    public static newInstance(game: Game, agendaStyle: AgendaStyle = AgendaStyle.STANDARD): Turmoil {
      const societyExpansion: boolean = game.gameOptions.societyExpansion;
      const randomTurmoil: boolean = game.gameOptions.randomTurmoil;
      const dealer = GlobalEventDealer.newInstance(game);

      // The game begins with Greens / Spome in power and a Neutral chairman
      const rulingParty = societyExpansion ? PartyName.SPOME : PartyName.GREENS;
      const turmoil = new Turmoil(rulingParty, 'NEUTRAL', rulingParty, dealer, societyExpansion, randomTurmoil);

      game.log('A neutral delegate is the new chairman');
      game.log(turmoil.rulingParty.name + ' are in power in the first generation');

      // Society hook: Randomize top and bottom delegate for each event the first time this is called
      if (randomTurmoil && turmoil.globalEventDelegatesRandomisationDone === false) {
        TurmoilHandler.randomizeGlobalEventDelegates(turmoil, dealer);
        turmoil.globalEventDelegatesRandomisationDone = true;
      }

      game.getPlayers().forEach((player) => {
        // Begin with one delegate in the lobby
        turmoil.lobby.add(player.id);
        // Begin with six delegates in the delegate reserve
        for (let i = 0; i < PLAYER_DELEGATES_COUNT - 1; i++) {
          turmoil.delegateReserve.push(player.id);
        }
      });

      // Begin with 13 neutral delegates in the reserve
      for (let i = 0; i < 13; i++) {
        turmoil.delegateReserve.push('NEUTRAL');
      }

      turmoil.politicalAgendasData = PoliticalAgendas.newInstance(agendaStyle, turmoil.parties, turmoil.rulingParty);
      // Note: this call relies on an instance of Game that will not be fully formed.
      // TODO(kberg): split newInstance into create/set-up so this can be done once the whole thing is ready.
      turmoil.onAgendaSelected(game);
      turmoil.initGlobalEvent(game);
      return turmoil;
    }

    public initGlobalEvent(game: Game) {
      // Draw the first global event to setup the game
      this.comingGlobalEvent = this.globalEventDealer.draw();
      if (this.comingGlobalEvent !== undefined) {
        this.sendDelegateToParty('NEUTRAL', this.comingGlobalEvent.revealedDelegate, game);
      }
      this.distantGlobalEvent = this.globalEventDealer.draw();
      if (this.distantGlobalEvent !== undefined) {
        this.sendDelegateToParty('NEUTRAL', this.distantGlobalEvent.revealedDelegate, game);
      }
    }

    public getPartyByName(name: PartyName): IParty {
      const party = this.parties.find((party) => party.name === name);
      if (party === undefined) {
        throw new Error(`Cannot find party with name {${name}}`);
      }
      return party;
    }

    // Use to send a delegate to a specific party
    public sendDelegateToParty(
      playerId: PlayerId | NeutralPlayer,
      partyName: PartyName,
      game: Game,
      source: 'lobby' | 'reserve' = 'lobby'): void {
      const party = this.getPartyByName(partyName);
      if (party) {
        if (playerId !== 'NEUTRAL' && this.lobby.has(playerId) && source === 'lobby') {
          this.lobby.delete(playerId);
        } else {
          const index = this.delegateReserve.indexOf(playerId);
          if (index > -1) {
            this.delegateReserve.splice(index, 1);
          }
        }
        party.sendDelegate(playerId, game);
        this.checkDominantParty(party);
      } else {
        throw 'Party not found';
      }
    }

    // Use to remove a delegate from a specific party
    public removeDelegateFromParty(playerId: PlayerId | NeutralPlayer, partyName: PartyName, game: Game): void {
      const party = this.getPartyByName(partyName);
      if (party) {
        this.delegateReserve.push(playerId);
        party.removeDelegate(playerId, game);
        this.checkDominantParty(party);
      } else {
        throw 'Party not found';
      }
    }

    // Use to replace a delegate from a specific party with another delegate with NO DOMINANCE CHANGE
    public replaceDelegateFromParty(
      outgoingPlayerId: PlayerId | NeutralPlayer,
      incomingPlayerId: PlayerId | NeutralPlayer,
      source: 'lobby' | 'reserve' = 'lobby',
      partyName: PartyName,
      game: Game): void {
      const party = this.getPartyByName(partyName);
      if (party) {
        this.delegateReserve.push(outgoingPlayerId);
        party.removeDelegate(outgoingPlayerId, game);
        this.sendDelegateToParty(incomingPlayerId, partyName, game, source);
      } else {
        throw 'Party not found';
      }
    }

    // Check dominant party
    public checkDominantParty(party:IParty): void {
      // If there is a dominant party
      if (this.dominantParty) {
        const sortParties = [...this.parties].sort(
          (p1, p2) => p2.delegates.length - p1.delegates.length,
        );
        const max = sortParties[0].delegates.length;
        if (this.dominantParty.delegates.length !== max) {
          this.setNextPartyAsDominant(this.dominantParty);
        }
      } else {
        this.dominantParty = party;
      }
    }

    // Function to get next dominant party taking into account the clockwise order
    public setNextPartyAsDominant(currentDominantParty: IParty) {
      const sortParties = [...this.parties].sort(
        (p1, p2) => p2.delegates.length - p1.delegates.length,
      );
      const max = sortParties[0].delegates.length;

      const currentIndex = this.parties.indexOf(currentDominantParty);

      let partiesToCheck = [];

      // Manage if it's the first party or the last
      if (currentIndex === 0) {
        partiesToCheck = this.parties.slice(currentIndex + 1);
      } else if (currentIndex === this.parties.length - 1) {
        partiesToCheck = this.parties.slice(0, currentIndex);
      } else {
        const left = this.parties.slice(0, currentIndex);
        const right = this.parties.slice(currentIndex + 1);
        partiesToCheck = right.concat(left);
      }

      // Take the clockwise order
      const partiesOrdered = partiesToCheck.reverse();

      partiesOrdered.some((newParty) => {
        if (newParty.delegates.length === max) {
          this.dominantParty = newParty;
          return true;
        }
        return false;
      });
    }

    // Launch the turmoil phase
    public endGeneration(game: Game): void {
      // 1 - All player lose 1 TR
      game.getPlayers().forEach((player) => {
        player.decreaseTerraformRating();
      });

      // 2 - Global Event
      // TODO: create a LogMessageDataType for Global Events, ref https://github.com/bafolts/terraforming-mars/issues/3057
      if (this.currentGlobalEvent) {
        game.log('Global event "' + this.currentGlobalEvent.name + '" has been resolved.');
        this.currentGlobalEvent.resolve(game, this);
      }

      // 3 - New Government
      this.rulingParty = this.dominantParty;

      // 3.a - Ruling Policy change
      if (this.rulingParty) {
        this.setRulingParty(game);
      }

      // 3.b - New dominant party
      this.setNextPartyAsDominant(this.rulingParty!);

      // 3.c - Fill the lobby
      this.lobby.forEach((playerId) => {
        this.delegateReserve.push(playerId);
      });
      this.lobby = new Set<string>();

      game.getPlayers().forEach((player) => {
        if (this.getDelegatesInReserve(player.id) > 0) {
          const index = this.delegateReserve.indexOf(player.id);
          if (index > -1) {
            this.delegateReserve.splice(index, 1);
          }
          this.lobby.add(player.id);
        }
      });

      // 4 - Changing Time
      if (this.currentGlobalEvent) {
        this.globalEventDealer.discardedGlobalEvents.push(this.currentGlobalEvent);
      }
      // 4.a - Coming Event is now Current event. Add neutral delegate.
      this.currentGlobalEvent = this.comingGlobalEvent;
      if (this.currentGlobalEvent) {
        this.sendDelegateToParty('NEUTRAL', this.currentGlobalEvent.currentDelegate, game);
      }
      // 4.b - Distant Event is now Coming Event
      this.comingGlobalEvent = this.distantGlobalEvent;
      // 4.c - Draw the new distant event and add neutral delegate
      this.distantGlobalEvent = this.globalEventDealer.draw();
      if (this.distantGlobalEvent) {
        this.sendDelegateToParty('NEUTRAL', this.distantGlobalEvent.revealedDelegate, game);
      }
      game.log('Turmoil phase has been resolved');
    }

    // Ruling Party changes
    public setRulingParty(game: Game): void {
      if (this.rulingParty !== undefined) {
        // Cleanup previous party effects
        game.getPlayers().forEach((player) => {
          player.hasTurmoilScienceTagBonus = false;
          player.hasBureaucratsColonyTradePenalty = false;
          player.hasTranshumansColonyTradeOffset = false;
        });

        // Change the chairman
        if (this.chairman) {
          this.delegateReserve.push(this.chairman);
        }

        this.chairman = this.rulingParty.partyLeader || 'NEUTRAL';

        const index = this.rulingParty.delegates.indexOf(this.rulingParty.partyLeader!);
        // Remove the party leader from the delegates array
        this.rulingParty.delegates.splice(index, 1);
        // Fill the delegate reserve
        this.delegateReserve = this.delegateReserve.concat(this.rulingParty.delegates);

        // Clean the party
        this.rulingParty.partyLeader = undefined;
        this.rulingParty.delegates = [];

        PoliticalAgendas.setNextAgenda(this, game, this.politicalAgendasData.agendaStyle);

        // Finally, award Chairman TR
        if (this.chairman !== 'NEUTRAL') {
          const player = game.getPlayerById(this.chairman);
          // Tempest Consultancy Hook (gains an additional TR when they become chairman)
          const steps = player.corporationCard?.name === CardName.TEMPEST_CONSULTANCY ? 2 :1;
          player.increaseTerraformRatingSteps(steps);
          game.log('${0} is the new chairman and gained ${1} TR', (b) => b.player(player).number(steps));
        } else {
          game.log('A neutral delegate is the new chairman');
        }
      }
    }

    // Called either directly during generation change, or after asking chairperson player
    // to choose an agenda.
    public onAgendaSelected(game: Game): void {
      const rulingParty = this.rulingParty;

      // Resolve Ruling Bonus
      const bonusId = this.politicalAgendasData.currentAgenda.bonusId;
      const bonus = rulingParty.bonuses.find((b) => b.id === bonusId);
      if (bonus === undefined) {
        throw new Error(`Bonus id ${bonusId} not found in party ${rulingParty.name}`);
      }
      game.log('The ruling bonus is ${0}', (b) => b.string(bonus.description).string(bonusId));
      bonus.grant(game);

      const policyId = this.politicalAgendasData.currentAgenda.policyId;
      const policy = rulingParty.policies.find((p) => p.id === policyId);
      if (policy === undefined) {
        throw new Error(`Policy id ${policyId} not found in party ${rulingParty.name}`);
      }
      game.log('The ruling policy is ${0}', (b) => b.string(policy.description).string(policyId));
      // Resolve Ruling Policy for Scientists P4, Bureaucrats P2 and Transhumans P4
      if (policy.apply !== undefined) {
        policy.apply(game);
      }
    }

    public getPlayerInfluence(player: Player) {
      let influence: number = 0;
      if (this.chairman !== undefined && this.chairman === player.id) influence++;

      const dominantParty : IParty = this.dominantParty;
      const isPartyLeader = dominantParty.partyLeader === player.id;
      const delegateCount = dominantParty.delegates.filter((delegate) => delegate === player.id).length;

      if (isPartyLeader) {
        influence++;
        if (delegateCount > 1) influence++; // at least 1 non-leader delegate
      } else {
        if (delegateCount > 0) influence++;
      }

      if (this.playersInfluenceBonus.has(player.id)) {
        const bonus = this.playersInfluenceBonus.get(player.id);
        if (bonus) {
          influence+= bonus;
        }
      }
      return influence;
    }

    public addInfluenceBonus(player: Player, bonus:number = 1) {
      if (this.playersInfluenceBonus.has(player.id)) {
        let current = this.playersInfluenceBonus.get(player.id);
        if (current) {
          current += bonus;
          this.playersInfluenceBonus.set(player.id, current);
        }
      } else {
        this.playersInfluenceBonus.set(player.id, bonus);
      }
    }

    public canPlay(player: Player, partyName : PartyName): boolean {
      if (this.rulingParty.name === partyName) {
        return true;
      }

      const party = this.getPartyByName(partyName);
      if (party !== undefined && party.getDelegates(player.id) >= 2) {
        return true;
      }

      return false;
    }

    // List players present in the reserve
    public getPresentPlayers(): Array<PlayerId | NeutralPlayer> {
      return Array.from(new Set(this.delegateReserve));
    }

    // Return number of delegates in reserve
    public getDelegatesInReserve(playerId: PlayerId | NeutralPlayer): number {
      const delegates = this.delegateReserve.filter((p) => p === playerId).length;
      return delegates;
    }

    // Check if player has delegates available
    public hasAvailableDelegates(playerId: PlayerId | NeutralPlayer): boolean {
      return this.getDelegatesInReserve(playerId) > 0;
    }

    // Get Victory Points
    public getPlayerVictoryPoints(player: Player): number {
      let victory: number = 0;
      if (this.chairman !== undefined && this.chairman === player.id) victory++;
      this.parties.forEach(function(party) {
        if (party.partyLeader === player.id) {
          victory++;
        }
      });
      return victory;
    }

    public serialize(): SerializedTurmoil {
      const result: SerializedTurmoil = {
        chairman: this.chairman,
        rulingParty: this.rulingParty.name,
        dominantParty: this.dominantParty.name,
        lobby: Array.from(this.lobby),
        delegateReserve: this.delegateReserve,
        parties: this.parties.map((p) => {
          return {
            name: p.name,
            delegates: p.delegates,
            partyLeader: p.partyLeader,
          };
        }),
        playersInfluenceBonus: Array.from(this.playersInfluenceBonus.entries()),
        globalEventDealer: this.globalEventDealer.serialize(),
        distantGlobalEvent: {name: this.distantGlobalEvent?.name, currentDelegate: this.distantGlobalEvent?.currentDelegate, revealedDelegate: this.distantGlobalEvent?.revealedDelegate},
        comingGlobalEvent: {name: this.comingGlobalEvent?.name, currentDelegate: this.comingGlobalEvent?.currentDelegate, revealedDelegate: this.comingGlobalEvent?.revealedDelegate},
        politicalAgendasData: PoliticalAgendas.serialize(this.politicalAgendasData),
        globalEventDelegatesRandomisationDone: this.globalEventDelegatesRandomisationDone,
      };
      if (this.currentGlobalEvent !== undefined) {
        result.currentGlobalEvent = {name: this.currentGlobalEvent?.name, currentDelegate: this.currentGlobalEvent?.currentDelegate, revealedDelegate: this.currentGlobalEvent?.revealedDelegate};
      }
      return result;
    }

    public static deserialize(d: SerializedTurmoil, societyExpansion: boolean = false, randomTurmoil: boolean = false): Turmoil {
      const dealer = GlobalEventDealer.deserialize(d.globalEventDealer);
      const turmoil = new Turmoil(d.rulingParty, d.chairman || 'NEUTRAL', d.dominantParty, dealer, societyExpansion, randomTurmoil, d.parties);

      turmoil.lobby = new Set(d.lobby);

      turmoil.delegateReserve = d.delegateReserve;

      turmoil.politicalAgendasData = PoliticalAgendas.deserialize(d.politicalAgendasData, turmoil);

      d.parties.forEach((sp) => {
        const tp = turmoil.getPartyByName(sp.name);
        if (tp === undefined) {
          throw new Error('huh? unknown party: ' + sp.name);
        }
        tp.delegates = sp.delegates;
        tp.partyLeader = sp.partyLeader;
      });

      turmoil.playersInfluenceBonus = new Map<string, number>(d.playersInfluenceBonus);
      turmoil.globalEventDelegatesRandomisationDone = d.globalEventDelegatesRandomisationDone;

      if (d.distantGlobalEvent) {
        turmoil.distantGlobalEvent = getGlobalEventByName(d.distantGlobalEvent.name!) as IGlobalEvent;
        turmoil.distantGlobalEvent.currentDelegate = d.distantGlobalEvent.currentDelegate as PartyName;
        turmoil.distantGlobalEvent.revealedDelegate = d.distantGlobalEvent.revealedDelegate as PartyName;
      }
      if (d.comingGlobalEvent) {
        turmoil.comingGlobalEvent = getGlobalEventByName(d.comingGlobalEvent.name!) as IGlobalEvent;
        turmoil.comingGlobalEvent.currentDelegate = d.comingGlobalEvent.currentDelegate as PartyName;
        turmoil.comingGlobalEvent.revealedDelegate = d.comingGlobalEvent.revealedDelegate as PartyName;
      }
      if (d.currentGlobalEvent) {
        turmoil.currentGlobalEvent = getGlobalEventByName((d.currentGlobalEvent as SerializedGlobalEvent).name!) as IGlobalEvent;
        turmoil.currentGlobalEvent.currentDelegate = (d.currentGlobalEvent as SerializedGlobalEvent).currentDelegate as PartyName;
        turmoil.currentGlobalEvent.revealedDelegate = (d.currentGlobalEvent as SerializedGlobalEvent).revealedDelegate as PartyName;
      }

      return turmoil;
    }
}
