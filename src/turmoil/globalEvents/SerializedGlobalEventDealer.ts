import {PartyName} from '../parties/PartyName';
import {GlobalEventName} from './GlobalEventName';

export interface SerializedGlobalEventDealer {
  deck: Array<SerializedGlobalEvent>;
  discarded: Array<SerializedGlobalEvent>;
}

export interface SerializedGlobalEvent {
  name: GlobalEventName | undefined;
  currentDelegate: PartyName | undefined;
  revealedDelegate: PartyName | undefined;
}