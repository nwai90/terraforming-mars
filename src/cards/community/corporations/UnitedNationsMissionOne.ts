import {CorporationCard} from '../../corporation/CorporationCard';
import {Tags} from '../../Tags';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {Game} from '../../../Game';
import {Player} from '../../../Player';
import {Phase} from '../../../Phase';

export class UnitedNationsMissionOne extends Card implements CorporationCard {
    constructor() {
      super({
        cardType: CardType.CORPORATION,
        name: CardName.UNITED_NATIONS_MISSION_ONE,
        tags: [Tags.EARTH],
        startingMegaCredits: 40, // 39 + 1 from start TR

        metadata: {
          cardNumber: 'R50',
          description: 'You start with 39 MC. Increase your TR 1 step.',
          renderData: CardRenderer.builder((b) => {
            b.br.br.br;
            b.megacredits(39).nbsp.tr(1);
            b.corpBox('effect', (ce) => {
              ce.vSpace();
              ce.effect('When any player takes an action or plays a card that increases TR, including this, gain 1 MC for each step.', (eb) => {
                eb.tr(1).any.startEffect.megacredits(1);
              });
            });
          }),
        },
      });
    }

    public play(player: Player) {
      player.game.unitedNationsMissionOneOwner = player.id;
      return undefined;
    }

    public static onTRIncrease(game: Game) {
      const playerId = game.unitedNationsMissionOneOwner;

      if (playerId !== undefined) {
        const player = game.getPlayerById(playerId);
        if (game.phase === Phase.ACTION || game.phase === Phase.PRELUDES) player.megaCredits += 1;
      }
    }
}
