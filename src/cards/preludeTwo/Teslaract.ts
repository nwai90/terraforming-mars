import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {Resources} from '../../Resources';
import {Units} from '../../Units';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {RedsPolicy, ActionDetails, HowToAffordRedsPolicy} from '../../turmoil/RedsPolicy';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';

export class Teslaract extends Card implements IProjectCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.TESLARACT,
      tags: [Tags.ENERGY, Tags.BUILDING],
      cost: 14,
      tr: {tr: 1},

      metadata: {
        cardNumber: '??',
        description: 'Raise your TR 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.action('Decrease your Energy production 1 step to increase your Plant production 1 step.', (eb) => {
            eb.production((pb) => pb.energy(1)).startAction.production((pb) => pb.plants(1));
          });
          b.br.br;
          b.tr(1);
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    const trGain = player.computeTerraformRatingBump(this);
    Card.setRedsWarningText(player, trGain, this);

    if (PartyHooks.shouldApplyPolicy(player, PartyName.REDS)) {
      this.reserveUnits = Units.adjustUnits(this.reserveUnits, {megacredits: trGain * REDS_RULING_POLICY_COST});
      const actionDetails = this.getActionDetails(player, this);
      this.howToAffordReds = RedsPolicy.canAffordRedsPolicy(player, player.game, actionDetails, true);

      if (this.howToAffordReds.mustSpendAtMost !== undefined || this.howToAffordReds.bonusMCFromPlay !== undefined) {
        this.reserveUnits = Units.maybeAdjustReservedMegacredits(player, this.reserveUnits, this.howToAffordReds);
      }

      return this.howToAffordReds.canAfford;
    }

    this.howToAffordReds = undefined;
    return true;
  }

  public play(player: Player) {
    player.increaseTerraformRatingSteps(1);
    return undefined;
  }

  public canAct(player: Player) {
    return player.getProduction(Resources.ENERGY) >= 1;
  }

  public action(player: Player) {
    player.addProduction(Resources.ENERGY, -1);
    player.addProduction(Resources.PLANTS, 1);
    return undefined;
  }

  public getActionDetails(_player: Player, card: IProjectCard) {
    return new ActionDetails({card: card, TRIncrease: 1});
  }
}
