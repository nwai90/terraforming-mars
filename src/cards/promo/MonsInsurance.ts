import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class MonsInsurance extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.MONS_INSURANCE,
      startingMegaCredits: 48,

      metadata: {
        cardNumber: 'R46',
        description: 'You start with 48 MC. Increase your M€ production 4 steps. ALL OPPONENTS DECREASE THEIR M€ production 2 STEPS. THIS DOES NOT TRIGGER THE EFFECT BELOW.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(48).production((pb) => {
            pb.megacredits(4).nbsp.megacredits(-2).any.asterix();
          });
          b.corpBox('effect', (cb) => {
            cb.vSpace(Size.SMALL);
            cb.effect('When a player causes another player to decrease production or lose resources, pay 3MC to the victim, or as much as possible.', (eb) => {
              eb.production((pb) => pb.wild(1).any).or().minus().wild(1).any;
              eb.startEffect.text('pay', Size.SMALL, true).megacredits(3);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 6);
    for (const p of player.game.getPlayers()) {
      p.addProduction(Resources.MEGACREDITS, -2);
    }
    player.game.monsInsuranceOwner = player.id;
    return undefined;
  }

  public static resolveMonsInsurance(victim: Player) {
    const game = victim.game;

    if (game.monsInsuranceOwner !== undefined && game.monsInsuranceOwner !== victim.id) {
      if (game.gameOptions.colosseumVariant === true) {
        game.getPlayers().filter((player) => player.id !== victim.id).forEach((player) => {
          this.payoutAndLogInsurance(player, victim);
        });
      } else {
        const monsInsuranceOwner: Player = game.getPlayerById(game.monsInsuranceOwner);
        this.payoutAndLogInsurance(monsInsuranceOwner, victim);
      }
    }
  }

  private static payoutAndLogInsurance(insurer: Player, victim: Player): void {
    const retribution: number = Math.min(insurer.megaCredits, 3);
    insurer.setResource(Resources.MEGACREDITS, -3);
    victim.setResource(Resources.MEGACREDITS, retribution);

    if (retribution > 0) {
      insurer.game.log('${0} received ${1} M€ from ${2} owner (${3})', (b) =>
        b.player(victim)
          .number(retribution)
          .cardName(CardName.MONS_INSURANCE)
          .player(insurer));
    }
  }
}
