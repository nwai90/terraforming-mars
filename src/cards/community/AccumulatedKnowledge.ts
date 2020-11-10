import {Player} from '../../Player';
import {PreludeCard} from '../prelude/PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../CardName';
import {Game} from '../../Game';
import {Tags} from '../Tags';
import {DrawCards} from '../../deferredActions/DrawCards';

export class AccumulatedKnowledge extends PreludeCard implements IProjectCard {
    public tags = [Tags.SCIENCE];
    public name = CardName.ACCUMULATED_KNOWLEDGE;

    public play(player: Player, game: Game) {
      game.defer(new DrawCards(player, game, 5));
      return undefined;
    }
}

