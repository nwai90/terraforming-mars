import {expect} from 'chai';
import {SolarLogistics} from '../../../src/cards/preludeTwo/SolarLogistics';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';
import {Game} from '../../../src/Game';
import {Birds} from '../../../src/cards/base/Birds';
import {LunaGovernor} from '../../../src/cards/colonies/LunaGovernor';
import {TechnologyDemonstration} from '../../../src/cards/base/TechnologyDemonstration';
import {BribedCommittee} from '../../../src/cards/base/BribedCommittee';
import {Asteroid} from '../../../src/cards/base/Asteroid';

describe('SolarLogistics', function() {
  let card : SolarLogistics; let player : Player; let player2 : Player;

  beforeEach(() => {
    card = new SolarLogistics();
    
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
  });

  it('Play', function() {
    card.play(player);
    expect(player.titanium).eq(2);
  });

  it('Card discount', function() {
    expect(card.getCardDiscount(player, card)).eq(2);
    expect(card.getCardDiscount(player, new Birds())).eq(0);
    expect(card.getCardDiscount(player, new LunaGovernor())).eq(4);
  });

  it('Effect', function() {
    player.playedCards.push(card);

    card.onCardPlayed(player2, new TechnologyDemonstration());
    expect(player.cardsInHand).has.length(1);

    card.onCardPlayed(player2, new BribedCommittee());
    expect(player.cardsInHand).has.length(1);

    card.onCardPlayed(player, new Asteroid());
    expect(player.cardsInHand).has.length(2);
  });

  it('Gives VP', function() {
    expect(card.getVictoryPoints()).eq(1);
  });
});
