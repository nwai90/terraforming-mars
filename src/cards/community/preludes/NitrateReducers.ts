import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Game} from '../../../Game';
import {Resources} from '../../../Resources';

export class NitrateReducers extends PreludeCard implements IProjectCard {
    public tags = [Tags.VENUS, Tags.MICROBE];
    public name = CardName.NITRATE_REDUCERS;

    public play(player: Player, game: Game) {
      player.addProduction(Resources.MEGACREDITS, 3);

      if (game.hasCardsWithTag(Tags.MICROBE, 2)) {
        for (const foundCard of game.drawCardsByTag(Tags.MICROBE, 2)) {
          player.cardsInHand.push(foundCard);
        }

        const drawnCards = game.getCardsInHandByTag(player, Tags.MICROBE).slice(-2);
        game.log('${0} drew ${1} and ${2}', (b) => b.player(player).card(drawnCards[0]).card(drawnCards[1]));
      }

      return undefined;
    }
}

