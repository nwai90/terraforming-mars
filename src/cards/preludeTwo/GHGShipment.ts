import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {CardRequirements} from '../CardRequirements';
import {PartyName} from '../../turmoil/parties/PartyName';
import {SOCIETY_ADDITIONAL_CARD_COST} from '../../constants';
import {Tags} from '../Tags';
import {ResourceType} from '../../ResourceType';

export class GHGShipment extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.GHG_SHIPMENT,
      tags: [Tags.SPACE],
      cost: 3,
      requirements: CardRequirements.builder((b) => b.party(PartyName.KELVINISTS)),

      metadata: {
        cardNumber: '??',
        description: 'Requires that Kelvinists are ruling or that you have 2 delegates there. Increase your heat production 1 step and gain 1 heat for each floater you have.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.heat(1)).nbsp().heat(1).slash().floaters(1);
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    const turmoil = player.game.turmoil;

    if (turmoil !== undefined) {
      if (turmoil.parties.find((p) => p.name === PartyName.KELVINISTS)) {
        return turmoil.canPlay(player, PartyName.KELVINISTS);
      }

      return player.canAfford(player.getCardCost(this) + SOCIETY_ADDITIONAL_CARD_COST);
    }

    return false;
  }

  public play(player: Player) {
    player.addProduction(Resources.HEAT, 1);

    const floatersCount = player.getResourceCount(ResourceType.FLOATER);
    player.addResource(Resources.HEAT, floatersCount);

    return undefined;
  }
}
