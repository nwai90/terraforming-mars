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
import {MARS_FIRST_DEFAULT_POLICY, MARS_FIRST_POLICY_2} from '../../../turmoil/parties/MarsFirst';
import {GREENS_POLICY_2, GREENS_POLICY_3} from '../../../turmoil/parties/Greens';
import {KELVINISTS_POLICY_4} from '../../../turmoil/parties/Kelvinists';
import {EMPOWER_POLICY_2} from '../../../turmoil/parties/Empower';
import {POPULISTS_POLICY_4} from '../../../turmoil/parties/Populists';
import {IProjectCard} from '../../IProjectCard';
import {SelectOption} from '../../../inputs/SelectOption';
import {PlayerInput} from '../../../PlayerInput';
import {DiscardCards} from '../../../deferredActions/DiscardCards';
import {GlobalParameter} from '../../../GlobalParameter';
import {Resources} from '../../../Resources';
import {SendDelegateToArea} from '../../../deferredActions/SendDelegateToArea';
import {Size} from '../../render/Size';
import {Game} from '../../../Game';
import {IParty} from '../../../turmoil/parties/IParty';
import {PolicyId} from '../../../turmoil/Policy';
import {Tags} from '../../Tags';
import {TurmoilActionCard} from '../../TurmoilActionCard';
import {KelvinistsDefaultAction} from '../../turmoil/standardActions/KelvinistsDefaultAction';
import {ScientistsDefaultAction} from '../../turmoil/standardActions/ScientistsDefaultAction';
import {KelvinistsPolicy3Action} from '../../turmoil/standardActions/KelvinistsPolicy3Action';
import {GreensPolicy4Action} from '../../turmoil/standardActions/GreensPolicy4Action';
import {MarsFirstPolicy4Action} from '../../turmoil/standardActions/MarsFirstPolicy4Action';
import {UnityPolicy2Action} from '../../turmoil/standardActions/UnityPolicy2Action';
import {UnityPolicy3Action} from '../../turmoil/standardActions/UnityPolicy3Action';
import {RedsPolicy3Action} from '../../turmoil/standardActions/RedsPolicy3Action';
import {SpomePolicy2Action} from '../../turmoil/standardActions/SpomePolicy2Action';
import {SpomePolicy4Action} from '../../turmoil/standardActions/SpomePolicy4Action';
import {EmpowerDefaultAction} from '../../turmoil/standardActions/EmpowerDefaultAction';
import {BureaucratsDefaultAction} from '../../turmoil/standardActions/BureaucratsDefaultAction';
import {BureaucratsPolicy3Action} from '../../turmoil/standardActions/BureaucratsPolicy3Action';
import {PopulistsPolicy3Action} from '../../turmoil/standardActions/PopulistsPolicy3Action';
import {TranshumansPolicy2Action} from '../../turmoil/standardActions/TranshumansPolicy2Action';
import {TranshumansPolicy3Action} from '../../turmoil/standardActions/TranshumansPolicy3Action';
import {CentristsDefaultAction} from '../../turmoil/standardActions/CentristsDefaultAction';
import {CentristsPolicy3Action} from '../../turmoil/standardActions/CentristsPolicy3Action';

