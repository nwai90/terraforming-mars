import {expect} from 'chai';
import {CoreMine} from '../../src/cards/moon/CoreMine';
import {ResearchNetwork} from '../../src/cards/prelude/ResearchNetwork';
import {Game} from '../../src/Game';
import {OneGiantStep} from '../../src/moon/OneGiantStep';
import {TestingUtils} from '../TestingUtils';
import {TestPlayer} from '../TestPlayer';
import {TestPlayers} from '../TestPlayers';

describe('OneGiantStep', () => {
  let milestone: OneGiantStep; let player: TestPlayer; let otherPlayer: TestPlayer;

  beforeEach(() => {
    milestone = new OneGiantStep();
    player = TestPlayers.BLUE.newPlayer();
    otherPlayer = TestPlayers.PINK.newPlayer();
    Game.newInstance('id', [player, otherPlayer], player, TestingUtils.setCustomGameOptions({moonExpansion: true}));
  });

  it('Standard test', () => {
    expect(milestone.canClaim(player)).is.not.true;
    player.playedCards = [
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
    ];
    expect(milestone.canClaim(player)).is.not.true;
    player.playedCards = [
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
    ];
    expect(milestone.canClaim(player)).is.true;
  });

  it('Wildcard counts', () => {
    player.playedCards = [
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
    ];
    expect(milestone.canClaim(player)).is.not.true;
    player.playedCards.push(new ResearchNetwork());
    expect(milestone.canClaim(player)).is.true;
  });
});
