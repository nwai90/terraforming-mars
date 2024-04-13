import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../CardRequirements';
import {PartyName} from '../../turmoil/parties/PartyName';
import {Turmoil} from '../../turmoil/Turmoil';
import {SendDelegateToArea} from '../../deferredActions/SendDelegateToArea';
import {SOCIETY_ADDITIONAL_CARD_COST} from '../../constants';

export class ColonialEnvoys extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.COLONIAL_ENVOYS,
      cost: 4,
      requirements: CardRequirements.builder((b) => b.party(PartyName.UNITY)),

      metadata: {
        cardNumber: '??',
        description: 'Requires that Unity are ruling or that you have 2 delegates there. Place 1 delegate for each colony you own. YOU MAY PLACE THEM IN DIFFERENT PARTIES.',
        renderData: CardRenderer.builder((b) => {
          b.delegates(1).asterix().slash().colonies(1);
        }),
      },
    });
  }

  // Avoid checking super.canPlay(player) here due to Society's alternate rule for parties not in game
  public canPlay(player: Player): boolean {
    const turmoil = Turmoil.getTurmoil(player.game);
    const coloniesCount = player.getColoniesCount();
    const hasEnoughDelegates = turmoil.getDelegatesInReserve(player.id) >= coloniesCount || (turmoil.getDelegatesInReserve(player.id) >= coloniesCount - 1 && turmoil.lobby.has(player.id));

    // Player must be able to place all delegates equal to their number of colonies built
    if (!hasEnoughDelegates) return false;

    if (turmoil.parties.find((p) => p.name === PartyName.UNITY)) {
      return turmoil.canPlay(player, PartyName.UNITY);
    }

    return player.canAfford(player.getCardCost(this) + SOCIETY_ADDITIONAL_CARD_COST);
  }

  public play(player: Player) {
    const coloniesCount = player.getColoniesCount();
    const turmoil = Turmoil.getTurmoil(player.game);

    for (let i = 0; i < coloniesCount; i++) {
      const reserveDelegateCount = turmoil.getDelegatesInReserve(player.id);
      const source = reserveDelegateCount > 0 ? 'reserve' : 'lobby';
      player.game.defer(new SendDelegateToArea(player, 'Select where to send delegate', {source: source}));
    }

    return undefined;
  }
}
