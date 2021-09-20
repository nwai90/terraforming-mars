import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Colony} from '../../colonies/Colony';
import {ColonyModel} from '../../models/ColonyModel';
import {ColonyName} from '../../colonies/ColonyName';
import {SelectColony} from '../../inputs/SelectColony';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {Aridor} from '../colonies/Aridor';
import {ColonyDealer} from '../../colonies/ColonyDealer';

export class Maria extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.MARIA,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L13',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('X ').placeColony().colonies(1);
        }),
        description: 'Once per game, draw colony tiles equal to the current generation number. Put one into play and build a colony on it for free if possible.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    const game = player.game;
    if (game.colonyDealer === undefined || !game.gameOptions.coloniesExtension) return false;

    const discardedColonies = game.colonyDealer.discardedColonies;
    return discardedColonies.length > 0 && this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    const allDiscardedColonies: Colony[] = ColonyDealer.shuffle(player.game.colonyDealer!.discardedColonies);
    if (allDiscardedColonies.length === 0) return undefined;

    const game = player.game;
    const count = Math.min(allDiscardedColonies.length, player.game.generation);
    const availableColonies = allDiscardedColonies.slice(0, count);
    const coloniesModel: Array<ColonyModel> = game.getColoniesModel(availableColonies);

    return new SelectColony('Select colony tile to add', 'Add colony tile', coloniesModel, (colonyName: ColonyName) => {
      if (game.colonyDealer !== undefined) {
        availableColonies.forEach((colony) => {
          if (colony.name === colonyName) {
            game.colonies.push(colony);
            game.colonies.sort((a, b) => (a.name > b.name) ? 1 : -1);
            game.colonyDealer?.discardedColonies.splice(game.colonyDealer?.discardedColonies.indexOf(colony), 1);
            game.log('${0} added a new Colony tile: ${1}', (b) => b.player(player).colony(colony));

            game.defer(new DeferredAction(player, () => {
              Aridor.checkActivation(colony, game);
              if (colony.isActive) colony.addColony(player);
              this.isDisabled = true;
              return undefined;
            }));

            return undefined;
          }
          return undefined;
        });
        return undefined;
      } else {
        return undefined;
      };
    });
  }
}
