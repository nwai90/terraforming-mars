import {expect} from 'chai';
import {AdaptedPathogens} from '../../../src/turmoil/globalEvents/society/AdaptedPathogens';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestPlayers';
import {Decomposers} from '../../../src/cards/base/Decomposers';
import {ICard} from '../../../src/cards/ICard';
import {SelectCard} from '../../../src/inputs/SelectCard';

describe('AdaptedPathogens', function() {
  it('resolve play', function() {
    const card = new AdaptedPathogens();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    const decomposers = new Decomposers();
    player.playedCards.push(decomposers);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(2);
    expect(game.deferredActions).has.lengthOf(1);

    game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    expect(player.getResourcesOnCard(decomposers)).to.eq(1);
  });
});