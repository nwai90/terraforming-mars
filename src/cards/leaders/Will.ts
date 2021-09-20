import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {ResourceType} from '../../ResourceType';

export class Will extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.WILL,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L23',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('GAIN BELOW RESOURCES').br;
          b.animals(1).animals(1).microbes(1).microbes(1).br;
          b.science().floaters(1).asteroids(1).wild(1);
          b.br;
        }),
        description: 'Once per game, add the following resources to your cards: 2 animals, 2 microbes, 1 science, 1 floater, 1 asteroid, 1 wild.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(): boolean {
   return this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    player.game.defer(new AddResourcesToCard(player, ResourceType.ANIMAL, {count: 2}));
    player.game.defer(new AddResourcesToCard(player, ResourceType.MICROBE, {count: 2}));
    player.game.defer(new AddResourcesToCard(player, ResourceType.SCIENCE, {count: 1}));
    player.game.defer(new AddResourcesToCard(player, ResourceType.FLOATER, {count: 1}));
    player.game.defer(new AddResourcesToCard(player, ResourceType.ASTEROID, {count: 1}));
    player.game.defer(new AddResourcesToCard(player, undefined, {count: 1}));

    this.isDisabled = true;
    return undefined;
  }
}
