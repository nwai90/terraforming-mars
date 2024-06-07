import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {PreludeCard} from '../prelude/PreludeCard';
import {Tags} from '../Tags';
import {IProjectCard} from '../IProjectCard';

export class SpaceCorridors extends PreludeCard {
  constructor() {
    super({
      name: CardName.SPACE_CORRIDORS,
      tags: [Tags.SPACE],
      cardDiscount: [{tag: Tags.JOVIAN, amount: 2}, {tag: Tags.EARTH, amount: 2}, {tag: Tags.VENUS, amount: 2}],
      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.titanium(3);
          b.preludeBox('effect', (ce) => {
            ce.effect('When you play a Jovian, Earth or Venus tag, you pay 2 M€ less for it.', (eb) => {
              eb.jovian().played.slash().earth().played.slash().venus(1).played.startEffect.megacredits(-2);
            });
          });
        }),
        description: 'Gain 3 titanium.',
      },
    });
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    const eligibleTags = [Tags.JOVIAN, Tags.EARTH, Tags.VENUS];
    return card.tags.filter((tag) => eligibleTags.includes(tag)).length * 2;
  }

  public play(player: Player) {
    player.addResource(Resources.TITANIUM, 3);
    return undefined;
  }
}
