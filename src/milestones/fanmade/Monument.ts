import {DeferredAction} from "../../deferredActions/DeferredAction";
import {DiscardCards} from "../../deferredActions/DiscardCards";
import {Player} from "../../Player";
import {IMilestone} from "../IMilestone";

export class Monument implements IMilestone {
  public name: string = 'Monument';
  public description: string = 'As an additional cost, discard 5 cards to claim this milestone';

  public getScore(player: Player): number {
    return player.cardsInHand.length;
  }

  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 5;
  }

  public static discardCards(player: Player): void {
    player.game.defer(new DiscardCards(player, 5));
    player.game.defer(new DeferredAction(player, () => {
      player.game.log('${0} discarded 5 cards', (b) => b.player(player));
      return undefined;
    }));
  }
}
