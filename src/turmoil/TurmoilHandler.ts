import {IProjectCard} from '../cards/IProjectCard';
import {SOCIETY_ADDITIONAL_CARD_COST} from '../constants';
import {SelectHowToPayDeferred} from '../deferredActions/SelectHowToPayDeferred';
import {GlobalParameter} from '../GlobalParameter';
import {SelectOption} from '../inputs/SelectOption';
import {Player} from '../Player';
import {PlayerInput} from '../PlayerInput';
import {Resources} from '../Resources';
import {SpaceType} from '../SpaceType';
import {GlobalEventDealer} from './globalEvents/GlobalEventDealer';
import {BUREAUCRATS_DEFAULT_POLICY} from './parties/Bureaucrats';
import {CENTRISTS_DEFAULT_POLICY, CENTRISTS_POLICY_3} from './parties/Centrists';
import {EMPOWER_DEFAULT_POLICY, EMPOWER_POLICY_2} from './parties/Empower';
import {GREENS_POLICY_2, GREENS_POLICY_3, GREENS_POLICY_4} from './parties/Greens';
import {KELVINISTS_DEFAULT_POLICY, KELVINISTS_POLICY_3, KELVINISTS_POLICY_4} from './parties/Kelvinists';
import {MARS_FIRST_POLICY_2, MARS_FIRST_POLICY_4} from './parties/MarsFirst';
import {PartyHooks} from './parties/PartyHooks';
import {PartyName} from './parties/PartyName';
import {POPULISTS_POLICY_2, POPULISTS_POLICY_3, POPULISTS_POLICY_4} from './parties/Populists';
import {REDS_POLICY_2, REDS_POLICY_3} from './parties/Reds';
import {SCIENTISTS_DEFAULT_POLICY} from './parties/Scientists';
import {SPOME_POLICY_2, SPOME_POLICY_3, SPOME_POLICY_4} from './parties/Spome';
import {TRANSHUMANS_POLICY_2, TRANSHUMANS_POLICY_3} from './parties/Transhumans';
import {UNITY_POLICY_2, UNITY_POLICY_3} from './parties/Unity';
import {Turmoil} from './Turmoil';
import {TurmoilPolicy} from './TurmoilPolicy';

export class TurmoilHandler {
  private constructor() {}

  public static addPlayerAction(player: Player, options: PlayerInput[]): void {
    // Turmoil Scientists action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.SCIENTISTS)) {
      const scientistsPolicy = SCIENTISTS_DEFAULT_POLICY;

      if (scientistsPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            scientistsPolicy.description,
            'Pay',
            () => scientistsPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Kelvinists action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.KELVINISTS)) {
      const kelvinistsPolicy = KELVINISTS_DEFAULT_POLICY;

      if (kelvinistsPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            kelvinistsPolicy.description,
            'Pay',
            () => kelvinistsPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Kelvinists action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.KELVINISTS, 'kp03')) {
      const kelvinistsPolicy = KELVINISTS_POLICY_3;

      if (kelvinistsPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            kelvinistsPolicy.description,
            'Pay',
            () => kelvinistsPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Greens action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.GREENS, TurmoilPolicy.GREENS_POLICY_4)) {
      const greensPolicy = GREENS_POLICY_4;

      if (greensPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            greensPolicy.description,
            'Pay',
            () => greensPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Mars First action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.MARS, TurmoilPolicy.MARS_FIRST_POLICY_4)) {
      const marsFirstPolicy = MARS_FIRST_POLICY_4;

      if (marsFirstPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            marsFirstPolicy.description,
            'Pay',
            () => marsFirstPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Unity action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.UNITY, TurmoilPolicy.UNITY_POLICY_2)) {
      const unityPolicy = UNITY_POLICY_2;

      if (unityPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            unityPolicy.description,
            'Pay',
            () => unityPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Unity action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.UNITY, TurmoilPolicy.UNITY_POLICY_3)) {
      const unityPolicy = UNITY_POLICY_3;

      if (unityPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            unityPolicy.description,
            'Pay',
            () => unityPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Reds action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS, TurmoilPolicy.REDS_POLICY_3)) {
      const redsPolicy = REDS_POLICY_3;

      if (redsPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            redsPolicy.description,
            'Pay',
            () => redsPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Spome action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.SPOME, TurmoilPolicy.SPOME_POLICY_2)) {
        const spomePolicy = SPOME_POLICY_2;
  
        if (spomePolicy.canAct(player)) {
          options.push(
            new SelectOption(
              spomePolicy.description,
              'Pay',
              () => spomePolicy.action(player),
            ),
          );
        }
      }

