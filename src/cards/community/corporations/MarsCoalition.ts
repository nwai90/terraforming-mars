import {CorporationCard} from '../../corporation/CorporationCard';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {Agenda} from '../../../turmoil/PoliticalAgendas';
import {TurmoilPolicy} from '../../../turmoil/TurmoilPolicy';
import {Phase} from '../../../Phase';
import {Player} from '../../../Player';
import {ISpace} from '../../../boards/ISpace';
import {Turmoil} from '../../../turmoil/Turmoil';
import {MARS_FIRST_DEFAULT_POLICY, MARS_FIRST_POLICY_2, MARS_FIRST_POLICY_4} from '../../../turmoil/parties/MarsFirst';
import {GREENS_POLICY_2, GREENS_POLICY_3, GREENS_POLICY_4} from '../../../turmoil/parties/Greens';
import {KELVINISTS_DEFAULT_POLICY, KELVINISTS_POLICY_3, KELVINISTS_POLICY_4} from '../../../turmoil/parties/Kelvinists';
import {EMPOWER_DEFAULT_POLICY, EMPOWER_POLICY_2} from '../../../turmoil/parties/Empower';
import {POPULISTS_POLICY_3, POPULISTS_POLICY_4} from '../../../turmoil/parties/Populists';
import {IProjectCard} from '../../IProjectCard';
import {SelectOption} from '../../../inputs/SelectOption';
import {PlayerInput} from '../../../PlayerInput';
import {BUREAUCRATS_DEFAULT_POLICY} from '../../../turmoil/parties/Bureaucrats';
import {CENTRISTS_DEFAULT_POLICY, CENTRISTS_POLICY_3} from '../../../turmoil/parties/Centrists';
import {REDS_POLICY_3} from '../../../turmoil/parties/Reds';
import {SCIENTISTS_DEFAULT_POLICY} from '../../../turmoil/parties/Scientists';
import {SPOME_POLICY_2, SPOME_POLICY_4} from '../../../turmoil/parties/Spome';
import {TRANSHUMANS_POLICY_2, TRANSHUMANS_POLICY_3} from '../../../turmoil/parties/Transhumans';
import {UNITY_POLICY_2, UNITY_POLICY_3} from '../../../turmoil/parties/Unity';
import {DiscardCards} from '../../../deferredActions/DiscardCards';
import {GlobalParameter} from '../../../GlobalParameter';
import {Resources} from '../../../Resources';
import {SendDelegateToArea} from '../../../deferredActions/SendDelegateToArea';
import {Size} from '../../render/Size';

