import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {PreludeCard} from '../prelude/PreludeCard';
import {Tags} from '../Tags';
import {IProjectCard} from '../IProjectCard';
import {ResourceType} from '../../ResourceType';
import {OrOptions} from '../../inputs/OrOptions';
import {ICard, IResourceCard} from '../ICard';
import {SelectOption} from '../../inputs/SelectOption';
import {SelectCard} from '../../inputs/SelectCard';
import {LogHelper} from '../../LogHelper';
import {RobotCard} from '../promo/SelfReplicatingRobots';
import {Size} from '../render/Size';

export class AppliedScience extends PreludeCard implements IProjectCard, IResourceCard {
  constructor() {
    super({
      name: CardName.APPLIED_SCIENCE,
      tags: [Tags.WILDCARD],
      resourceType: ResourceType.SCIENCE,
      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.science(6);
          b.preludeBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.action('Remove 1 Science resource here to gain 1 standard resource or add 1 resource to ANY CARD WITH A RESOURCE.', (eb) => {
              eb.science(1).startAction.wild(1).asterix();
            });
            ce.vSpace();
          });
        }),
        description: 'Add 6 Science resources here.',
      },
    });
  }

  public resourceCount: number = 0;

  public canAct() {
    return this.resourceCount > 0;
  }

  public action(player: Player) {
    const orOptions = new OrOptions();

    orOptions.options.push(new SelectOption('Remove 1 Science resource to gain 1 standard resource', 'Select', () => {
      player.removeResourceFrom(this, 1);
      return AppliedScience.gainStandardResourceOptions(player);
    }));

    const cardsWithResources = player.getCardsWithResources().filter((c) => {
      if (c.name === this.name && c.resourceCount === 1) return false;
      return true;
    });

    const robotCards = player.getSelfReplicatingRobotsTargetCards();
    const targets = cardsWithResources.concat(robotCards.map((c) => c.card));

    if (targets.length > 0) {
      orOptions.options.push(new SelectOption('Remove 1 Science resource to add 1 resource to a card with at least 1 resource', 'Select', () => {
        player.removeResourceFrom(this, 1);

        if (targets.length === 1) {
          const robotCard: RobotCard | undefined = robotCards.find((c) => c.card.name === targets[0].name);

          if (robotCard) {
          robotCard.resourceCount++;
          LogHelper.logAddResource(player, robotCard.card);
          } else {
          player.addResourceTo(targets[0], {log: true});
          }

          return undefined;
        }

        return new SelectCard(
          'Select card to add 1 resource',
          'Add resource',
          cardsWithResources,
          (cards: Array<ICard>) => {
            const robotCard: RobotCard | undefined = robotCards.find((c) => c.card.name === cards[0].name);

            if (robotCard) {
            robotCard.resourceCount++;
            LogHelper.logAddResource(player, robotCard.card);
            } else {
            player.addResourceTo(cards[0], {log: true});
            }

            return undefined;
          },
        );
      }));
    }

    if (orOptions.options.length === 1) return orOptions.options[0].cb();
    return orOptions;
  }

  public play(player: Player) {
    player.addResourceTo(this, {qty: 6, log: true});
    return undefined;
  }

  public static gainStandardResourceOptions(player: Player) {
    return new OrOptions(
      new SelectOption('Gain 1 titanium', 'Gain titanium', () => {
        player.addResource(Resources.TITANIUM, 1, {log: true});
        return undefined;
      }),
      new SelectOption('Gain 1 steel', 'Gain steel', () => {
        player.addResource(Resources.STEEL, 1, {log: true});
        return undefined;
      }),
      new SelectOption('Gain 1 plant', 'Gain plant', () => {
        player.addResource(Resources.PLANTS, 1, {log: true});
        return undefined;
      }),
      new SelectOption('Gain 1 energy', 'Gain energy', () => {
        player.addResource(Resources.ENERGY, 1, {log: true});
        return undefined;
      }),
      new SelectOption('Gain 1 heat', 'Gain heat', () => {
        player.addResource(Resources.HEAT, 1, {log: true});
        return undefined;
      }),
      new SelectOption('Gain 1 M€', 'Gain M€', () => {
        player.addResource(Resources.MEGACREDITS, 1, {log: true});
        return undefined;
      }),
    );
  }
}

