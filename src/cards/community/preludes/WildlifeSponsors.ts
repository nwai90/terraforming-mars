import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {AltSecondaryTag} from '../../render/CardRenderItem';

export class WildlifeSponsors extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.WILDLIFE_SPONSORS,
      tags: [Tags.ANIMAL],

      metadata: {
        cardNumber: 'Y30',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(3)).nbsp;
          b.cards(2).secondaryTag(AltSecondaryTag.ANIMAL_RESOURCE).br;
        }),
        description: 'Increase your M€ production 3 steps. Draw 2 cards with an animal icon or tag.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 3);
    player.drawCard(2, {
      include: (card) => WildlifeSponsors.animalCards.has(card.name) || card.tags.includes(Tags.ANIMAL)
    });
    return undefined;
  }

  public static readonly animalCards: Set<CardName> = new Set([
    CardName.IMPORTED_HYDROGEN,
    CardName.EOS_CHASMA_NATIONAL_PARK,
    CardName.VIRAL_ENHANCERS,
    CardName.VIRUS,
    CardName.DECOMPOSERS,
    CardName.LARGE_CONVOY,
    CardName.IMPORTED_NITROGEN,
    CardName.PROTECTED_HABITATS,
    CardName.LOCAL_HEAT_TRAPPING,
    CardName.FREYJA_BIODOMES,
    CardName.GMO_CONTRACT,
    CardName.MOHOLE_LAKE,
    CardName.MEAT_INDUSTRY,
    CardName.BIO_PRINTING_FACILITY,
    CardName.ECOLOGICAL_SURVEY,
  ]);
}
