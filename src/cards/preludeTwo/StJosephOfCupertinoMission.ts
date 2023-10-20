import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Board} from '../../boards/Board';
import {ISpace} from '../../boards/ISpace';
import {SelectSpace} from '../../inputs/SelectSpace';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {LogHelper} from '../../LogHelper';
import {DeferredAction, Priority} from '../../deferredActions/DeferredAction';
import {CuriosityII} from '../community/corporations/CuriosityII';
import {SpaceType} from '../../SpaceType';

export class StJosephOfCupertinoMission extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.ST_JOSEPH_OF_CUPERTINO_MISSION,
      cost: 7,

      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 5 M€ (steel may be used) to place a Cathedral on a city tile. Max 1 per city. THE CITY OWNER MAY PAY 2 M€ TO DRAW A CARD.', (eb) => {
            eb.megacredits(5).steel(1).brackets.startAction.cathedrals(1).asterix();
          });
          b.br.br;
          b.vpText('1 VP per Cathedral in play.');
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.cathedrals(1, 1),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(player: Player) {
    const eligibleCitySpaces = this.getEligibleCitySpaces(player.game.board);
    return player.canAfford(5, {steel: true, plants: false}) && eligibleCitySpaces.length > 0;
  }

  public action(player: Player) {
    const game = player.game;
    const eligibleCitySpaces = this.getEligibleCitySpaces(game.board);

    game.defer(new SelectHowToPayDeferred(player, 5, {canUseSteel: true, title: 'Select how to pay for action', afterPay: () => {
      game.defer(new DeferredAction(player, () => {
        return new SelectSpace('Select city space to build a Cathedral', eligibleCitySpaces, (foundSpace: ISpace) => {
          if (foundSpace.spaceType === SpaceType.COLONY) {
            game.log('${0} built an off-world Cathedral', (b) => b.player(player));
          } else {
            LogHelper.logBoardTileAction(player, foundSpace, 'a Cathedral', 'built');
          }

          foundSpace.hasCathedral = true;

          const cityOwner = foundSpace.player!;
          if (cityOwner.hasConceded) return undefined;

          game.defer(new DeferredAction(cityOwner, () => CuriosityII.payToDrawCard(cityOwner)), Priority.PAY_TO_DRAW_CARDS);
          return undefined;
        });
      }));
    }}));

    return undefined;
  }

  private getEligibleCitySpaces(board: Board) {
    return board.spaces.filter((space) => Board.isCitySpace(space)).filter((space) => !space.hasCathedral);
  }

  public getVictoryPoints(player: Player): number {
    return player.game.board.spaces.filter((space) => space.hasCathedral).length;
  }
}
