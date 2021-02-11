import {expect} from 'chai';
import {MetaSpirituality} from '../../../src/turmoil/globalEvents/society/MetaSpirituality';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {DustSeals} from '../../../src/cards/base/DustSeals';
import {MicroMills} from '../../../src/cards/base/MicroMills';
import {Hackers} from '../../../src/cards/base/Hackers';
import {RadSuits} from '../../../src/cards/base/RadSuits';
import {AndOptions} from '../../../src/inputs/AndOptions';
import {SelectAmount} from '../../../src/inputs/SelectAmount';

describe('MetaSpirituality', function() {
  it('resolve play', function() {
    const card = new MetaSpirituality();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    turmoil.dominantParty.delegates.push(player.id);
    player.playedCards.push(new DustSeals(), new MicroMills(), new RadSuits(), new Hackers());

    card.resolve(game, turmoil);
    const action = game.deferredActions.pop()!.execute()! as AndOptions;

    action.options.forEach((option) => {
      expect(option instanceof SelectAmount).is.true;
      expect((option as SelectAmount).min).to.eq(1);
    })
    action.cb();
    expect(player.megaCredits).to.eq(1);
    expect(player.steel).to.eq(1);
    expect(player.titanium).to.eq(1);
    expect(player.plants).to.eq(1);
    expect(player.energy).to.eq(1);
    expect(player.heat).to.eq(1);
  });
});