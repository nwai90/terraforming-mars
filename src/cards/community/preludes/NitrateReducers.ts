import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {LogHelper} from '../../../LogHelper';

export class NitrateReducers extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.NITRATE_REDUCERS,
        tags: [Tags.VENUS, Tags.MICROBE],

        metadata: {
          cardNumber: 'Y15',
          renderData: CardRenderer.builder((b) => {
            b.cards(2).secondaryTag(Tags.MICROBE).br;
            b.production((pb) => pb.megacredits(3));
          }),
          description: 'Draw 2 microbe cards. Increase your MC production 3 steps.',
        },
      });
    }

    public play(player: Player, game: Game) {
      player.addProduction(Resources.MEGACREDITS, 3);

      const cards = game.drawCardsByTag(Tags.MICROBE, 2);
      player.cardsInHand.push(...cards);
      LogHelper.logDrawnCards(player, cards);

      return undefined;
    }
}

