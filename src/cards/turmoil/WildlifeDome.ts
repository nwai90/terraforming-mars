import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {PartyName} from '../../turmoil/parties/PartyName';
import {SelectSpace} from '../../inputs/SelectSpace';
import {ISpace} from '../../boards/ISpace';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {REDS_RULING_POLICY_COST, MAX_OXYGEN_LEVEL, SOCIETY_ADDITIONAL_CARD_COST} from '../../constants';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {TurmoilHandler} from '../../turmoil/TurmoilHandler';
import {Turmoil} from '../../turmoil/Turmoil';

export class WildlifeDome extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.WILDLIFE_DOME,
      cost: 15,
      tags: [Tags.ANIMAL, Tags.PLANT, Tags.BUILDING],
      cardType: CardType.AUTOMATED,
      requirements: CardRequirements.builder((b) => b.party(PartyName.GREENS)),

      metadata: {
        cardNumber: 'T15',
        renderData: CardRenderer.builder((b) => {
          b.greenery();
        }),
        description: 'Requires that Greens are ruling or that you have 2 delegates there. Place a greenery tile and raise oxygen 1 step.',
      },
    });
  }

  public canPlay(player: Player): boolean {
    if (!super.canPlay(player)) return false;

    const turmoil = Turmoil.getTurmoil(player.game);
    const canPlaceTile = player.game.board.getAvailableSpacesForGreenery(player).length > 0;

    if (turmoil.parties.find((p) => p.name === PartyName.GREENS)) {  
      const meetsPartyRequirements = turmoil.canPlay(player, PartyName.GREENS);
      const oxygenMaxed = player.game.getOxygenLevel() === MAX_OXYGEN_LEVEL;

      if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS) && !oxygenMaxed) {
        return player.canAfford(player.getCardCost(this) + REDS_RULING_POLICY_COST, {steel: true, microbes: true}) && meetsPartyRequirements && canPlaceTile;
      }

      return meetsPartyRequirements && canPlaceTile;
    }

    return player.canAfford(player.getCardCost(this) + SOCIETY_ADDITIONAL_CARD_COST, {steel: true, microbes: true}) && canPlaceTile;
  }

  public play(player: Player) {
    player.game.defer(new DeferredAction(player, () => new SelectSpace('Select space for greenery tile', player.game.board.getAvailableSpacesForGreenery(player), (space: ISpace) => {
      return player.game.addGreenery(player, space.id);
    })));

    TurmoilHandler.handleSocietyPayment(player, PartyName.GREENS);
    return undefined;
  }
}
