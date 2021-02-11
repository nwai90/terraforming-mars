import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
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
import {CardMetadata} from '../CardMetadata';

export class WildlifeDome implements IProjectCard {
    public cost = 15;
    public tags = [Tags.ANIMAL, Tags.PLANT, Tags.BUILDING];
    public name = CardName.WILDLIFE_DOME;
    public cardType = CardType.AUTOMATED;

    public canPlay(player: Player): boolean {
      const turmoil = player.game.turmoil;

      if (turmoil !== undefined) {
        if (turmoil.parties.find((p) => p.name === PartyName.GREENS)) {
          const canPlaceTile = player.game.board.getAvailableSpacesForGreenery(player).length > 0;
          const meetsPartyRequirements = turmoil.canPlay(player, PartyName.GREENS);
          const oxygenMaxed = player.game.getOxygenLevel() === MAX_OXYGEN_LEVEL;

          if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS) && !oxygenMaxed) {
            return player.canAfford(player.getCardCost(this) + REDS_RULING_POLICY_COST, true, false, false, true) && meetsPartyRequirements && canPlaceTile;
          }

          return meetsPartyRequirements && canPlaceTile;
        }
        return player.canAfford(player.getCardCost(this) + SOCIETY_ADDITIONAL_CARD_COST, true, false, false, true);
      }
      return false;
    }

    public play(player: Player) {
      player.game.defer(new DeferredAction(player, () => new SelectSpace('Select space for greenery tile', player.game.board.getAvailableSpacesForGreenery(player), (space: ISpace) => {
        return player.game.addGreenery(player, space.id);
      })));

      TurmoilHandler.handleSocietyPayment(player, PartyName.GREENS);
      return undefined;
    }
    public requirements = CardRequirements.builder((b) => b.party(PartyName.GREENS));

    public metadata: CardMetadata = {
      cardNumber: 'T15',
      renderData: CardRenderer.builder((b) => {
        b.greenery();
      }),
      description: 'Requires that Greens are ruling or that you have 2 delegates there. Place a greenery tile and raise oxygen 1 step.',
    }
}
