import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {PartyName} from '../../turmoil/parties/PartyName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {SOCIETY_ADDITIONAL_CARD_COST} from '../../constants';
import {TurmoilHandler} from '../../turmoil/TurmoilHandler';

export class DiasporaMovement extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.DIASPORA_MOVEMENT,
      tags: [Tags.JOVIAN],
      cost: 7,

      requirements: CardRequirements.builder((b) => b.party(PartyName.REDS)),
      metadata: {
        cardNumber: 'TO4',
        description: 'Requires that Reds are ruling or that you have 2 delegates there. Gain 1M€ for each Jovian tag in play, including this.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(1).slash().jovian().played.any;
        }),
        victoryPoints: 1,
      },
    });
  }

  public canPlay(player: Player): boolean {
    const turmoil = player.game.turmoil;
    if (turmoil !== undefined) {
      if (turmoil.parties.find((p) => p.name === PartyName.REDS)) {
        return turmoil.canPlay(player, PartyName.REDS);
      }
      return player.canAfford(player.getCardCost(this) + SOCIETY_ADDITIONAL_CARD_COST);
    }
    return false;
  }

  public play(player: Player) {
    const amount = player.game.getPlayers()
      .map((p) => p.getTagCount(Tags.JOVIAN, false, p.id === player.id ? true : false))
      .reduce((a, c) => a + c);
    player.addResource(Resources.MEGACREDITS, amount + 1);
    TurmoilHandler.handleSocietyPayment(player, PartyName.REDS);
    return undefined;
  }

  public getVictoryPoints() {
    return 1;
  }
}
