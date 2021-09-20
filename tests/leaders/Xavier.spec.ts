import {expect} from "chai";
import {Cartel} from "../../src/cards/base/Cartel";
import {GeneRepair} from "../../src/cards/base/GeneRepair";
import {LightningHarvest} from "../../src/cards/base/LightningHarvest";
import {SearchForLife} from "../../src/cards/base/SearchForLife";
import {Xavier} from "../../src/cards/leaders/Xavier";
import {SulphurExports} from "../../src/cards/venusNext/SulphurExports";
import {Game} from "../../src/Game";
import {Player} from "../../src/Player";
import {Resources} from "../../src/Resources";
import {TestPlayers} from "../TestPlayers";

describe('Xavier', function() {
  let card: Xavier; let player: Player; let player2: Player; let game: Game;

  beforeEach(() => {
    card = new Xavier();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    game = Game.newInstance('foobar', [player, player2], player);
    player.playedCards.push(card, new SearchForLife());
  });

  it('Takes action once per game: Can play cards with tag requirements', function() {
    const lightningHarvest = new LightningHarvest();
    const geneRepair = new GeneRepair();
    player.cardsInHand.push(lightningHarvest);
    expect(lightningHarvest.canPlay(player)).is.false;

    // Once per game, can gain 2 wild tags for the generation
    card.action();
    player.actionsThisGeneration.add(card.name);
    expect(lightningHarvest.canPlay(player)).is.true;
    lightningHarvest.play(player);
    expect(geneRepair.canPlay(player)).is.true;
    
    // Bonus wild tags are lost next generation
    game.deferredActions.runAll(() => {});
    expect(card.isDisabled).is.true;
    player.runProductionPhase();
    expect(geneRepair.canPlay(player)).is.false;
  });

  it('Takes action once per game: Can use wild tags as production', function() {
    const sulphurExports = new SulphurExports();
    player.cardsInHand.push(sulphurExports);

    // Once per game, can gain 2 wild tags for the generation
    card.action();
    player.actionsThisGeneration.add(card.name);

    // Resolve payment - 2 wild tags count for production effect
    sulphurExports.play(player);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(3);
    
    // Bonus wild tags are lost next generation
    game.deferredActions.runAll(() => {});
    expect(card.isDisabled).is.true;
    player.runProductionPhase();

    const cartel = new Cartel();
    cartel.play(player);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(4);
  });
});
