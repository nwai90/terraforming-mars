import {expect} from "chai";
import {Asimov} from "../../src/cards/leaders/Asimov";
import {Game} from "../../src/Game";
import {OrOptions} from "../../src/inputs/OrOptions";
import {Player} from "../../src/Player";
import {TestingUtils} from "../TestingUtils";
import {TestPlayers} from "../TestPlayers";

describe('Asimov', function() {
  let card: Asimov; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Asimov();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Can only act once per game', function() {
    expect(card.canAct(player)).is.true;

    const orOptions = card.action(player) as OrOptions;
    orOptions.options[0].cb();
    expect(card.isDisabled).is.true;
    expect(player.megaCredits).to.eq(0);

    TestingUtils.forceGenerationEnd(game);
    expect(card.canAct(player)).is.false;
  });

  it('Cannot act if all awards are already funded', function() {
    game.fundAward(player2, game.awards[0]);
    game.fundAward(player2, game.awards[1])
    game.fundAward(player2, game.awards[2])

    expect(card.canAct(player)).is.false;
  });

  it('Includes only official awards in normal game', function() {
    const orOptions = card.action(player) as OrOptions;
    expect(orOptions.options).has.length(10);
  });

  it('Includes fan awards if New Ops expansion is selected', function() {
    const gameOptions = TestingUtils.setCustomGameOptions({newOpsExpansion: true});
    Game.newInstance('foobar', [player, player2], player, gameOptions);

    const orOptions = card.action(player) as OrOptions;
    expect(orOptions.options.length > 10).is.true;
  });

  it('Has +2 score on awards', function() {
    player.playedCards.push(card);

    game.awards.forEach((award) => {
      expect(award.getScore(player)).to.eq(2);
    });
  });
});
