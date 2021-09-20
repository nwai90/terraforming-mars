import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {SelectOption} from '../../inputs/SelectOption';
import {OrOptions} from '../../inputs/OrOptions';
import {Size} from '../render/Size';

export class Tate extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.TATE,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L20',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('5', Size.LARGE).cards(1).secondaryTag(Tags.WILDCARD).asterix();
          b.br.br;
        }),
        description: 'Once per game, name a tag. Reveal cards from the deck until you find 5 cards with that tag. Buy up to 2 cards and discard the rest.',
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
    const game = player.game;
    const tags = [
        Tags.BUILDING, Tags.CITY, Tags.EARTH, Tags.ENERGY, Tags.JOVIAN,
        Tags.MICROBE, Tags.PLANT, Tags.SCIENCE, Tags.SPACE, Tags.ANIMAL,
    ];

    if (game.gameOptions.venusNextExtension) tags.push(Tags.VENUS);
    if (game.gameOptions.moonExpansion) tags.push(Tags.MOON);

    const options = tags.map((tag) => {
      return new SelectOption('Search for ' + tag + ' tags', 'Search', () => {
        return player.drawCardKeepSome(5, {keepMax: 2, tag: tag, paying: true, logDrawnCard: true});
      });
    });

    game.defer(new DeferredAction(player, () => new OrOptions(...options)));

    this.isDisabled = true;
    return undefined;
  }
}
