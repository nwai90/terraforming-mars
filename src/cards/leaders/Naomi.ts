import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ColonyModel} from '../../models/ColonyModel';
import {ColonyName} from '../../colonies/ColonyName';
import {SelectColony} from '../../inputs/SelectColony';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {MAX_COLONY_TRACK_POSITION} from '../../constants';

export class Naomi extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.NAOMI,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L14',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('MAX').colonies(1).asterix();
        }),
        description: 'Once per game, raise any colony tile track marker to its max value.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    if (player.game.gameOptions.coloniesExtension === false) return false;

    const openColonies = player.game.colonies.filter((colony) => colony.isActive && colony.visitor === undefined);
    return openColonies.length > 0 && this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    const game = player.game;
    const openColonies = game.colonies.filter((colony) => colony.isActive && colony.visitor === undefined);
    const coloniesModel: Array<ColonyModel> = game.getColoniesModel(openColonies);

    game.defer(new DeferredAction(player, () => new SelectColony('Select colony tile to raise track to max value', 'Select', coloniesModel, (colonyName: ColonyName) => {
      openColonies.forEach((colony) => {
        if (colony.name === colonyName) {
          colony.trackPosition = MAX_COLONY_TRACK_POSITION;
          this.isDisabled = true;
          return undefined;
        }
        return undefined;
      });
      return undefined;
    })));

    return undefined;
  }
}
