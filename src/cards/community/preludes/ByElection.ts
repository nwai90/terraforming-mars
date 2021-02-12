import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {ALL_DEFAULT_PARTIES, ALL_SOCIETY_PARTIES} from '../../../turmoil/Turmoil';
import {SelectOption} from '../../../inputs/SelectOption';
import {OrOptions} from '../../../inputs/OrOptions';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRenderItemSize} from '../../render/CardRenderItemSize';
import {PoliticalAgendas} from '../../../turmoil/PoliticalAgendas';

export class ByElection extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.BY_ELECTION,
      tags: [Tags.WILDCARD],

      metadata: {
        cardNumber: 'Y02',
        renderData: CardRenderer.builder((b) => {
          b.text('set ruling party', CardRenderItemSize.SMALL, true).br;
          b.plus().influence(1);
        }),
        description: 'Set the ruling party to one of your choice. Gain 1 influence.',
      },
    });
  }
  public canPlay(player: Player) {
    return player.game.turmoil !== undefined;
  }
  public play(player: Player) {
    const turmoil = player.game.turmoil;
    if (turmoil === undefined) {
      return;
    }
    turmoil.addInfluenceBonus(player);
    const setRulingParty = new OrOptions();

    setRulingParty.title = 'Select new ruling party';
    let availableParties = ALL_DEFAULT_PARTIES;
    if (player.game.gameOptions.societyExpansion === true) availableParties = ALL_SOCIETY_PARTIES;

    setRulingParty.options = [...availableParties.map((p) => new SelectOption(
      p.partyName, 'Select', () => {
        turmoil.rulingParty = turmoil.getPartyByName(p.partyName);
        PoliticalAgendas.setNextAgenda(turmoil, player.game);

        return undefined;
      }),
    )];

    player.game.defer(new DeferredAction(
      player,
      () => setRulingParty,
    ));

    return undefined;
  }
}
