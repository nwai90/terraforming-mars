import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Game, GameOptions} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';
import {Tags} from '../../../src/cards/Tags';
import {WildlifeSponsors} from '../../../src/cards/community/preludes/WildlifeSponsors';
import {Resources} from '../../../src/Resources';

describe('WildlifeSponsors', function() {
  let card : WildlifeSponsors; let player : Player;

  beforeEach(() => {
    card = new WildlifeSponsors();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions() as GameOptions;
    Game.newInstance('foobar', [player, redPlayer], player, gameOptions);
  });

  it('Should play', function() {
    card.play(player);

    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(3);
    expect(player.cardsInHand).has.lengthOf(2);

    player.cardsInHand.forEach((card) => expect(card.tags.includes(Tags.ANIMAL) || WildlifeSponsors.animalCards.has(card.name)));
  });
});
