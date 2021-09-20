import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {ISpace} from '../../boards/ISpace';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {Phase} from '../../Phase';
import {Player} from '../../Player';
import {SpaceType} from '../../SpaceType';
import {DiscardCards} from '../../deferredActions/DiscardCards';

export class Ingrid extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.INGRID,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L09',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
          b.br.br;
          b.emptyTile('normal').asterix().nbsp.colon().nbsp.plus().cards(1).minus().cards(1);
          b.br;
        }),
        description: 'When you take an action that places a tile on Mars this generation, draw and discard a card.',
      },
    });
  }

  public isDisabled = false;
  public opgActionIsActive = false;

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return this.isDisabled === false;
  }

  public action(): PlayerInput | undefined {
    this.opgActionIsActive = true;
    this.isDisabled = true;
    return undefined;
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (this.opgActionIsActive === false) return;
    if (cardOwner.id !== activePlayer.id) return;
    if (cardOwner.game.phase === Phase.SOLAR) return;
    if (space.spaceType === SpaceType.COLONY) return;

    cardOwner.game.defer(new DeferredAction(cardOwner, () => cardOwner.drawCard()));
    cardOwner.game.defer(new DiscardCards(cardOwner));
  }
}
