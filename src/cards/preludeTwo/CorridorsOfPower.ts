import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {PreludeCard} from '../prelude/PreludeCard';
import {Tags} from '../Tags';

export class CorridorsOfPower extends PreludeCard {
  constructor() {
    super({
      name: CardName.CORRIDORS_OF_POWER,
      tags: [Tags.EARTH],
      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.tr(1).megacredits(4);
          b.preludeBox('effect', (ce) => {
            ce.effect('Each time you become party leader, draw 1 card.', (eb) => {
              eb.partyLeaders(1).startEffect.cards(1);
            });
          });
        }),
        description: 'Increase your terraform rating 1 step. Gain 4 M€.',
      },
    });
  }

  public play(player: Player) {
    player.increaseTerraformRating();
    player.addResource(Resources.MEGACREDITS, 4);
    return undefined;
  }
}
