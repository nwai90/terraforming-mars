import {IProjectCard} from '../IProjectCard';
import {IActionCard, IResourceCard} from '../ICard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {ResourceType} from '../../ResourceType';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {SelectOption} from '../../inputs/SelectOption';
import {OrOptions} from '../../inputs/OrOptions';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {LogHelper} from '../../LogHelper';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {CardRenderer} from '../render/CardRenderer';
import {HowToAffordRedsPolicy, ActionDetails, RedsPolicy} from '../../turmoil/RedsPolicy';
import {Units} from '../../Units';
import {PlaceOceanTile} from '../../deferredActions/PlaceOceanTile';

export class IcyImpactors extends Card implements IActionCard, IProjectCard, IResourceCard {
  public howToAffordReds: HowToAffordRedsPolicy | undefined;

  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.ICY_IMPACTORS,
      tags: [Tags.SPACE],
      cost: 15,
      resourceType: ResourceType.ASTEROID,

      metadata: {
        cardNumber: 'X47',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.megacredits(10).titanium(1).brackets.startAction.asteroids(2);
          }).br;
          b.action('Spend 10 M€ (titanium may be used) to add 2 asteroids here, or spend 1 asteroid here to place an ocean tile. FIRST PLAYER CHOOSES WHERE YOU MUST PLACE IT.', (eb) => {
            eb.or().asteroids(1).startAction.oceans(1).asterix();
          });
        }),
      },
    });
  }

  public resourceCount = 0;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    const canSpendResource = this.resourceCount > 0;
    const canPayForAsteroids = player.canAfford(10, {titanium: true});

    const oceansMaxed = player.game.noOceansAvailable();
    const trGain = oceansMaxed ? 0 : 1;
    const redsAreRuling = PartyHooks.shouldApplyPolicy(player, PartyName.REDS);

    if (this.resourceCount >= 1) Card.setRedsActionWarningText(player, trGain, this, redsAreRuling, 'place an ocean');

    if (oceansMaxed) {
      Card.setUselessActionWarningText(this, 'oceans are already maxed');
    }

    if (canPayForAsteroids) return true;
    if (!canSpendResource) return false;
    if (canSpendResource && oceansMaxed) return true;

    if (redsAreRuling) {
      this.reserveUnits = Units.adjustUnits(this.reserveUnits, {megacredits: trGain * REDS_RULING_POLICY_COST});
      const actionDetails = this.getActionDetails();
      this.howToAffordReds = RedsPolicy.canAffordRedsPolicy(player, player.game, actionDetails);

      if (this.howToAffordReds.mustSpendAtMost !== undefined || this.howToAffordReds.bonusMCFromPlay !== undefined) {
        this.reserveUnits = Units.maybeAdjustReservedMegacredits(player, this.reserveUnits, this.howToAffordReds);
      }

      return this.howToAffordReds.canAfford;
    }

    return true;
  }

  public action(player: Player) {
    const opts: Array<SelectOption> = [];

    const addResources = new SelectOption(
      'Pay 10 M€ to add 2 asteroids here', 'Pay', () => {
        this.addResources(player);
        return undefined;
      }
    );

    const spendResource = new SelectOption(
      'Remove 1 asteroid: First player chooses where you place an ocean', 'Remove asteroid', () => {
        this.spendResource(player);
        return undefined;
      }
    );

    const redsAreRuling = PartyHooks.shouldApplyPolicy(player, PartyName.REDS);
    const oceansMaxed = player.game.noOceansAvailable();

    // This line is needed if the action places or could potentially place a tile
    if (this.howToAffordReds !== undefined) player.howToAffordReds = this.howToAffordReds;

    if (this.resourceCount > 0) {
      if (!redsAreRuling || oceansMaxed || (redsAreRuling && player.canAfford(this.reserveUnits.megacredits))) {
        opts.push(spendResource);
      }
    } else {
      return this.addResources(player);
    }

    if (player.canAfford(10, {titanium: true})) {
      opts.push(addResources);
    } else {
      return this.spendResource(player);
    }

    return new OrOptions(...opts);
  }

  private addResources(player: Player) {
    player.game.defer(new SelectHowToPayDeferred(player, 10, {canUseTitanium: true, title: 'Select how to pay for Icy Impactors action'}));
    player.addResourceTo(this, {qty: 2, log: true});
    return undefined;
  }

  private spendResource(player: Player) {
    this.resourceCount--;
    LogHelper.logRemoveResource(player, this, 1, 'place an ocean');

    const firstPlayer = player.game.getPlayers()[0];
    player.game.defer(new PlaceOceanTile(firstPlayer, 'Select space for ocean tile', player));
    return undefined;
  }

  public getActionDetails() {
    return new ActionDetails({oceansToPlace: 1});
  }
}
