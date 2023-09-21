import {CardName} from '../../CardName';
import {Player} from '../../Player';
import {CardType} from '../CardType';
import {Tags} from '../Tags';
import {CorporationCard} from '../corporation/CorporationCard';
import {IProjectCard} from '../IProjectCard';
import {ResourceType} from '../../ResourceType';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {Size} from '../render/Size';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {REDS_RULING_POLICY_COST} from '../../constants';

export class TheArchaicFoundationInstitute extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.THE_ARCHAIC_FOUNDATION_INSTITUTE,
      tags: [Tags.MOON, Tags.MOON],
      startingMegaCredits: 55,
      resourceType: ResourceType.RESOURCE_CUBE,

      metadata: {
        description: 'You start with 55 M€.',
        cardNumber: '',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(55);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.moon().startEffect.resourceCube();
            });
            ce.vSpace();
            ce.effect('When you play a Moon tag, add a resource cube to this card. Automatically remove every 3 resource cubes collected here to increase your TR 1 step.', (eb) => {
              eb.resourceCube(3).startEffect.tr(1, Size.SMALL);
            });
          });
        }),
      },
    });
  }

  public resourceCount = 0;

  public play() {
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard): void {
    if (!player.isCorporation(this.name)) return;

    const moonTags = card.tags.filter((t) => t === Tags.MOON);
    const count = moonTags.length;

    if (count > 0) {
      player.addResourceTo(this, count);

      if (this.resourceCount >= 3) {
        const redsAreRuling = PartyHooks.shouldApplyPolicy(player, PartyName.REDS);
        const canAffordToRaiseTR = redsAreRuling ? player.canAfford(REDS_RULING_POLICY_COST) : true;

        if (canAffordToRaiseTR) {
          player.removeResourceFrom(this, 3, player.game, player, true);
          player.increaseTerraformRatingSteps(1);
        }
      }
    };

    return undefined;
  }
}
