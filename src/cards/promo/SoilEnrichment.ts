import {ICard} from './../ICard';
import {IProjectCard} from './../IProjectCard';
import {Tags} from './../Tags';
import {Card} from '../Card';
import {CardType} from './../CardType';
import {Player} from '../../Player';
import {SelectCard} from '../../inputs/SelectCard';
import {ResourceType} from '../../ResourceType';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';

export class SoilEnrichment extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.SOIL_ENRICHMENT,
      tags: [Tags.MICROBE, Tags.PLANT],
      cost: 6,

      metadata: {
        cardNumber: 'X67',
        renderData: CardRenderer.builder((b) => {
          b.minus().microbes(1).plus().plants(5).digit.asterix();
        }),
        description: 'Spend 1 microbe from ANY of your cards to gain 5 plants.',
      },
    });
  }

  public canPlay(player: Player) {
    const microbeCardsWithResources = player.getResourceCards(ResourceType.MICROBE).filter((c) => c.resourceCount! > 0);
    return microbeCardsWithResources.length > 0;
  }

  public play(player: Player) {
    const microbeCards = player.getResourceCards(ResourceType.MICROBE);

    if (microbeCards.length === 1) {
      player.removeResourceFrom(microbeCards[0], 1, player.game, player, true);
      player.addResource(Resources.PLANTS, 5, {log: true});
      return undefined;
    } else if (microbeCards.length > 1) {
      return new SelectCard('Select card to remove 1 microbe and gain 5 plants', 'Select', microbeCards, (foundCards: Array<ICard>) => {
        player.removeResourceFrom(foundCards[0], 1, player.game, player, true);
        player.addResource(Resources.PLANTS, 5, {log: true});
        return undefined;
      });
    }

    return undefined;
  }
}
