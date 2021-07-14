import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {PartyName} from '../../turmoil/parties/PartyName';
import {PlaceCityTile} from '../../deferredActions/PlaceCityTile';
import {SendDelegateToArea} from '../../deferredActions/SendDelegateToArea';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {SOCIETY_ADDITIONAL_CARD_COST} from '../../constants';
import {TurmoilHandler} from '../../turmoil/TurmoilHandler';
import {Turmoil} from '../../turmoil/Turmoil';
import {Units} from '../../Units';

export class CulturalMetropolis extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.CULTURAL_METROPOLIS,
      tags: [Tags.CITY, Tags.BUILDING],
      cost: 20,
      productionBox: Units.of({energy: -1, megacredits: 3}),

      requirements: CardRequirements.builder((b) => b.party(PartyName.UNITY)),
      metadata: {
        cardNumber: 'T03',
        description: 'Requires that Unity is ruling or that you have 2 delegates there. Decrease your energy production 1 step and increase your M€ production 3 steps. Place a city tile. Place 2 delegates in 1 party.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).br;
            pb.plus().megacredits(3);
          }).city().delegates(2);
        }),
      },
    });
  }

  // Avoid checking super.canPlay(player) here due to Society's alternate rule for parties not in game
  public canPlay(player: Player): boolean {
    if (player.getProduction(Resources.ENERGY) < 1) return false;

    const turmoil = Turmoil.getTurmoil(player.game);
    const hasEnoughDelegates = turmoil.getDelegatesInReserve(player.id) > 1 || (turmoil.getDelegatesInReserve(player.id) === 1 && turmoil.lobby.has(player.id));

    if (turmoil.parties.find((p) => p.name === PartyName.UNITY)) {
      return turmoil.canPlay(player, PartyName.UNITY) && hasEnoughDelegates;
    }

    return player.canAfford(player.getCardCost(this) + SOCIETY_ADDITIONAL_CARD_COST, {steel: true}) && hasEnoughDelegates;
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, -1);
    player.addProduction(Resources.MEGACREDITS, 3);
    player.game.defer(new PlaceCityTile(player));
    TurmoilHandler.handleSocietyPayment(player, PartyName.UNITY);

    const title = 'Select where to send two delegates';
    const turmoil = Turmoil.getTurmoil(player.game);

    if (turmoil.getDelegatesInReserve(player.id) > 1) {
      player.game.defer(new SendDelegateToArea(player, title, {count: 2, source: 'reserve'}));
    } else if (turmoil.getDelegatesInReserve(player.id) === 1 && turmoil.lobby.has(player.id)) {
      player.game.defer(new SendDelegateToArea(player, title, {count: 2, source: 'lobby'}));
    }
    return undefined;
  }
}
