import {expect} from 'chai';
import {CoreMine} from '../../src/cards/moon/CoreMine';
import {ResearchNetwork} from '../../src/cards/prelude/ResearchNetwork';
import {Game} from '../../src/Game';
import {FullMoon} from '../../src/moon/FullMoon';
import {TestingUtils} from '../TestingUtils';
import {TestPlayer} from '../TestPlayer';
import {TestPlayers} from '../TestPlayers';

describe('FullMoon', () => {
  let award: FullMoon; let player: TestPlayer; let otherPlayer: TestPlayer;

  beforeEach(() => {
    award = new FullMoon();
    player = TestPlayers.BLUE.newPlayer();
    otherPlayer = TestPlayers.PINK.newPlayer();
    Game.newInstance('id', [player, otherPlayer], player, TestingUtils.setCustomGameOptions({moonExpansion: true}));
  });

  it('Standard test', () => {
    expect(award.getScore(player)).eq(0);
    player.playedCards = [
      new CoreMine(),
    ];
    expect(award.getScore(player)).eq(1);
    player.playedCards = [
      new CoreMine(),
      new CoreMine(),
    ];
    expect(award.getScore(player)).eq(2);
  });

  it('Wildcard counts', () => {
    player.playedCards = [
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
      new CoreMine(),
    ];
    expect(award.getScore(player)).eq(5);
    player.playedCards.push(new ResearchNetwork());
    expect(award.getScore(player)).eq(6);
  });
});
