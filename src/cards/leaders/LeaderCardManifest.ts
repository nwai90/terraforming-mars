import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {Asimov} from './Asimov';
import {Bjorn} from './Bjorn';
import {Clarke} from './Clarke';
import {Duncan} from './Duncan';
import {Ender} from './Ender';
import {Floyd} from './Floyd';
import {Gordon} from './Gordon';
import {HAL9000} from './HAL9000';
import {Ingrid} from './Ingrid';
import {Jansson} from './Jansson';
import {Karen} from './Karen';
import {Lowell} from './Lowell';
import {Maria} from './Maria';
import {Naomi} from './Naomi';
import {Oscar} from './Oscar';
import {Petra} from './Petra';
import {Quill} from './Quill';
import {Rogers} from './Rogers';
import {Stefan} from './Stefan';
import {Tate} from './Tate';
import {Ulrich} from './Ulrich';
import {VanAllen} from './VanAllen';
import {Will} from './Will';
import {Xavier} from './Xavier';
import {Yvonne} from './Yvonne';
import {Zan} from './Zan';

export const LEADER_CARD_MANIFEST = new CardManifest({
  module: GameModule.Leader,
  leaderCards: [
    {cardName: CardName.ASIMOV, Factory: Asimov},
    {cardName: CardName.BJORN, Factory: Bjorn},
    {cardName: CardName.CLARKE, Factory: Clarke},
    {cardName: CardName.DUNCAN, Factory: Duncan},
    {cardName: CardName.ENDER, Factory: Ender},
    {cardName: CardName.FLOYD, Factory: Floyd},
    {cardName: CardName.GORDON, Factory: Gordon},
    {cardName: CardName.HAL9000, Factory: HAL9000},
    {cardName: CardName.INGRID, Factory: Ingrid},
    {cardName: CardName.JANSSON, Factory: Jansson},
    {cardName: CardName.KAREN, Factory: Karen, compatibility: GameModule.Prelude},
    {cardName: CardName.LOWELL, Factory: Lowell, compatibility: GameModule.Prelude},
    {cardName: CardName.MARIA, Factory: Maria, compatibility: GameModule.Colonies},
    {cardName: CardName.NAOMI, Factory: Naomi, compatibility: GameModule.Colonies},
    {cardName: CardName.OSCAR, Factory: Oscar, compatibility: GameModule.Turmoil},
    {cardName: CardName.PETRA, Factory: Petra, compatibility: GameModule.Turmoil},
    {cardName: CardName.QUILL, Factory: Quill, compatibility: GameModule.Venus},
    {cardName: CardName.ROGERS, Factory: Rogers, compatibility: GameModule.Venus},
    {cardName: CardName.STEFAN, Factory: Stefan},
    {cardName: CardName.TATE, Factory: Tate},
    {cardName: CardName.ULRICH, Factory: Ulrich},
    {cardName: CardName.VAN_ALLEN, Factory: VanAllen},
    {cardName: CardName.WILL, Factory: Will, compatibility: GameModule.Venus},
    {cardName: CardName.XAVIER, Factory: Xavier, compatibility: GameModule.Prelude},
    {cardName: CardName.YVONNE, Factory: Yvonne, compatibility: GameModule.Colonies},
    {cardName: CardName.ZAN, Factory: Zan, compatibility: GameModule.Turmoil},
  ],
});
