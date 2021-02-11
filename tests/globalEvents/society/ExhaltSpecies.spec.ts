import {expect} from 'chai';
import {ExhaltSpecies} from '../../../src/turmoil/globalEvents/society/ExhaltSpecies';
import {Game} from '../../../src/Game';
import {Turmoil} from '../../../src/turmoil/Turmoil';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {TestPlayers} from '../../TestingUtils';
import {SmallAnimals} from '../../../src/cards/base/SmallAnimals';
import {ICard} from '../../../src/cards/ICard';
import {SelectCard} from '../../../src/inputs/SelectCard';

describe('ExhaltSpecies', function() {
  it('resolve play', function() {
    const card = new ExhaltSpecies();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const turmoil = Turmoil.newInstance(game);

    turmoil.dominantParty = turmoil.getPartyByName(PartyName.REDS)!;
    turmoil.dominantParty.partyLeader = player.id;
    turmoil.dominantParty.delegates.push(player.id);
    const smallAnimals = new SmallAnimals();
    player.playedCards.push(smallAnimals);

    card.resolve(game, turmoil);
    expect(player.megaCredits).to.eq(2);
    expect(game.deferredActions).has.lengthOf(1);

    game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    expect(player.getResourcesOnCard(smallAnimals)).to.eq(1);
  });
});