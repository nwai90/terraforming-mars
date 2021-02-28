import {GlobalEventName} from './globalEvents/GlobalEventName';
import {PartyName} from './parties/PartyName';
import {SerializedGlobalEvent, SerializedGlobalEventDealer} from './globalEvents/SerializedGlobalEventDealer';
import {SerializedPoliticalAgendasData} from './PoliticalAgendas';
import {NeutralPlayer} from './Turmoil';
import {PlayerId} from '../Player';

export interface SerializedParty {
    name: PartyName;
    delegates: Array<PlayerId | NeutralPlayer>;
    partyLeader: undefined | PlayerId | NeutralPlayer;
}

export interface SerializedTurmoil {
    chairman: undefined | PlayerId | NeutralPlayer;
    rulingParty: PartyName;
    dominantParty: PartyName;
    lobby: Array<string>;
    delegateReserve: Array<PlayerId | NeutralPlayer>;
    parties: Array<SerializedParty>;
    playersInfluenceBonus: Array<[string, number]>;
    globalEventDealer: SerializedGlobalEventDealer;
    distantGlobalEvent: SerializedGlobalEvent | undefined;
    comingGlobalEvent: SerializedGlobalEvent | undefined;
    // TODO(kberg): By 2021-03-01, IGlobalEvent.
    currentGlobalEvent?: SerializedGlobalEvent | GlobalEventName;
    politicalAgendasData: SerializedPoliticalAgendasData;
    globalEventDelegatesRandomisationDone: boolean;
}
