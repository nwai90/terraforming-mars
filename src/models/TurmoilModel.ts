import {Color} from '../Color';
import {PartyName} from '../turmoil/parties/PartyName';
import {GlobalEventName} from '../turmoil/globalEvents/GlobalEventName';
import {Game} from '../Game';
import {Agenda} from '../turmoil/PoliticalAgendas';
import {IGlobalEvent} from '../turmoil/globalEvents/IGlobalEvent';
import {Turmoil} from '../turmoil/Turmoil';

export interface TurmoilModel {
  dominant: PartyName | undefined;
  ruling: PartyName | undefined;
  chairman: Color | undefined;
  parties: Array<PartyModel>;
  lobby: Array<Color>;
  reserve: Array<DelegatesModel>;
  distant: GlobalEventModel | undefined;
  coming: GlobalEventModel | undefined;
  current: GlobalEventModel | undefined;
  politicalAgendas: PoliticalAgendasModel | undefined;
  policyActionUsers: Array<PolicyUser>;
}

export interface PolicyUser {
  color: Color;
  turmoilPolicyActionUsed: boolean;
  politicalAgendasActionUsedCount: number;
}

export interface PartyModel {
  name: PartyName;
  description: string;
  partyLeader: Color | undefined;
  delegates: Array<DelegatesModel>;
  rulingPolicy: string | undefined;
}

export interface DelegatesModel {
  color: Color;
  number: number;
}

export interface GlobalEventModel {
  name: GlobalEventName;
  description: string;
  revealed: PartyName;
  current: PartyName;
}

export interface PoliticalAgendasModel {
  currentAgenda: Agenda,
  staticAgendas: StaticAgendasModel | undefined
}

export interface StaticAgendasModel {
  marsFirst: Agenda | undefined;
  scientists: Agenda | undefined;
  unity: Agenda | undefined;
  greens: Agenda | undefined;
  reds: Agenda | undefined;
  kelvinists: Agenda | undefined;
  spome: Agenda | undefined;
  empower: Agenda | undefined
  populists: Agenda | undefined;
  bureaucrats: Agenda | undefined;
  transhumans: Agenda | undefined;
  centrists: Agenda | undefined;
}

export function getTurmoilModel(game: Game): TurmoilModel | undefined {
  return Turmoil.ifTurmoilElse(game, (turmoil) => {
    const parties = getParties(game);
    let chairman; let dominant; let ruling;

    if (turmoil.chairman) {
      if (turmoil.chairman === 'NEUTRAL') {
        chairman = Color.NEUTRAL;
      } else {
        chairman = game.getPlayerById(turmoil.chairman).color;
      }
    }
    if (turmoil.dominantParty) {
      dominant = turmoil.dominantParty.name;
    }
    if (turmoil.rulingParty) {
      ruling = turmoil.rulingParty.name;
    }

    const lobby = Array.from(
      turmoil.lobby,
      (player) => game.getPlayerById(player).color,
    );

    const reserve = turmoil.getPresentPlayers().map((player) => {
      const number = turmoil.getDelegatesInReserve(player);
      if (player !== 'NEUTRAL') {
        return {
          color: game.getPlayerById(player).color,
          number: number,
        };
      } else {
        return {color: Color.NEUTRAL, number: number};
      }
    });

    const distant = globalEventToModel(turmoil.distantGlobalEvent);
    const coming = globalEventToModel(turmoil.comingGlobalEvent);
    const current = globalEventToModel(turmoil.currentGlobalEvent);

    const staticAgendas = turmoil.politicalAgendasData.staticAgendas;
    const getStaticAgenda = function(partyName: PartyName): Agenda | undefined {
      if (staticAgendas === undefined) {
        throw new Error('Trying to resolve static agendas when agendas are dynamic.');
      }
      const agenda = staticAgendas.get(partyName);
      return agenda;
    };

    let staticAgendasModel: StaticAgendasModel | undefined;
    if (staticAgendas !== undefined) {
      staticAgendasModel = {
        marsFirst: getStaticAgenda(PartyName.MARS),
        scientists: getStaticAgenda(PartyName.SCIENTISTS),
        unity: getStaticAgenda(PartyName.UNITY),
        greens: getStaticAgenda(PartyName.GREENS),
        reds: getStaticAgenda(PartyName.REDS),
        kelvinists: getStaticAgenda(PartyName.KELVINISTS),
        spome: getStaticAgenda(PartyName.SPOME),
        empower: getStaticAgenda(PartyName.EMPOWER),
        populists: getStaticAgenda(PartyName.POPULISTS),
        bureaucrats: getStaticAgenda(PartyName.BUREAUCRATS),
        transhumans: getStaticAgenda(PartyName.TRANSHUMANS),
        centrists: getStaticAgenda(PartyName.CENTRISTS),
      };
    }

    const politicalAgendas = {
      currentAgenda: turmoil.politicalAgendasData.currentAgenda,
      staticAgendas: staticAgendasModel,
    };

    const policyActionUsers = Array.from(
      game.getPlayers(),
      (player) => {
        return {
          color: player.color,
          turmoilPolicyActionUsed: player.turmoilPolicyActionUsed,
          politicalAgendasActionUsedCount: player.politicalAgendasActionUsedCount} as PolicyUser;
      },
    );

    return {
      chairman: chairman,
      ruling: ruling,
      dominant: dominant,
      parties: parties,
      lobby: lobby,
      reserve: reserve,
      distant: distant,
      coming: coming,
      current: current,
      politicalAgendas,
      policyActionUsers,
    };
  },
  () => undefined);
}

function globalEventToModel(globalEvent: IGlobalEvent | undefined): GlobalEventModel | undefined {
  if (globalEvent === undefined) {
    return undefined;
  }
  return {
    name: globalEvent.name,
    description: globalEvent.description,
    revealed: globalEvent.revealedDelegate,
    current: globalEvent.currentDelegate,
  };
}

function getParties(game: Game): Array<PartyModel> {
  return Turmoil.ifTurmoilElse(game,
    (turmoil) => {
      return turmoil.parties.map(function(party) {
        const delegates: Array<DelegatesModel> = [];
        party.getPresentPlayers().forEach((player) => {
          const number = party.getDelegates(player);
          if (player !== 'NEUTRAL') {
            delegates.push({
              color: game.getPlayerById(player).color,
              number: number,
            });
          } else {
            delegates.push({color: Color.NEUTRAL, number: number});
          }
        });
        let partyLeader;
        if (party.partyLeader) {
          if (party.partyLeader === 'NEUTRAL') {
            partyLeader = Color.NEUTRAL;
          } else {
            partyLeader = game.getPlayerById(party.partyLeader).color;
          }
        }
        return {
          name: party.name,
          description: party.description,
          partyLeader: partyLeader,
          delegates: delegates,
          rulingPolicy: turmoil.politicalAgendasData.staticAgendas?.get(party.name)?.policyId,
        };
      });
    },
    () => []);
}
