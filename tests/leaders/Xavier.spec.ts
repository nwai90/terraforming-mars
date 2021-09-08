import {expect} from "chai";
import {Cartel} from "../../src/cards/base/Cartel";
import {LightningHarvest} from "../../src/cards/base/LightningHarvest";
import {SearchForLife} from "../../src/cards/base/SearchForLife";
import {Xavier} from "../../src/cards/leaders/Xavier";
import {SulphurExports} from "../../src/cards/venusNext/SulphurExports";
import {Game} from "../../src/Game";
import {SelectHowToPayForProjectCard} from "../../src/inputs/SelectHowToPayForProjectCard";
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
    player.megaCredits = 50; // Ensure enough money to pay
  });

  it('Cannot act without cards', function() {
    expect(card.canAct(player)).is.false;
  });

  it('Takes action once per game: Can play card with tag requirements', function() {
    const lightningHarvest = new LightningHarvest();
    player.cardsInHand.push(lightningHarvest);
    expect(card.canAct(player)).is.true;
    expect(lightningHarvest.canPlay(player)).is.false;

    // Once per game, can gain 2 wild tags for next card played
    card.action(player);
    player.actionsThisGeneration.add(card.name);
    expect(game.deferredActions).has.length(2);
    expect(lightningHarvest.canPlay(player)).is.true;

    // Resolve payment - can play card with tag requirements
    const selectHowToPay = game.deferredActions.pop()!.execute() as SelectHowToPayForProjectCard;
    expect(selectHowToPay.cards).to.include(lightningHarvest);
    selectHowToPay.cb(lightningHarvest, {steel: 0, heat: 0, titanium: 0, megaCredits: 8, microbes: 0, floaters: 0, science: 0});
    
    // Bonus wild tags are lost right after the OPG action
    game.deferredActions.runAll(() => {});
    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;
    expect(lightningHarvest.canPlay(player)).is.false;
  });

  it('Takes action once per game: Can use wild tags as production', function() {
    const sulphurExports = new SulphurExports();
    player.cardsInHand.push(sulphurExports);

    // Once per game, can gain 2 wild tags for next card played
    card.action(player);
    player.actionsThisGeneration.add(card.name);
    expect(game.deferredActions).has.length(2);

    // Resolve payment - 2 wild tags count for production effect
    const selectHowToPay = game.deferredActions.pop()!.execute() as SelectHowToPayForProjectCard;
    expect(selectHowToPay.cards).to.include(sulphurExports);
    selectHowToPay.cb(sulphurExports, {steel: 0, heat: 0, titanium: 0, megaCredits: 21, microbes: 0, floaters: 0, science: 0});
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(3);
    
    // Bonus wild tags are lost right after the OPG action
    game.deferredActions.runAll(() => {});
    expect(card.isDisabled).is.true;
    expect(card.canAct(player)).is.false;

    const cartel = new Cartel();
    cartel.play(player);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(4);
  });
});