export class MarsCoalition extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.MARS_COALITION,
      startingMegaCredits: 35,

      metadata: {
        cardNumber: 'R53',
        description: 'You start with 35 M€.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(35);
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('You may use the dominant party’s ruling policy IF IT IS DIFFERENT from the current ruling party.', (eb) => {
              eb.startEffect.greyPlate('Dominant party');
            });
            ce.vSpace(Size.SMALL);
            ce.action('Place a delegate.', (eb) => {
              eb.empty().startAction.delegates(1);
            });
            ce.vSpace(Size.SMALL);
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.game.turmoil!.hasAvailableDelegates(player.id);
  }

  public action(player: Player) {
    player.game.defer(new SendDelegateToArea(player, 'Select where to send a delegate', {source: 'reserve'}));
    return undefined;
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (cardOwner.id !== activePlayer.id || cardOwner.game.phase === Phase.SOLAR) return;
    const dominantPartyPolicy = MarsCoalition.getDominantPartyPolicyId(activePlayer);

    switch (dominantPartyPolicy) {
      case TurmoilPolicy.MARS_FIRST_DEFAULT_POLICY:
        MARS_FIRST_DEFAULT_POLICY.onTilePlaced(cardOwner, space);
        break;
      case TurmoilPolicy.GREENS_POLICY_2:
        GREENS_POLICY_2.onTilePlaced(cardOwner);
        break;
      case TurmoilPolicy.KELVINISTS_POLICY_4:
        KELVINISTS_POLICY_4.onTilePlaced(cardOwner);
        break;
      case TurmoilPolicy.EMPOWER_POLICY_2:
        EMPOWER_POLICY_2.onTilePlaced(cardOwner);
        break;
      case TurmoilPolicy.POPULISTS_POLICY_4:
        POPULISTS_POLICY_4.onTilePlaced(cardOwner);
        break;
      default:
        break;
    }
  }

  public onCardPlayed(player: Player, card: IProjectCard): void {
    if (!player.isCorporation(CardName.MARS_COALITION)) return;
    const dominantPartyPolicy = MarsCoalition.getDominantPartyPolicyId(player);

    switch (dominantPartyPolicy) {
      case TurmoilPolicy.GREENS_POLICY_3:
        GREENS_POLICY_3.onCardPlayed(player, card);
        break;
      case TurmoilPolicy.MARS_FIRST_POLICY_2:
        MARS_FIRST_POLICY_2.onCardPlayed(player, card);
        break;
      default:
        break;
    }
  }

  private static getDominantPartyPolicyId(activePlayer: Player) : string | undefined {
    const turmoil = activePlayer.game.turmoil as Turmoil;
    const staticAgendas = turmoil.politicalAgendasData.staticAgendas as Map<PartyName, Agenda>;
    const dominantParty = turmoil.dominantParty;

    if (dominantParty.name === turmoil.rulingParty.name) return undefined;
    return staticAgendas.get(dominantParty.name)!.policyId;
  }

  public static addPlayerAction(player: Player, options: PlayerInput[]): void {
    if (!player.isCorporation(CardName.MARS_COALITION)) return;
    const dominantPartyPolicy = this.getDominantPartyPolicyId(player);

    switch (dominantPartyPolicy) {
      case TurmoilPolicy.SCIENTISTS_DEFAULT_POLICY:
        this.addPartyActionToActionsList(player, SCIENTISTS_DEFAULT_POLICY, options);
        break;
      case TurmoilPolicy.KELVINISTS_DEFAULT_POLICY:
        this.addPartyActionToActionsList(player, KELVINISTS_DEFAULT_POLICY, options);
        break;
      case TurmoilPolicy.KELVINISTS_POLICY_3:
        this.addPartyActionToActionsList(player, KELVINISTS_POLICY_3, options);
        break;
      case TurmoilPolicy.GREENS_POLICY_4:
        this.addPartyActionToActionsList(player, GREENS_POLICY_4, options);
        break;
      case TurmoilPolicy.MARS_FIRST_POLICY_4:
        this.addPartyActionToActionsList(player, MARS_FIRST_POLICY_4, options);
        break;
      case TurmoilPolicy.UNITY_POLICY_2:
        this.addPartyActionToActionsList(player, UNITY_POLICY_2, options);
        break;
      case TurmoilPolicy.UNITY_POLICY_3:
        this.addPartyActionToActionsList(player, UNITY_POLICY_3, options);
        break;
      case TurmoilPolicy.REDS_POLICY_3:
        this.addPartyActionToActionsList(player, REDS_POLICY_3, options);
        break;
      case TurmoilPolicy.SPOME_POLICY_2:
        this.addPartyActionToActionsList(player, SPOME_POLICY_2, options);
        break;
      case TurmoilPolicy.SPOME_POLICY_4:
        this.addPartyActionToActionsList(player, SPOME_POLICY_4, options);
        break;
      case TurmoilPolicy.EMPOWER_DEFAULT_POLICY:
        this.addPartyActionToActionsList(player, EMPOWER_DEFAULT_POLICY, options);
        break;
      case TurmoilPolicy.BUREAUCRATS_DEFAULT_POLICY:
        this.addPartyActionToActionsList(player, BUREAUCRATS_DEFAULT_POLICY, options);
        break;
      case TurmoilPolicy.POPULISTS_POLICY_3:
        this.addPartyActionToActionsList(player, POPULISTS_POLICY_3, options);
        break;
      case TurmoilPolicy.TRANSHUMANS_POLICY_2:
        this.addPartyActionToActionsList(player, TRANSHUMANS_POLICY_2, options);
        break;
      case TurmoilPolicy.TRANSHUMANS_POLICY_3:
        this.addPartyActionToActionsList(player, TRANSHUMANS_POLICY_3, options);
        break;
      case TurmoilPolicy.CENTRISTS_DEFAULT_POLICY:
        this.addPartyActionToActionsList(player, CENTRISTS_DEFAULT_POLICY, options);
        break;
      case TurmoilPolicy.CENTRISTS_POLICY_3:
        this.addPartyActionToActionsList(player, CENTRISTS_POLICY_3, options);
        break;  
      default:
        break;
    }
  }

  public static addPartyActionToActionsList(player: Player, policy: any, options: PlayerInput[], title: string = 'Pay'): void {
    if (policy.canAct(player)) {
      options.push(
        new SelectOption(
          policy.description,
          title,
          () => policy.action(player),
        ),
      );
    }
  }

  public static onGlobalParameterIncrease(player: Player, parameter: GlobalParameter, steps: number = 1): void {
    if (!player.isCorporation(CardName.MARS_COALITION)) return;
    const dominantPartyPolicy = this.getDominantPartyPolicyId(player);

    switch (dominantPartyPolicy) {
      case TurmoilPolicy.KELVINISTS_POLICY_2:
        if (parameter === GlobalParameter.TEMPERATURE) player.addResource(Resources.MEGACREDITS, steps * 3);
        break;
      case TurmoilPolicy.SCIENTISTS_POLICY_3:
        player.drawCard(steps);
        player.game.defer(new DiscardCards(player, steps, 'Turmoil Scientists - Select ' + steps + ' card(s) to discard'));
        break;
      case TurmoilPolicy.SPOME_DEFAULT_POLICY:
        if (parameter === GlobalParameter.VENUS) player.addResource(Resources.MEGACREDITS, steps * 2);
        break;
      default:
        break;
    }
  }
}
