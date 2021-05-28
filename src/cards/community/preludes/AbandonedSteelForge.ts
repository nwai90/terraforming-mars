import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Resources} from '../../../Resources';

export class AbandonedSteelForge extends PreludeCard {
  constructor() {
    super({
      name: CardName.ABANDONED_STEEL_FORGE,
      metadata: {
        cardNumber: 'Y20',
        renderData: CardRenderer.builder((b) => {
          b.steel(9).br.br; // double break intentional
          b.cards(2).secondaryTag(Tags.BUILDING);
        }),
        description: 'Gain 9 steel. Reveal cards until you reveal two cards with Building tags. Take them into your hand and discard the rest.',
      },
    });
  }
  public play(player: Player) {
    player.addResource(Resources.STEEL, 9);
    player.drawCard(2, {tag: Tags.BUILDING});
    return undefined;
  };
}

