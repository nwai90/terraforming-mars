import {expect} from 'chai';
import {Ants} from '../../../src/cards/base/Ants';
import {Decomposers} from '../../../src/cards/base/Decomposers';
import {SoilEnrichment} from '../../../src/cards/promo/SoilEnrichment';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('SoilEnrichment', function() {
  let card : SoilEnrichment; let player : Player;

  beforeEach(() => {
    card = new SoilEnrichment();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
  });

  it('Adds microbes automatically if only 1 target', function() {
    const ants = new Ants();
    ants.resourceCount = 1;
    player.playedCards.push(ants);

    card.play(player);
    expect(player.plants).eq(5);
    expect(player.getResourcesOnCard(ants)).eq(0);
  });

  it('Can select target if have multiple cards with microbes', function() {
    const ants = new Ants();
    const decomposers = new Decomposers();
    ants.resourceCount = 1;
    decomposers.resourceCount = 1;
    player.playedCards.push(ants, decomposers);

    const action = card.play(player);
    action!.cb([decomposers]);
    expect(player.getResourcesOnCard(ants)).eq(1);
    expect(player.getResourcesOnCard(decomposers)).eq(0);
    expect(player.plants).eq(5);
  });
});
