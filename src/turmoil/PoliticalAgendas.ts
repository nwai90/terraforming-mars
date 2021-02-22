import {ChoosePoliticalAgenda} from '../deferredActions/ChoosePoliticaAgenda';
import {Game} from '../Game';
import {Bonus, BonusId} from './Bonus';
import {IParty} from './parties/IParty';
import {PartyName} from './parties/PartyName';
import {Policy, PolicyId} from './Policy';
import {Turmoil} from './Turmoil';

export enum AgendaStyle {
  STANDARD = 'Standard',
  RANDOM = 'Random',
  CHAIRMAN = 'Chairman',
}

export interface Agenda {
  bonusId: BonusId;
  policyId: PolicyId;
}

export interface PoliticalAgendasData {
  // The agenda for this generation.
  currentAgenda: Agenda;
  staticAgendas: Map<PartyName, Agenda> | undefined;
  agendaStyle: AgendaStyle;
}

export interface SerializedPoliticalAgendasData {
  currentAgenda: Agenda;
  staticAgendas: Array<[PartyName, Agenda]> | undefined;
  agendaStyle: AgendaStyle;
}

export class PoliticalAgendas {
  public static randomElement = PoliticalAgendas.defaultRandomElement;

  public static newInstance(
    agendaStyle: AgendaStyle,
    parties: Array<IParty>,
    firstRulingParty: IParty): PoliticalAgendasData {
    const staticAgendas: Map<PartyName, Agenda> = new Map();

    parties.forEach((p) => {
      if (agendaStyle === AgendaStyle.STANDARD) {
        staticAgendas.set(p.name, {bonusId: p.bonuses[0].id, policyId: p.policies[0].id});
      } else {
        staticAgendas.set(p.name, PoliticalAgendas.getRandomAgenda(p));
      }
    });

    const firstAgenda = staticAgendas.get(firstRulingParty.name);
    if (firstAgenda === undefined) {
      throw new Error('No static agenda for party ' + firstRulingParty.name);
    }

    return {
      currentAgenda: firstAgenda,
      staticAgendas: staticAgendas,
      agendaStyle: agendaStyle,
    };
  }

  private static getRandomAgenda(party: IParty): Agenda {
    const bonus: Bonus = PoliticalAgendas.randomElement(party.bonuses);
    const policy: Policy = PoliticalAgendas.randomElement(party.policies);

    return {bonusId: bonus.id, policyId: policy.id};
  }

  // The ruling party is already in power, and now it is time for the party to select an agenda.
  // Do not expect the method to return an activated agenda if the current agenda style is chairman
  // And a person is the chairman -- the end of this method will just defer selection until later.
  static setNextAgenda(turmoil: Turmoil, game: Game, agendaStyle: AgendaStyle = AgendaStyle.STANDARD): void {
    const rulingParty = turmoil.rulingParty;
    const politicalAgendasData = turmoil.politicalAgendasData;
    const chairman: string = turmoil.chairman as string;

    if (agendaStyle !== AgendaStyle.CHAIRMAN || (agendaStyle === AgendaStyle.CHAIRMAN && chairman === 'NEUTRAL')) {
      politicalAgendasData.currentAgenda = this.getDeterministicAgenda(rulingParty, politicalAgendasData.staticAgendas);
      turmoil.onAgendaSelected(game);
    } else {
      game.defer(new ChoosePoliticalAgenda(game.getPlayerById(chairman), rulingParty, turmoil));
    }
  }

  private static getDeterministicAgenda(
    rulingParty: IParty,
    staticAgendas: Map<PartyName, Agenda> | undefined): Agenda {
    if (staticAgendas === undefined) {
      return PoliticalAgendas.getRandomAgenda(rulingParty);
    } else {
      if (politicalAgendasData.staticAgendas === undefined) {
        throw new Error('static agendas should be defined when agenda style is ' + politicalAgendasData.agendaStyle);
      }
      const agenda = politicalAgendasData.staticAgendas.get(rulingParty.name);
      if (agenda === undefined) {
        throw new Error('No static agenda for party ' + rulingParty.name);
      }
      return agenda;
    }
  }

  public static serialize(agenda: PoliticalAgendasData): SerializedPoliticalAgendasData {
    return {
      currentAgenda: agenda.currentAgenda,
      staticAgendas: agenda.staticAgendas === undefined ?
        undefined :
        Array.from(agenda.staticAgendas.entries()),
      agendaStyle: agenda.agendaStyle,
    };
  }

  public static deserialize(d: SerializedPoliticalAgendasData): PoliticalAgendasData {
    if (d.agendaStyle === undefined) {
      if (d.staticAgendas !== undefined) {
        return {
          currentAgenda: d.currentAgenda,
          staticAgendas: new Map(d.staticAgendas),
          agendas: new Map(d.staticAgendas),
          agendaStyle: AgendaStyle.CHAIRMAN,
        };
      }
      return {
        currentAgenda: d.currentAgenda,
        staticAgendas: undefined,
        agendas: new Map(), // An empty map for a legacy game is fine.
        agendaStyle: AgendaStyle.STANDARD, // Defaulting to STANDARD isn't great, but it'll do the job correctly.
      };
    }

    // Agenda style is stored, which means all four fields are populated.
    switch (d.agendaStyle) {
    case AgendaStyle.STANDARD:
    case AgendaStyle.RANDOM:
      return {
        currentAgenda: d.currentAgenda,
        staticAgendas: new Map(d.staticAgendas),
        agendaStyle: d.agendaStyle,
      };
    }
    return {
      currentAgenda: d.currentAgenda,
      staticAgendas: undefined,
      agendaStyle: d.agendaStyle,
    };
  }
}
