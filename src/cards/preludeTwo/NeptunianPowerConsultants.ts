import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {ResourceType} from '../../ResourceType';
import {Tags} from '../Tags';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {TileType} from '../../TileType';
import {ISpace} from '../../boards/ISpace';
import {DeferredAction, Priority} from '../../deferredActions/DeferredAction';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Size} from '../render/Size';

export class NeptunianPowerConsultants extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.NEPTUNIAN_POWER_CONSULTANTS,
      tags: [Tags.ENERGY],
      cost: 14,
      resourceType: ResourceType.HYDROELECTRIC,

      metadata: {
        cardNumber: '??',
        renderData: CardRenderer.builder((b) => {
          b.effect('When any ocean tile is placed, you MAY pay 5 M€ (steel may be used) to increase your energy production 1 step and add 1 hydroelectric resource here.', (eb) => {
            eb.oceans(1, Size.SMALL).any.startEffect.megacredits(-5).steel(1).brackets.production((pb) => pb.energy(1)).hydroelectric(1);
          }).br;
          b.vpText('1 VP per hydroelectric resource here.');
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.hydroelectric(1, 1),
      },
    });
  }

  public resourceCount = 0;

  public play() {
    return undefined;
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (cardOwner.hasConceded) return;

    cardOwner.game.defer(new DeferredAction(cardOwner, () => {
      // We need to explicitly specify plants: false to avoid including Martian Lumber Corp plants
      // in the computation, as player.canAfford knows nothing about the source card
      if (!cardOwner.canAfford(5, {steel: true, plants: false})) return;

      if (space.tile?.tileType === TileType.OCEAN) {
        cardOwner.game.defer(
          new DeferredAction(cardOwner, () => {
            return new OrOptions(
              new SelectOption('Pay 5 M€ to increase energy production 1 step and gain 1 hydroelectric resource', 'Confirm', () => {
                if (!cardOwner.canAfford(5, {steel: true, plants: false})) return undefined;

                cardOwner.game.defer(new SelectHowToPayDeferred(cardOwner, 5, {canUseSteel: true, title: 'Select how to pay for action'}));
                cardOwner.addProduction(Resources.ENERGY, 1);
                cardOwner.addResourceTo(this, {qty: 1, log: true});
                return undefined;
              }),
              new SelectOption('Do nothing', 'Confirm', () => {
                return undefined;
              }),
            );
          }),
          cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
        );
      }

      return undefined;
    }));
  }

  public getVictoryPoints(): number {
    return this.resourceCount;
  }
}