    // Turmoil Spome action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.SPOME, TurmoilPolicy.SPOME_POLICY_4)) {
      const spomePolicy = SPOME_POLICY_4;

      if (spomePolicy.canAct(player)) {
        options.push(
          new SelectOption(
            spomePolicy.description,
            'Pay',
            () => spomePolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Empower action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.EMPOWER, TurmoilPolicy.EMPOWER_DEFAULT_POLICY)) {
      const empowerPolicy = EMPOWER_DEFAULT_POLICY;

      if (empowerPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            empowerPolicy.description,
            'Pay',
            () => empowerPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Bureaucrats action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.BUREAUCRATS, TurmoilPolicy.BUREAUCRATS_DEFAULT_POLICY)) {
      const bureaucratsPolicy = BUREAUCRATS_DEFAULT_POLICY;

      if (bureaucratsPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            bureaucratsPolicy.description,
            'Send delegate',
            () => bureaucratsPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Populists action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.POPULISTS, TurmoilPolicy.POPULISTS_POLICY_3)) {
      const populistsPolicy = POPULISTS_POLICY_3;

      if (populistsPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            populistsPolicy.description,
            'Select',
            () => populistsPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Transhumans action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.TRANSHUMANS, TurmoilPolicy.TRANSHUMANS_POLICY_2)) {
      const transhumansPolicy = TRANSHUMANS_POLICY_2;

      if (transhumansPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            transhumansPolicy.description,
            'Pay',
            () => transhumansPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Transhumans action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.TRANSHUMANS, TurmoilPolicy.TRANSHUMANS_POLICY_3)) {
      const transhumansPolicy = TRANSHUMANS_POLICY_3;

      if (transhumansPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            transhumansPolicy.description,
            'Pay',
            () => transhumansPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Centrists action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.CENTRISTS, TurmoilPolicy.CENTRISTS_DEFAULT_POLICY)) {
      const centristsPolicy = CENTRISTS_DEFAULT_POLICY;

      if (centristsPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            centristsPolicy.description,
            'Select',
            () => centristsPolicy.action(player),
          ),
        );
      }
    }

    // Turmoil Centrists action
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.CENTRISTS, TurmoilPolicy.CENTRISTS_POLICY_3)) {
      const centristsPolicy = CENTRISTS_POLICY_3;

      if (centristsPolicy.canAct(player)) {
        options.push(
          new SelectOption(
            centristsPolicy.description,
            'Select',
            () => centristsPolicy.action(player),
          ),
        );
      }
    }
  }

  public static applyOnCardPlayedEffect(player: Player, selectedCard: IProjectCard): void {
    // PoliticalAgendas Greens P3 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.GREENS, TurmoilPolicy.GREENS_POLICY_3)) {
      const policy = GREENS_POLICY_3;
      policy.onCardPlayed(player, selectedCard);
    }

    // PoliticalAgendas MarsFirst P2 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.MARS, TurmoilPolicy.MARS_FIRST_POLICY_2)) {
      const policy = MARS_FIRST_POLICY_2;
      policy.onCardPlayed(player, selectedCard);
    }

    // PoliticalAgendas Populists P2 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.POPULISTS, TurmoilPolicy.POPULISTS_POLICY_2)) {
      const policy = POPULISTS_POLICY_2;
      policy.onCardPlayed(player, selectedCard);
    }
  }

  public static resolveTilePlacementCosts(player: Player): void {
    // PoliticalAgendas Reds P2 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS, TurmoilPolicy.REDS_POLICY_2)) {
      const redsPolicy = REDS_POLICY_2;
      redsPolicy.onTilePlaced(player);
    }

    // PoliticalAgendas Spome P3 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.SPOME, TurmoilPolicy.SPOME_POLICY_3)) {
      const spomePolicy = SPOME_POLICY_3;
      spomePolicy.onTilePlaced(player);
    }
  }

  public static resolveTilePlacementBonuses(player: Player, spaceType: SpaceType): void {
    PartyHooks.applyMarsFirstRulingPolicy(player, spaceType);

    // PoliticalAgendas Greens P2 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.GREENS, TurmoilPolicy.GREENS_POLICY_2)) {
      const greensPolicy = GREENS_POLICY_2;
      greensPolicy.onTilePlaced(player);
    }

    // PoliticalAgendas Kelvinists P4 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.KELVINISTS, TurmoilPolicy.KELVINISTS_POLICY_4)) {
      const kelvinistsPolicy = KELVINISTS_POLICY_4;
      kelvinistsPolicy.onTilePlaced(player);
    }

    // PoliticalAgendas Empower P2 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.EMPOWER, TurmoilPolicy.EMPOWER_POLICY_2)) {
      const empowerPolicy = EMPOWER_POLICY_2;
      empowerPolicy.onTilePlaced(player);
    }

    // PoliticalAgendas Populists P4 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.POPULISTS, TurmoilPolicy.POPULISTS_POLICY_4)) {
      const populistsPolicy = POPULISTS_POLICY_4;
      populistsPolicy.onTilePlaced(player);
    }
  }

  public static onGlobalParameterIncrease(player: Player, parameter: GlobalParameter, steps: number = 1): void {
    if (parameter === GlobalParameter.TEMPERATURE) {
      // PoliticalAgendas Kelvinists P2 hook
      if (PartyHooks.shouldApplyPolicy(player.game, PartyName.KELVINISTS, TurmoilPolicy.KELVINISTS_POLICY_2)) {
        player.setResource(Resources.MEGACREDITS, steps * 3);
      }
    }

    // PoliticalAgendas Reds P4 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS, TurmoilPolicy.REDS_POLICY_4)) {
      player.addProduction(Resources.MEGACREDITS, -1 * steps);
    }

    // PoliticalAgendas Scientists P3 hook
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.SCIENTISTS, TurmoilPolicy.SCIENTISTS_POLICY_3)) {
      player.drawCard(steps);
    }

    // PoliticalAgendas Spome P1 hook
    if (parameter === GlobalParameter.VENUS) {
      if (PartyHooks.shouldApplyPolicy(player.game, PartyName.SPOME, TurmoilPolicy.SPOME_DEFAULT_POLICY)) {
        player.setResource(Resources.MEGACREDITS, steps * 2);
      }
    }
  }

  public static handleSocietyPayment(player: Player, partyName: PartyName): void {
    const turmoil = player.game.turmoil;

    if (turmoil !== undefined && turmoil.parties.find((p) => p.name === partyName) === undefined) {
      player.game.defer(new SelectHowToPayDeferred(player, SOCIETY_ADDITIONAL_CARD_COST, {title: 'Society: Select how to pay for card'}));
    }
  }

  public static randomizeGlobalEventDelegates(turmoil: Turmoil, dealer: GlobalEventDealer): void {
    const topDelegates = turmoil.parties.map((party) => party.name).reduce((a, i) => a.concat(Array(10).fill(i)), [] as PartyName[]);
    const bottomDelegates = turmoil.parties.map((party) => party.name).reduce((a, i) => a.concat(Array(10).fill(i)), [] as PartyName[]);
    
    dealer.globalEventsDeck.forEach((event) => {
      event.currentDelegate = topDelegates.splice(Math.floor(Math.random() * topDelegates.length), 1)[0];
      event.revealedDelegate = bottomDelegates.splice(Math.floor(Math.random() * bottomDelegates.length), 1)[0];
    });
  }
}
