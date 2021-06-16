import {expect} from 'chai';
import {MarsCoalition} from '../../../src/cards/community/corporations/MarsCoalition';
import {SendDelegateToArea} from '../../../src/deferredActions/SendDelegateToArea';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {Greens} from '../../../src/turmoil/parties/Greens';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';

describe('MarsCoalition', function() {
  let card : MarsCoalition; let player : Player; let game: Game;

  beforeEach(() => {
    card = new MarsCoalition();
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions();
    game = Game.newInstance('foobar', [player], player, gameOptions);

    card.play();
    player.corporationCard = card;
    player.megaCredits = 10;
  });

  it('Can act', function() {
    expect(card.canAct(player)).is.true;
    
    card.action(player);
    expect(game.deferredActions).has.lengthOf(1);

    const marsFirst = game.turmoil!.getPartyByName(PartyName.MARS)!;
    const action = player.game.deferredActions.pop() as SendDelegateToArea;

    const options = action.execute();
    options.cb(marsFirst.name);    
    expect(marsFirst.getDelegates(player.id)).eq(1);
  });

  it('Can use dominant party ruling policy if different from ruling party', function() {
    const turmoil = game.turmoil!;

    // Make Greens ruling, and Scientists dominant
    // Send 3 delegates to override any existing party that might get 2 delegates during setup
    turmoil.rulingParty = new Greens();
    turmoil.setRulingParty(game);

    const scientists = turmoil.getPartyByName(PartyName.SCIENTISTS)!;
    turmoil.sendDelegateToParty(player.id, scientists.name, game);
    turmoil.sendDelegateToParty(player.id, scientists.name, game);
    turmoil.sendDelegateToParty(player.id, scientists.name, game);

    const scientistsActionTitle = 'Pay 10 M€ to draw 3 cards (Turmoil Scientists)';
    const availableActions = player.getActions();
    expect(availableActions.options.find((action) => action.title === scientistsActionTitle)).is.not.undefined;
  });
});
