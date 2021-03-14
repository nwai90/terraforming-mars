import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Game, GameOptions} from '../../../src/Game';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';
import {Tags} from '../../../src/cards/Tags';
import {NitrateReducers} from '../../../src/cards/community/preludes/NitrateReducers';
import {Resources} from '../../../src/Resources';

describe('NitrateReducers', function() {
  let card : NitrateReducers; let player : Player;

  beforeEach(function() {
    card = new NitrateReducers();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions() as GameOptions;
    Game.newInstance('foobar', [player, redPlayer], player, gameOptions);
  });

  it('Should play', function() {
    card.play(player);

    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(3);
    expect(player.cardsInHand).has.lengthOf(2);

    player.cardsInHand.forEach((card) => expect(card.tags.indexOf(Tags.MICROBE)).not.to.eq(-1));
  });
});
