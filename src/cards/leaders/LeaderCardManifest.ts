import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {Anders} from './Anders';
import {Bjorn} from './Bjorn';
import {Caroline} from './Caroline';
import {Dillon} from './Dillon';

export const LEADER_CARD_MANIFEST = new CardManifest({
  module: GameModule.Leader,
  leaderCards: [
    {cardName: CardName.ANDERS, Factory: Anders},
    {cardName: CardName.BJORN, Factory: Bjorn},
    {cardName: CardName.CAROLINE, Factory: Caroline},
    {cardName: CardName.DILLON, Factory: Dillon},
  ],
});
