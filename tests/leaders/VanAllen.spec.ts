import {expect} from "chai";
import {VanAllen} from "../../src/cards/leaders/VanAllen";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {TestPlayers} from "../TestPlayers";

describe('Van Allen', function() {
  let card: VanAllen; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new VanAllen();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);

    player.playedCards.push(card);
  });

  it('Can claim milestones for free, and gains 3 M€ upon claim', function() {
    player.megaCredits = 7;
    player.setTerraformRating(35); // Can claim Terraformer milestone

    const claimMilestoneAction = player.getActions().options.find((option) => option.title == "Claim a milestone");
    expect(claimMilestoneAction).is.not.undefined;

    claimMilestoneAction!.options![0].cb();
    game.deferredActions.runAll(() => {});
    const claimedMilestone = player.game.claimedMilestones;
    expect(player.megaCredits).to.eq(10); // No M€ cost incurred, gains 3 M€ instead
    expect(claimedMilestone.find((cm) => cm.milestone.name === 'Terraformer' && cm.player === player)).is.not.undefined;
  });
});
