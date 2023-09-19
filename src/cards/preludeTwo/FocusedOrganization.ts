import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {PreludeCard} from '../prelude/PreludeCard';
import {Tags} from '../Tags';
import {AppliedScience} from './AppliedScience';
import {DiscardCards} from '../../deferredActions/DiscardCards';
import {OrOptions} from '../../inputs/OrOptions';
import {Resources} from '../../Resources';
import {SelectOption} from '../../inputs/SelectOption';
import {DeferredAction, Priority} from '../../deferredActions/DeferredAction';
import {DrawCards} from '../../deferredActions/DrawCards';

export class FocusedOrganization extends PreludeCard {
  constructor() {
    super({
      name: CardName.FOCUSED_ORGANIZATION,
      tags: [Tags.SPACE],
      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.cards(1).wild(1);
          b.preludeBox('action', (ce) => {
            ce.vSpace();
            ce.action('Discard 1 card and spend 1 standard resource to draw 1 card and gain 1 standard resource.', (eb) => {
              eb.minus().cards(1).wild(1).startAction.cards(1).wild(1);
            });
          });
        }),
        description: 'Draw 1 card and gain 1 standard resource.',
      },
    });
  }

  public play(player: Player) {
    player.drawCard();
    return AppliedScience.gainStandardResourceOptions(player);
  }

  public canAct(player: Player) {
    if (player.cardsInHand.length === 0) return false;
    if (player.megaCredits > 0) return true;
    if (player.steel > 0) return true;
    if (player.titanium > 0) return true;
    if (player.plants > 0) return true;
    if (player.energy > 0) return true;
    if (player.heat > 0) return true;

    return false;
  }

  public action(player: Player) {
    player.game.defer(new DiscardCards(player), Priority.SPONSORED_ACADEMIES);

    player.game.defer(new DeferredAction(player, () => {
      return this.spendStandardResourceOptions(player);
    }), Priority.SPONSORED_ACADEMIES);

    player.game.defer(DrawCards.keepAll(player));

    player.game.defer(new DeferredAction(player, () => {
      return AppliedScience.gainStandardResourceOptions(player);
    }));

    return undefined;
  }

  private spendStandardResourceOptions(player: Player) {
    const orOptions = new OrOptions();

    if (player.megaCredits > 0) {
      orOptions.options.push(new SelectOption('Spend 1 M€', 'Spend M€', () => {
        player.deductResource(Resources.MEGACREDITS, 1, {log: true});
        return undefined;
      }));
    }

    if (player.steel > 0) {
      orOptions.options.push(new SelectOption('Spend 1 steel', 'Spend steel', () => {
        player.deductResource(Resources.STEEL, 1, {log: true});
        return undefined;
      }));
    }

    if (player.titanium > 0) {
      orOptions.options.push(new SelectOption('Spend 1 titanium', 'Spend titanium', () => {
        player.deductResource(Resources.TITANIUM, 1, {log: true});
        return undefined;
      }));
    }

    if (player.plants > 0) {
      orOptions.options.push(new SelectOption('Spend 1 plant', 'Spend plant', () => {
        player.deductResource(Resources.PLANTS, 1, {log: true});
        return undefined;
      }));
    }

    if (player.energy > 0) {
      orOptions.options.push(new SelectOption('Spend 1 energy', 'Spend energy', () => {
        player.deductResource(Resources.ENERGY, 1, {log: true});
        return undefined;
      }));
    }

    if (player.heat > 0) {
      orOptions.options.push(new SelectOption('Spend 1 heat', 'Spend heat', () => {
        player.deductResource(Resources.HEAT, 1, {log: true});
        return undefined;
      }));
    }

    return orOptions;
  }
}

