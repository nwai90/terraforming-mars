
import {expect} from 'chai';
import {Diversifier} from '../../src/milestones/Diversifier';
import {ResearchNetwork} from '../../src/cards/prelude/ResearchNetwork';
import {TestPlayers} from '../TestPlayers';
import {Player} from '../../src/Player';
import {Leavitt} from '../../src/cards/community/colonies/Leavitt';
import {TestingUtils} from '../TestingUtils';
import {Game} from '../../src/Game';

describe('Diversifier', function() {
  let milestone : Diversifier; let player : Player; let player2 : Player;

  beforeEach(() => {
    milestone = new Diversifier();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
  });

  it('Counts wildcard tags as unique tags', function() {
    expect(milestone.canClaim(player)).is.not.true;

    for (let i = 0; i < 8; i++) {
      player.playedCards.push(new ResearchNetwork());
    }
    expect(milestone.canClaim(player)).is.true;
  });

  it('Counts Leavitt science tag placement bonus', function() {
    const gameOptions = TestingUtils.setCustomGameOptions({coloniesExtension: true});
    const game = Game.newInstance('foobar', [player, player2], player, gameOptions);
    const leavitt = new Leavitt();
    game.colonies = [leavitt];

    leavitt.addColony(player);
    expect(player.getDistinctTagCount(true)).to.eq(1);

    for (let i = 0; i < 7; i++) {
      player.playedCards.push(new ResearchNetwork());
    }
    expect(milestone.canClaim(player)).is.true;
  });
});
