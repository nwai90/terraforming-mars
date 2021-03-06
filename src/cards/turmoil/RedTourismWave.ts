import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {PartyName} from '../../turmoil/parties/PartyName';
import {Resources} from '../../Resources';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';
import {Card} from '../Card';
import {SOCIETY_ADDITIONAL_CARD_COST} from '../../constants';
import {TurmoilHandler} from '../../turmoil/TurmoilHandler';

export class RedTourismWave extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 3,
      tags: [Tags.EARTH],
      name: CardName.RED_TOURISM_WAVE,
      cardType: CardType.EVENT,

      requirements: CardRequirements.builder((b) => b.party(PartyName.REDS)),
      metadata: {
        cardNumber: 'T12',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(1).slash().emptyTile('normal', Size.SMALL).asterix();
        }),
        description: 'Requires that Reds are ruling or that you have 2 delegates there. Gain 1 M€ from each EMPTY AREA ADJACENT TO YOUR TILES',
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
    const amount = RedTourismWave.getAdjacentEmptySpacesCount(player);
    player.addResource(Resources.MEGACREDITS, amount);
    TurmoilHandler.handleSocietyPayment(player, PartyName.REDS);
    return undefined;
  }

  public static getAdjacentEmptySpacesCount(player: Player) {
    const board = player.game.board;
    return board.getEmptySpaces().filter((space) => board.getAdjacentSpaces(space).some((adj) => adj.tile !== undefined && adj.player === player)).length;
  }
}
