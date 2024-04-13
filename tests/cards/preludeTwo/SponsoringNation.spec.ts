import {expect} from 'chai';
import {SponsoringNation} from '../../../src/cards/preludeTwo/SponsoringNation';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {SelectPartyToSendDelegate} from '../../../src/inputs/SelectPartyToSendDelegate';
import {PartyHooks} from '../../../src/turmoil/parties/PartyHooks';
import {Phase} from '../../../src/Phase';
import {LunaGovernor} from '../../../src/cards/colonies/LunaGovernor';

describe('SponsoringNation', function() {
  let card : SponsoringNation; let player : Player; let game : Game; let turmoil: Turmoil;

  beforeEach(() => {
    card = new SponsoringNation();
    player = TestPlayers.BLUE.newPlayer();
    
    const gameOptions = TestingUtils.setCustomGameOptions({turmoilExtension: true});
    game = Game.newInstance('foobar', [player], player, gameOptions);
    game.phase = Phase.ACTION;
    turmoil = Turmoil.getTurmoil(game);

    player.playedCards.push(new LunaGovernor(), new LunaGovernor());
  });

  it('canPlay: Reds costs', function() {
    const reds = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.rulingParty = reds;
    turmoil.setRulingParty(game);

    expect(PartyHooks.shouldApplyPolicy(player, PartyName.REDS)).is.true;

    player.megaCredits = 29; // 21 + 8
    expect(card.canPlay(player)).is.false;

    player.megaCredits = 30; // 21 + 9
    expect(card.canPlay(player)).is.true;
  });

  it('canPlay: delegates', function() {
    turmoil.delegateReserve = [];
    expect(card.canPlay(player)).is.false;
  });

  it('Play', function() {
    card.play(player);
    expect(player.getTerraformRating()).eq(17);

    while (game.deferredActions.length) {
      const selectParty = game.deferredActions.pop()!.execute() as SelectPartyToSendDelegate;
      if (selectParty !== undefined) {
        selectParty.cb(PartyName.MARS);
      }
    }

    const marsFirst = turmoil.getPartyByName(PartyName.MARS)!;
    expect(marsFirst.delegates.filter((d) => d === player.id)).has.lengthOf(2);
  });
});
