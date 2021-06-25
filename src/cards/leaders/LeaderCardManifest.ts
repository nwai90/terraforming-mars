import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {Anders} from './Anders';
import {Bjorn} from './Bjorn';
import {Caroline} from './Caroline';
import {Dillon} from './Dillon';
import {Edna} from './Edna';
import {Fritz} from './Fritz';
import {Goran} from './Goran';
import {Henrietta} from './Henrietta';
import {Isak} from './Isak';
import {Jansson} from './Jansson';
import {Karen} from './Karen';
import {Lindberg} from './Lindberg';
import {Maria} from './Maria';
import {Nils} from './Nils';
import {Oscar} from './Oscar';
import {Petra} from './Petra';

export const LEADER_CARD_MANIFEST = new CardManifest({
  module: GameModule.Leader,
  leaderCards: [
    {cardName: CardName.ANDERS, Factory: Anders},
    {cardName: CardName.BJORN, Factory: Bjorn},
    {cardName: CardName.CAROLINE, Factory: Caroline},
    {cardName: CardName.DILLON, Factory: Dillon},
    {cardName: CardName.EDNA, Factory: Edna},
    {cardName: CardName.FRITZ, Factory: Fritz},
    {cardName: CardName.GORAN, Factory: Goran},
    {cardName: CardName.HENRIETTA, Factory: Henrietta},
    {cardName: CardName.ISAK, Factory: Isak},
    {cardName: CardName.JANSSON, Factory: Jansson},
    {cardName: CardName.KAREN, Factory: Karen, compatibility: GameModule.Prelude},
    {cardName: CardName.LINDBERG, Factory: Lindberg, compatibility: GameModule.Prelude},
    {cardName: CardName.MARIA, Factory: Maria, compatibility: GameModule.Colonies},
    {cardName: CardName.NILS, Factory: Nils, compatibility: GameModule.Colonies},
    {cardName: CardName.OSCAR, Factory: Oscar, compatibility: GameModule.Turmoil},
    {cardName: CardName.PETRA, Factory: Petra, compatibility: GameModule.Turmoil},
  ],
});
