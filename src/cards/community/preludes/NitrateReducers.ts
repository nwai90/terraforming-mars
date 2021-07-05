import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';

export class NitrateReducers extends PreludeCard implements IProjectCard {
    constructor() {
      super({
        name: CardName.NITRATE_REDUCERS,
        tags: [Tags.VENUS, Tags.MICROBE],

        metadata: {
          cardNumber: 'Y15',
          renderData: CardRenderer.builder((b) => {
            b.production((pb) => pb.megacredits(3)).nbsp;
            b.cards(2).secondaryTag(Tags.MICROBE).br;
          }),
          description: 'Increase your M€ production 3 steps. Draw 2 microbe cards.',
        },
      });
    }

    public play(player: Player) {
      player.addProduction(Resources.MEGACREDITS, 3);
      player.drawCard(2, {tag: Tags.MICROBE});
      return undefined;
    }
}

