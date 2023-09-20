import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {REDS_RULING_POLICY_COST} from '../../../constants';
import {StandardProjectCard} from '../../StandardProjectCard';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {PlaceGreeneryTile} from '../../../deferredActions/PlaceGreeneryTile';
import {TileType} from '../../../TileType';
import {HowToAffordRedsPolicy, ActionDetails, RedsPolicy} from '../../../turmoil/RedsPolicy';
import {IProjectCard} from '../../IProjectCard';
import {Units} from '../../../Units';
import {Card} from '../../Card';

export class GreeneryStandardProject extends StandardProjectCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor() {
    super({
      name: CardName.GREENERY_STANDARD_PROJECT,
      cost: 23,
      tr: {oxygen: 1},
      metadata: {
        cardNumber: 'SP6',
        renderData: CardRenderer.builder((b) =>
          b.standardProject('Spend 23 M€ to place a greenery tile and raise oxygen 1 step.', (eb) => {
            eb.megacredits(23).startAction.greenery();
          }),
        ),
      },
    });
  }

  public canAct(player: Player): boolean {
    if (player.game.board.getAvailableSpacesForGreenery(player).length === 0) return false;

    const trGain = player.computeTerraformRatingBump(this);
    Card.setRedsWarningText(player, trGain, this, false, 'take this action');

    if (PartyHooks.shouldApplyPolicy(player, PartyName.REDS)) {
      this.reserveUnits = Units.adjustUnits(this.reserveUnits, {megacredits: trGain * REDS_RULING_POLICY_COST});
      const actionDetails = this.getActionDetails(player, this);
      this.howToAffordReds = RedsPolicy.canAffordRedsPolicy(player, player.game, actionDetails);

      if (this.howToAffordReds.mustSpendAtMost !== undefined || this.howToAffordReds.bonusMCFromPlay !== undefined) {
        this.reserveUnits = Units.maybeAdjustReservedMegacredits(player, this.reserveUnits, this.howToAffordReds);
      }

      return this.howToAffordReds.canAfford;
    }

    this.howToAffordReds = undefined;
    const canUseSpireScience = player.isCorporation(CardName.SPIRE);

    return player.canAfford(this.cost - super.discount(player), {spireScience: canUseSpireScience});
  }

  actionEssence(player: Player): void {
    player.game.defer(new PlaceGreeneryTile(player, 'Select space for greenery'));
  }

  public getActionDetails(player: Player, card: IProjectCard) {
    return new ActionDetails({
      card: card,
      oxygenIncrease: 1,
      nonOceanToPlace: TileType.GREENERY,
      nonOceanAvailableSpaces: player.game.board.getAvailableSpacesForGreenery(player),
    });
  }
}
