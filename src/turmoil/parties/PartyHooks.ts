import {Player} from '../../Player';
import {PartyName} from './PartyName';
import {Phase} from '../../Phase';
import {PolicyId} from '../Policy';
import {ISpace} from '../../boards/ISpace';
import {GREENS_DEFAULT_POLICY} from './Greens';
import {MARS_FIRST_DEFAULT_POLICY} from './MarsFirst';
import {TurmoilPolicy} from '../TurmoilPolicy';
import {Turmoil} from '../Turmoil';
import {CardName} from '../../CardName';

export class PartyHooks {
  static applyMarsFirstRulingPolicy(player: Player, space: ISpace) {
    if (this.shouldApplyPolicy(player, PartyName.MARS, TurmoilPolicy.MARS_FIRST_DEFAULT_POLICY)) {
      const marsFirstPolicy = MARS_FIRST_DEFAULT_POLICY;
      marsFirstPolicy.onTilePlaced(player, space);
    }
  }

  static applyGreensRulingPolicy(player: Player, space: ISpace) {
    if (this.shouldApplyPolicy(player, PartyName.GREENS, TurmoilPolicy.GREENS_DEFAULT_POLICY)) {
      const greensPolicy = GREENS_DEFAULT_POLICY;
      greensPolicy.onTilePlaced(player, space);
    }
  }

  // Return true when the supplied policy is active. When `policyId` is inactive, it selects
  // the default policy for `partyName`.
  static shouldApplyPolicy(player: Player, partyName: PartyName, policyId?: PolicyId): boolean {
    const game = player.game;

    return Turmoil.ifTurmoilElse(game, (turmoil) => {
      if (game.phase !== Phase.ACTION) return false;

      const rulingParty = turmoil.rulingParty;
      if (rulingParty === undefined) return false;

      // Set the default policy if not given
      if (policyId === undefined) {
        policyId = rulingParty.policies[0].id;
      }

      // Leader card effect
      if (player.cardIsInEffect(CardName.ZAN) && policyId === TurmoilPolicy.REDS_DEFAULT_POLICY) return false;

      const currentPolicyId: PolicyId = (turmoil.politicalAgendasData === undefined) ?
        rulingParty.policies[0].id :
        turmoil.politicalAgendasData.currentAgenda.policyId;

      return rulingParty.name === partyName && currentPolicyId === policyId;
    }, () => false);
  }
}
