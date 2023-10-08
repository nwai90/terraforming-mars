import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';
import {Tags} from '../Tags';
import {Size} from '../render/Size';
import {MAX_OCEAN_TILES, MAX_OXYGEN_LEVEL, MAX_TEMPERATURE, MAX_VENUS_SCALE} from '../../constants';

export class FloydContinuum extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.FLOYD_CONTINUUM,
      tags: [Tags.SCIENCE],
      cost: 4,

      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.action('Gain 3 M€ for each completed terraforming parameter.', (eb) => {
            eb.empty().startAction.megacredits(3).slash().oceans(1, Size.SMALL).oxygen(1, Size.SMALL).temperature(1, Size.SMALL).asterix();
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct() {
    return true;
  }

  public action(player: Player) {
    const game = player.game;
    let amount: number = 0;

    if (game.getTemperature() === MAX_TEMPERATURE) amount += 3;
    if (game.getOxygenLevel() === MAX_OXYGEN_LEVEL) amount += 3;
    if (game.board.getOceansOnBoard() === MAX_OCEAN_TILES) amount += 3;

    const requiresVenus = game.gameOptions.venusNextExtension && (game.gameOptions.requiresVenusTrackCompletion || (game.isSoloMode() && !game.gameOptions.soloTR));
    if (requiresVenus && game.getVenusScaleLevel() === MAX_VENUS_SCALE) amount += 3;

    player.addResource(Resources.MEGACREDITS, amount, {log: true});

    return undefined;
  }
}