export class MarsCoalition extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.MARS_COALITION,
      startingMegaCredits: 40,

      metadata: {
        cardNumber: 'R53',
        description: 'You start with 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(40);
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
    if (!cardOwner.isCorporation(CardName.MARS_COALITION)) return;

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
    if (!player.isCorporation(this.name)) return;
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

  /* Most methods below are modified copies of existing logic in core files. It's fine to isolate them here
  for now since they behave quite differently to check dominant party instead of ruling party and apply resets */
  private static getDominantPartyPolicyId(activePlayer: Player) : string | undefined {
    const turmoil = activePlayer.game.turmoil as Turmoil;
    const staticAgendas = turmoil.politicalAgendasData.staticAgendas as Map<PartyName, Agenda>;
    const dominantParty = turmoil.dominantParty;

    if (dominantParty.name === turmoil.rulingParty.name) return undefined;
    return staticAgendas.get(dominantParty.name)!.policyId;
  }

  public static addPlayerAction(player: Player, turmoilActions: TurmoilActionCard[]): void {
    if (!player.isCorporation(CardName.MARS_COALITION)) return;
    const dominantPartyPolicy = this.getDominantPartyPolicyId(player);

    switch (dominantPartyPolicy) {
      case TurmoilPolicy.SCIENTISTS_DEFAULT_POLICY:
        turmoilActions.push(new ScientistsDefaultAction());
        break;
      case TurmoilPolicy.KELVINISTS_DEFAULT_POLICY:
        turmoilActions.push(new KelvinistsDefaultAction());
        break;
      case TurmoilPolicy.KELVINISTS_POLICY_3:
        turmoilActions.push(new KelvinistsPolicy3Action());
        break;
      case TurmoilPolicy.GREENS_POLICY_4:
        turmoilActions.push(new GreensPolicy4Action());
        break;
      case TurmoilPolicy.MARS_FIRST_POLICY_4:
        turmoilActions.push(new MarsFirstPolicy4Action());
        break;
      case TurmoilPolicy.UNITY_POLICY_2:
        turmoilActions.push(new UnityPolicy2Action());
        break;
      case TurmoilPolicy.UNITY_POLICY_3:
        turmoilActions.push(new UnityPolicy3Action());
        break;
      case TurmoilPolicy.REDS_POLICY_3:
        turmoilActions.push(new RedsPolicy3Action());
        break;
      case TurmoilPolicy.SPOME_POLICY_2:
        turmoilActions.push(new SpomePolicy2Action());
        break;
      case TurmoilPolicy.SPOME_POLICY_4:
        turmoilActions.push(new SpomePolicy4Action());
        break;
      case TurmoilPolicy.EMPOWER_DEFAULT_POLICY:
        turmoilActions.push(new EmpowerDefaultAction());
        break;
      case TurmoilPolicy.BUREAUCRATS_DEFAULT_POLICY:
        turmoilActions.push(new BureaucratsDefaultAction());
        break;
      case TurmoilPolicy.BUREAUCRATS_POLICY_3:
        turmoilActions.push(new BureaucratsPolicy3Action());
        break;
      case TurmoilPolicy.POPULISTS_POLICY_3:
        turmoilActions.push(new PopulistsPolicy3Action());
        break;
      case TurmoilPolicy.TRANSHUMANS_POLICY_2:
        turmoilActions.push(new TranshumansPolicy2Action());
        break;
      case TurmoilPolicy.TRANSHUMANS_POLICY_3:
        turmoilActions.push(new TranshumansPolicy3Action());
        break;
      case TurmoilPolicy.CENTRISTS_DEFAULT_POLICY:
        turmoilActions.push(new CentristsDefaultAction());
        break;
      case TurmoilPolicy.CENTRISTS_POLICY_3:
        turmoilActions.push(new CentristsPolicy3Action());
        break;
      default:
        break;
    }
  }

  public static addPartyActionToActionsList(player: Player, policy: any, options: PlayerInput[], title: string = 'Pay'): void {
    if (policy.canAct(player, true)) {
      options.push(
        new SelectOption(
          policy.description,
          title,
          () => policy.action(player, true),
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

  public static applyDominantPartyPolicy(game: Game, previousDominantParty: IParty): void {
    const marsCoalitionPlayer = game.getPlayers().find((player) => player.isCorporation(CardName.MARS_COALITION));
    if (marsCoalitionPlayer === undefined) return;

    // Reset count only if the dominant party switched
    const turmoil = game.turmoil as Turmoil;
    const currentDominantParty = turmoil.dominantParty as IParty;
    if (previousDominantParty.name !== currentDominantParty.name) marsCoalitionPlayer.dominantPartyActionUsedCount = 0;

    const currentRulingParty = turmoil.rulingParty as IParty;
    const staticAgendas = turmoil.politicalAgendasData.staticAgendas as Map<PartyName, Agenda>;
    const currentRulingPolicy = staticAgendas.get(currentRulingParty.name)!.policyId;

    const dominantPartyPolicy = MarsCoalition.getDominantPartyPolicyId(marsCoalitionPlayer);

    switch (dominantPartyPolicy) {
      case TurmoilPolicy.SCIENTISTS_POLICY_4:
        marsCoalitionPlayer.hasTurmoilScienceTagBonus = true;
        break;
      case TurmoilPolicy.TRANSHUMANS_POLICY_4:
        marsCoalitionPlayer.hasTranshumansColonyTradeOffset = true;
        break;
      default:
        // Reset properties whenever dominant party changes during the generation
        if (currentRulingPolicy !== TurmoilPolicy.SCIENTISTS_POLICY_4) marsCoalitionPlayer.hasTurmoilScienceTagBonus = false;
        if (currentRulingPolicy !== TurmoilPolicy.TRANSHUMANS_POLICY_4) marsCoalitionPlayer.hasTranshumansColonyTradeOffset = false;
        break;
    }
  }

  public static handleSingleUsePolicyLogic(player: Player, isDominantPartyAction: boolean) {
    if (isDominantPartyAction) {
      player.dominantPartyActionUsedCount += 1;
    } else {
      player.turmoilPolicyActionUsed = true;
    }
  }

  public static handleTripleUsePolicyLogic(player: Player, isDominantPartyAction: boolean) {
    if (isDominantPartyAction) {
      player.dominantPartyActionUsedCount += 1;
    } else {
      player.politicalAgendasActionUsedCount += 1;
    }
  }

  public static shouldIncreaseMetalValue(player: Player, partyName: PartyName.MARS | PartyName.UNITY, policyId?: PolicyId): boolean {
    if (!player.isCorporation(CardName.MARS_COALITION)) return false;

    const game = player.game;
    if (!game.gameOptions.turmoilExtension) return false;
    if (game.phase !== Phase.ACTION) return false;

    const turmoil = game.turmoil;
    if (turmoil === undefined) return false;

    const dominantParty = turmoil.dominantParty;
    if (dominantParty === undefined) return false;

    // Set the default policy if not given
    if (policyId === undefined) policyId = dominantParty.policies[0].id;
    let currentPolicyId: PolicyId;

    if (turmoil.politicalAgendasData === undefined) {
      currentPolicyId = dominantParty.policies[0].id;
    } else if (partyName === PartyName.MARS) {
      currentPolicyId = turmoil.politicalAgendasData.staticAgendas?.get(PartyName.MARS)?.policyId as PolicyId;
    } else {
      // partyName === PartyName.UNITY
      currentPolicyId = turmoil.politicalAgendasData.staticAgendas?.get(PartyName.UNITY)?.policyId as PolicyId;
    }

    return dominantParty.name === partyName && currentPolicyId === policyId;
  }

  public static applyDominantPartyCardDiscounts(player: Player, card: IProjectCard, cost: number): number {
    if (!player.isCorporation(CardName.MARS_COALITION)) return cost;
    const dominantPartyPolicy = this.getDominantPartyPolicyId(player);

    if (card.tags.includes(Tags.SPACE) && dominantPartyPolicy === TurmoilPolicy.UNITY_POLICY_4) {
      // PoliticalAgendas Unity P4 hook
      cost -= 2;
    } else if (card.tags.includes(Tags.ENERGY) && dominantPartyPolicy === TurmoilPolicy.EMPOWER_POLICY_4) {
      // PoliticalAgendas Empower P4 hook
      cost -= 3;
    } else if (card.tags.includes(Tags.EARTH) && dominantPartyPolicy === TurmoilPolicy.BUREAUCRATS_POLICY_4) {
      // PoliticalAgendas Bureaucrats P4 hook
      const earthTagCount = card.tags.filter((tag) => tag === Tags.EARTH).length;
      cost -= earthTagCount * 3;
    } else if (card.cardType === CardType.EVENT && dominantPartyPolicy === TurmoilPolicy.CENTRISTS_POLICY_4) {
      // PoliticalAgendas Centrists P4 hook
      cost -= 2;
    }

    return cost;
  }

  public static getRequirementsBonus(player: Player, requirementsBonus: number): number {
    if (!player.isCorporation(CardName.MARS_COALITION)) return requirementsBonus;
    const dominantPartyPolicy = this.getDominantPartyPolicyId(player);

    // PoliticalAgendas Scientists P2 hook
    if (dominantPartyPolicy === TurmoilPolicy.SCIENTISTS_POLICY_2) requirementsBonus += 2;

    // PoliticalAgendas Transhumans P3 hook
    if (dominantPartyPolicy === TurmoilPolicy.TRANSHUMANS_POLICY_3 && player.turmoilPolicyActionUsed === true) {
      requirementsBonus += 50;
    }

    return requirementsBonus;
  }

  public static checkBonusWildTag(player: Player, tag: Tags, tagCount: number): number {
    if (!player.isCorporation(CardName.MARS_COALITION)) return tagCount;
    const dominantPartyPolicy = this.getDominantPartyPolicyId(player);

    // PoliticalAgendas Transhumans P1 hook
    if (tag === Tags.WILDCARD && dominantPartyPolicy === TurmoilPolicy.TRANSHUMANS_DEFAULT_POLICY) {
      tagCount += 1;
    }

    return tagCount;
  }
}
